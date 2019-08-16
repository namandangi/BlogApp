var express  = require("express"),
 mongoose = require("mongoose"),
 bodyParser = require("body-parser"),
 methodOverride = require("method-override"),
 expressSanitizer = require("express-sanitizer"),
 app=express();

//App config.
//mongoose.connect("mongodb://localhost:27017/blog_app",{useNewUrlParser:true});
mongoose.connect("mongodb+srv://naman:naman0425@cluster0-bppey.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser:true});
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

//Mongoose/Model config.
var blogSchema=new mongoose.Schema({
	title:String,
	image:String,
	body:String,
	created:{type:Date,default:Date.now}
});

var Blog = mongoose.model("Blog",blogSchema);

//Restful Routes
// Blog.create({
// 	title:"My First Blog",
// 	image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT027XWFqatO_BJH1NKH3m-3VPv5lj-9VN-hu_0kErxpWsuSNWE",
//     body:"This blog describes how beautiful Grace Chatto is"
// },function(err,blog){
// 	if(err)
// 		console.log(err);
// 	else
// 		console.log(blog);
// });

app.get("/",function(req,res){
	res.redirect("/blogs");
});

//INDEX ROUTE
app.get("/blogs",function(req,res){
	Blog.find({},function(err,allBlogs){
		if(err)
			console.log(err);
		else
			res.render("Index",{blogs:allBlogs});	
	});
});

//NEW ROUTE
app.get("/blogs/new",function(req,res){
	res.render("New");
});

//CREATE ROUTE
app.post("/blogs",function(req,res){
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
app.get("/blogs/:id",function(req,res){
	Blog.findById(req.params.id,function(err,foundBlog){
		if(err)
			console.log(err);
		else
			res.render("Show",{blog:foundBlog});
	});
});

//EDIT ROUTE
app.get("/blogs/:id/edit",function(req,res){
	Blog.findById(req.params.id,function(err,foundBlog){
		if(err)
			console.log(err);
		else
			res.render("Edit",{blog:foundBlog});	
	});
});

//UPDATE ROUTE
app.put("/blogs/:id",function(req,res){
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
app.delete("/blogs/:id",function(req,res){
	Blog.findByIdAndRemove(req.params.id,function(err,blog){
		if(err)
			console.log(err);
		else
			res.redirect("/blogs");
	});
});

app.listen(process.env.PORT||8000,process.env.IP,function(){
	console.log("Server has started");
});