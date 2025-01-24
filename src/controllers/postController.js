const Post = require("../models/Post");

const postController = {
  createPost: async (req, res) => {
    try {
      const newPost = new Post({
        author: req.user.id,
        ...req.body,
      });
      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.find()
        .populate("author", "username email")
        .sort({ createdAt: -1 });
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getPostById: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate(
        "author",
        "username email"
      );
      if (!post) return res.status(404).json({ message: "Post not found" });
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updatePost: async (req, res) => {
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.json(updatedPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deletePost: async (req, res) => {
    try {
      await Post.findByIdAndDelete(req.params.id);
      res.json({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = postController;
