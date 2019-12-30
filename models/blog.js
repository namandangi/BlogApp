var mongoose = require('mongoose');

var blogSchema =  mongoose.Schema({
	title:String,
	image:String,
	body:String,
	created:{type:Date,default:Date.now}
});

var Blog = mongoose.model("Blog",blogSchema);
module.exports = Blog;
