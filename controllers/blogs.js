const Blog = require('../models/blog');

exports.redirectToBlog = async (req,res) => {
    res.redirect('/blogs')
}

exports.getAll = async (req,res) => {
	let doc = await Blog.find({})
		if(doc)
        res.render("Index",{blogs:doc})
}

exports.newBlog = async (req,res) => {
	res.render("New")
}

exports.createBlog = async (req,res) => {	
	req.body.blog.body = req.sanitize(req.body.blog.body);
	let doc = await Blog.create(req.body.blog)
		if(doc)
			res.redirect("/blogs")
}

exports.getBlogById = async (req,res) => {
	let doc = await Blog.findById(req.params.id)
		if(doc)
		    res.render("Show",{blog:doc})
}

exports.editBlog = async (req,res) => {
	let doc = await Blog.findById(req.params.id)
		if(doc)
			res.render("Edit",{blog:doc})
}

exports.updateBlogById = async (req,res) => {
	req.body.blog.body = req.sanitize(req.body.blog.body);
	let doc = await Blog.findByIdAndUpdate(req.params.id,req.body.blog,{new:true})
		if(doc)
			res.redirect("/blogs/"+req.params.id)
}

exports.deleteBlogById = async (req,res) => {
	let doc = await Blog.findByIdAndRemove(req.params.id)
		if(doc)
			res.redirect("/blogs")
}