var express =  require('express'),
    Blog = require('../models/blog'),
    router  = express.Router();


router.get("/",function(req,res){
	res.redirect("/blogs");
});

//INDEX ROUTE
router.get("/blogs",function(req,res){
	Blog.find({},function(err,allBlogs){
		if(err)
			console.log(err);
		else
			res.render("Index",{blogs:allBlogs});	
	});
});

//NEW ROUTE
router.get("/blogs/new",function(req,res){
	res.render("New");
});

//CREATE ROUTE
router.post("/blogs",function(req,res){
	// var title=req.body.title;
	// var image=req.body.image;
	// var body=req.body.body;
	// var data={title:tile,image:image,body:body};
	//req.body.blog.body=req.santize(req.body.blog.body);
	req.body.blog.body=req.sanitize(req.body.blog.body);
	Blog.create(req.body.blog,function(err,blog){
		if(err)
			console.log(err);
		else
			res.redirect("/blogs");
	});
});
	
//SHOW ROUTE
router.get("/blogs/:id",function(req,res){
	Blog.findById(req.params.id,function(err,foundBlog){
		if(err)
			console.log(err);
		else
			res.render("Show",{blog:foundBlog});
	});
});

//EDIT ROUTE
router.get("/blogs/:id/edit",function(req,res){
	Blog.findById(req.params.id,function(err,foundBlog){
		if(err)
			console.log(err);
		else
			res.render("Edit",{blog:foundBlog});	
	});
});

//UPDATE ROUTE
router.put("/blogs/:id",function(req,res){
	req.body.blog.body=req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedBlog){
		if(err)
			res.redirect("/blogs");
			//console.log(err);
		else
			console.log(req.params.id);
			res.redirect("/blogs/"+req.params.id);
	});
});

//DELETE ROUTE
router.delete("/blogs/:id",function(req,res){
	Blog.findByIdAndRemove(req.params.id,function(err,blog){
		if(err)
			console.log(err);
		else
			res.redirect("/blogs");
	});
});

module.exports = router;