const express = require("express");
const mongoose = require("mongoose");



//create a database connection -> u can also
//create a separate file for this and then import/use that file here

mongoose
  .connect('mongodb+srv://kpavan892002:kpa1234v6789an@dways.fvlyu.mongodb.net/')
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));


const app = express();
const PORT = process.env.PORT || 5000;