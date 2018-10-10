"use strict";

const mongoose = require("mongoose");


//schema to represent a blogpost
const postSchema = mongoose.Schema({
	title: { type: String, require: true },
	content: { type: String, require: true },
	author: {
		firstName: { type: String, require: true },
		lastName: { type: String, require: true }
	}
});


//virtual for the authors full name
postSchema.virtual("authorFullName").get(function() {
	return `${this.author.firstName} ${this.author.lastName}`
});

//serializing the data
postSchema.methods.serialize = function() {
	return {
		id: this._id,
		title: this.title,
		content: this.content,
		author: this.authorFullName
	};
};


const Post = mongoose.model("Post", postSchema);

module.exports = { Post };