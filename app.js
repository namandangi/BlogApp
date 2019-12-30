var express  = require("express"),
 mongoose = require("mongoose"),
 bodyParser = require("body-parser"),
 methodOverride = require("method-override"),
 expressSanitizer = require("express-sanitizer"),
 Blog = require('./models/blog'),
 app=express();

var blogs = require('./routes/blogs');

//App config.
mongoose.connect("mongodb://localhost:27017/blog_app",{useNewUrlParser:true});
//mongoose.connect("mongodb+srv://naman:naman0425@cluster0-bppey.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser:true});
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.use(blogs);

// //Mongoose/Model config.
// var blogSchema=new mongoose.Schema({
// 	title:String,
// 	image:String,
// 	body:String,
// 	created:{type:Date,default:Date.now}
// });

// var Blog = mongoose.model("Blog",blogSchema);
// app.use(blogs);

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

app.listen(process.env.PORT||8000,process.env.IP,function(){
	console.log("Server has started");
});