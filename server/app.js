const express = require('express');
const app = express();
const cors = require('cors')
const cookieParser = require("cookie-parser");
const { register, login, accessToken, refreshToken, logout, allUsers, singleUser } = require("./controller");
require("dotenv").config();

app.use(cookieParser());
app.use(
    express.urlencoded({ extended: true }),
    cors({
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"],
        credentials: true
    })
);

// REGISTER
app.post("/api/register", register);
// LOGIN
app.post("/api/login", login);
// ACCESS TOKEN
app.post("/api/accesstoken", accessToken);
// REFRESH TOKEN
app.get("/api/refreshtoken", refreshToken);
// LOGOUT
app.get("/api/logout", logout);
// ALL
app.get("/api/users", allUsers);
// SINGLE USER
app.get("/api/user/:id", singleUser);
// CHECK TOKEN
//app.post("/api/check", check);
// this should be done for periodic check of token is still valid. if failed, should reset/clean token (localstorage)

app.listen(process.env.PORT, () => console.log(`API listening on port ${process.env.PORT}!`));