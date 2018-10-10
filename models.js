"use strict";

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

//schema to represent a blogpost
const postSchema = mongoose.Schema({
	author: {
		firstName: { type: String, require: true },
		lastName: { type: String, require: true }
	},
	title: { type: String, require: true },
	content: { type: String, require: true },
	created: {type: Date, default: Date.now}
});


//virtual for the authors full name
postSchema.virtual("authorFullName").get(function() {
	return `${this.author.firstName} ${this.author.lastName}`.trim();
});

//serializing the data
postSchema.methods.serialize = function() {
	return {
		id: this._id,
		author: this.authorFullName,
		title: this.title,
		content: this.content,
		created: this.created
	};
};


const Post = mongoose.model("Post", postSchema);

module.exports = { Post };