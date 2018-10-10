"use strict";

const express = require("express");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;


const { PORT, DATABASE_URL } = require("./config");
const { Post } = require("./models");


const app = express();
app.use(express.json());