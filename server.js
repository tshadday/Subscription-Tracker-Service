const path = require("path");
const express = require("express");
const sequelize = require("./config/connection");

const model = require("./models");

const app = express();




const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log("Listening on PORT # https://localhost:3001");

});