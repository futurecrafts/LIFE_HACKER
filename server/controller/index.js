//const auth = require("./TokenChecker");
const userdb = require("./userDB");
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
require("dotenv").config();

const register = async (req, res) => {
    var errors=[]
    try {
        const { Username, Email, Password } = req.body;

        if (!Username){
            errors.push("Username is missing");
        }
        if (!Email){
            errors.push("Email is missing");
        }
        if (errors.length){
            res.status(400).json({"error":errors.join(",")});
            return;
        }
        let userExists = false;
        
        var sql = "SELECT * FROM Users WHERE Email = ?"        
        await userdb.all(sql, Email, (err, result) => {
            if (err) {
                res.status(402).json({"error":err.message});
                return;
            }
            
            if(result.length === 0) {                
                
                var salt = bcrypt.genSaltSync(10);

                var data = {
                    Username: Username,
                    Email: Email,
                    Password: bcrypt.hashSync(Password, salt),
                    Salt: salt,
                    DateCreated: Date('now')
                }
        
                var sql ='INSERT INTO Users (Username, Email, Password, Salt, DateCreated) VALUES (?,?,?,?,?)'
                var params =[data.Username, data.Email, data.Password, data.Salt, Date('now')]
                var user = userdb.run(sql, params, function (err, innerResult) {
                    if (err){
                        res.status(400).json({"error": err.message})
                        return;
                    }
                  
                });           
            }            
            else {
                userExists = true; 
            }
        });
  
        setTimeout(() => {
            if(!userExists) {
                res.status(200).json("Register Success");    
            } else {
                res.status(201).json("User already exists. Please login");    
            }            
        }, 500);


    } catch (err) {
        res.status(400).json(err);
    }
}

const login = async (req, res) => {
    try {      
      const { Email, Password } = req.body;
          // Make sure there is an Email and Password in the request
          if (!(Email && Password)) {
              res.status(400).send("All input is required");
              return;
          }
              
          let user = [];
          
          var sql = "SELECT * FROM Users WHERE Email = ?";
          userdb.all(sql, Email, function(err, rows) {
              if (err){
                  res.status(400).json({"error": err.message})
                  return;
              }

              if (rows.length > 0) {
                rows.forEach(function (row) {
                    user.push(row);                
                }) 
              } else {
                res.status(400).send("No Match"); 
                return;
              }
              
              var PHash = bcrypt.hashSync(Password, user[0].Salt);
         
              if(PHash === user[0].Password) {
                // * CREATE JWT ACCESS TOKEN
                const accessToken = jwt.sign(
                    { user_id: user[0].Id, username: user[0].Username, Email },
                    process.env.ACCESS_TOKEN_KEY,
                    {
                    expiresIn: "1m", // 60s = 60 seconds - (60m = 60 minutes, 2h = 2 hours, 2d = 2 days)
                    issuer: "YB ASH"
                    }
                );
                // * CREATE JWT REFRESH TOKEN
                const refreshToken = jwt.sign(
                    { user_id: user[0].Id, username: user[0].Username, Email },
                    process.env.REFRESH_TOKEN_KEY,
                    {
                    expiresIn: "24h", // 60s = 60 seconds - (60m = 60 minutes, 2h = 2 hours, 2d = 2 days)
                    issuer: "YB ASH"
                    }
                );
                // Put Token to cookie
                // res.cookie("accessToken", accessToken, {
                //     secure: false,
                //     httpOnly: true,
                // })
                // res.cookie("refreshToken", refreshToken, {
                //     secure: false,
                //     httpOnly: true,
                // })
                user[0].Token = accessToken; 
                //user[0].RefreshToken = refreshToken;
                user[0].DateLoggedIn = Date('now');
  
              } else {
                  res.status(400).send("No Match");
                  return;          
              }
              //res.status(200).json("login success");
              //res.status(200).json(user[0]);
              //console.log(user[0].id);
              res.status(200).json({
                "Id": user[0].Id,
                "Username": user[0].Username,
                "Email": user[0].Email,
                "Token": user[0].Token
              });                
          });	
      
      } catch (err) {
        res.status(400).json(err);
    }    
};

const accessToken = async (req, res) => {
    try {
        //const token = req.cookies.accessToken;
        const { token } = req.body;
        const data = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
  
        var sql = "SELECT * FROM Users WHERE Email = ?";
        userdb.all(sql, data.Email, function(err, result) {
            if (err){
                res.status(400).json({"error": err.message})
                return;
            }

            if(result.length > 0) {  
                res.status(200).json("Token valid");              
                //const {Password, ...others} = result[0];
                //res.status(200).json(others); //res.status(200).json(result);
                // res.status(200).json({
                //     "Token": result[0].Token
                //   }); 
            }            
            else {
                res.status(200).json("No Match");
            }
        });
  
    } catch (error) {
      res.status(500).json(error);
    }
};

const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        const data = jwt.verify(token, process.env.REFRESH_TOKEN_KEY);
  
        var sql = "SELECT * FROM Users WHERE Email = ?";
        userdb.all(sql, data.Email, function(err, result) {
            if (err){
                res.status(400).json({"error": err.message})
                return;
            }

            if(result.length > 0) {      
                // * CREATE JWT ACCESS TOKEN
                const accessToken = jwt.sign(
                    { user_id: result[0].Id, username: result[0].Username, Email },
                    process.env.ACCESS_TOKEN_KEY,
                    {
                    expiresIn: "1m", // 60s = 60 seconds - (60m = 60 minutes, 2h = 2 hours, 2d = 2 days)
                    issuer: "YB ASH"
                    }
                );
                res.cookie("accessToken", accessToken, {
                    secure: false,
                    httpOnly: true,
                })          
                res.status(200).json("Access Token Recreated");
            }            
            else {
                res.status(200).json("No Match");
            }
        });
  
    } catch (error) {
      res.status(500).json(error);
    }
};

const logout = async (req, res) => {
    try {
        //res.cookie('accessToken', '');
        res.status(200).json("Logout Success");
    } catch (error) {
        res.status(400).json(error);        
    }
};

const allUsers = async (req, res, next) => {
    var sql = "SELECT * FROM Users"
    var params = []
    userdb.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          //return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
}

const singleUser = async (req, res, next) => {
    var sql = "SELECT * FROM Users WHERE Id = ?"
    userdb.all(sql, req.params.id, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          //return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
}

module.exports = {
    register,
    login,
    accessToken,
    refreshToken,
    logout,
    allUsers,
    singleUser
  };