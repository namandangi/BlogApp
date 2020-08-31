const express =  require('express');
const Blog = require('../models/blog');
const controller  = require('../controllers/blogs');
const asyncHandler = require('express-async-handler');

const router  = express.Router();


router.get("/",asyncHandler(controller.redirectToBlog))
router.get("/blogs",asyncHandler(controller.getAll))
router.get("/blogs/new",asyncHandler(controller.newBlog))
router.post("/blogs",asyncHandler(controller.createBlog))	
router.get("/blogs/:id",asyncHandler(controller.getBlogById))
router.get("/blogs/:id/edit",asyncHandler(controller.editBlog))
router.put("/blogs/:id",asyncHandler(controller.updateBlogById))
router.delete("/blogs/:id",asyncHandler(controller.deleteBlogById))

module.exports = router;