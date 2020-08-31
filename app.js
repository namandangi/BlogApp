const express  = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const expressSanitizer = require("express-sanitizer");
const Blog = require('./models/blog');
 app = express();

var blogRouter = require('./routes/blogs');

//App config.

mongoose.connect("mongodb://localhost:27017/blog_app",{useNewUrlParser:true});
//mongoose.connect("mongodb+srv://naman:naman0425@cluster0-bppey.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser:true});
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

app.use('',blogRouter);

app.listen(process.env.PORT||8000,process.env.IP,function(){
	console.log("Server has started");
});