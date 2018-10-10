"use strict";

const express = require("express");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;


const { PORT, DATABASE_URL } = require("./config");
const { Post } = require("./models");


const app = express();
app.use(express.json());


//GET requests to /posts returns all posts
app.get("/posts", (req, res) => {
  Post.find()
    .then(posts => {
      res.json({
        posts: posts.map(post => post.serialize())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});


//request by ID
app.get("/posts/:id", (req, res) => {
  Post
    // this is a convenience method Mongoose provides for searching
    // by the object _id property
    .findById(req.params.id)
    .then(post => res.json(post.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});