//const auth = require("./TokenChecker");
const userdb = require("./userDB");
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
require("dotenv").config();
var salt_local = bcrypt.genSaltSync(10);
const RegisterModel = require('../mongodb/models/register');

const register = async (req, res) => {
    try {
        const { Username, Email, Password } = req.body;

        RegisterModel.findOne({email:Email})
        .then((user) => {
            if(user){
                res.status(400).send("user already exist!");
            }else {
                encryptedPassword = bcrypt.hashSync(Password, salt_local);
                nowDate = Date('now');
                const newuser = new RegisterModel({username: Username, email: Email, password: encryptedPassword, salt: salt_local});
                newuser.save().then((userinfo) => {
                    if(userinfo){
                        //console.log(userinfo);
                        res.send({message:"Success!"})
                    }else{
                        res.status(400).send("Registration Failure!");
                    }
                })
            }
        })

    } catch (err) {
        res.status(400).json(err);
    }
}

const login = async (req, res) => {
    try {      
        const { Email, Password } = req.body;
        RegisterModel.findOne({email:Email})
        .then((user) => {
            if(user){
                var PHash = bcrypt.hashSync(Password, user.salt);
                if(PHash === user.password) {
                    // * CREATE JWT ACCESS TOKEN
                    const accessToken = jwt.sign(
                        { user_id: user._id, username: user.username, Email },
                        process.env.ACCESS_TOKEN_KEY,
                        {
                          expiresIn: "5m", // 60s = 60 seconds - (60m = 60 minutes, 2h = 2 hours, 2d = 2 days)
                          issuer: "YB ASH"
                        }
                    );
                    // * CREATE JWT REFRESH TOKEN
                    const refreshToken = jwt.sign(
                        { user_id: user._id, username: user.username, Email },
                        process.env.REFRESH_TOKEN_KEY,
                        {
                          expiresIn: "24h", // 60s = 60 seconds - (60m = 60 minutes, 2h = 2 hours, 2d = 2 days)
                          issuer: "YB ASH"
                        }
                    );
                    
                    user.token = accessToken; 
                    //user[0].RefreshToken = refreshToken;
                    user.dateLoggedIn = Date('now');
                    res.status(200).json({
                        "Id": user._id,
                        "Username": user.username,
                        "Email": user.email,
                        "Token": user.token
                    });  
      
                } else {
                    res.status(400).send("Credential No Match");
                    return;          
                }

            }else {
                res.status(400).send("user does not exist!");
            }
        })
      
    } catch (err) {
        res.status(400).json(err);
    }    
};

const accessToken = async (req, res) => {
    try {
        //const token = req.cookies.accessToken;
        const { token } = req.body;
        const data = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);

        RegisterModel.findOne({email:data.Email})
        .then((user) => {
            if(user){
                res.status(200).json("Token valid!");   
            }else {
                res.status(400).json("Token invalid!");
            }
        })

    } catch (error) {
      res.status(500).json(error);
    }
};

const refreshToken = async (req, res) => {
    try {
        //const token = req.cookies.refreshToken;
        const { token } = req.body;
        const data = jwt.verify(token, process.env.REFRESH_TOKEN_KEY);
  
        RegisterModel.findOne({email:data.Email})
        .then((user) => {
            if(user){
                // * CREATE JWT ACCESS TOKEN
                const accessToken = jwt.sign(
                    { user_id: user._id, username: user.username, email },
                    process.env.ACCESS_TOKEN_KEY,
                    {
                        expiresIn: "1m", // 60s = 60 seconds - (60m = 60 minutes, 2h = 2 hours, 2d = 2 days)
                        issuer: "YB ASH"
                    }
                );
                
                user.token = accessToken; 
                //user[0].RefreshToken = refreshToken;
                user.dateLoggedIn = Date('now');
                res.status(200).json({
                    "Id": user._id,
                    "Username": user.username,
                    "Email": user.email,
                    "Token": user.token
                });  

            }else {
                res.status(400).send("user does not exist!");
            }
        })
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

    var users = []
    const cursor = RegisterModel.find().cursor();

    for (let user = await cursor.next(); user !=null; user = await cursor.next()) {
        users.push(user);
    }

    res.json({
        "message":"success",
        "data":users
    })
}

const singleUser = async (req, res, next) => {

    const { id } = req.body;
    RegisterModel.findOne({_id:id})
    .then((user) => {
        if(user){
            res.status(200).json({
                "Id": user._id,
                "Username": user.username,
                "Email": user.email,
                "Token": user.token
            });     
        }else {
            res.status(400).json("user does not exist!");
        }
    })
    
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