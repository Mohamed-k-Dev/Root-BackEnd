import BlogModel from "../../../DB/model/Blog.model.js";

export function getBlogsWithUser(req, res) {
  const blogs = BlogModel.findAll();
  return res.json({ blogs });
}

export function createBlog(req, res) {
  const { title, content } = req.body;
  const blog = BlogModel.create({ title, content });
  return res.json({message : "done"})
}
