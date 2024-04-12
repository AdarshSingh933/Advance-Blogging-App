const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

// Endpoint to delete a post (only accessible to admins or post owners)
router.delete('/posts/:id', authMiddleware.isAdmin, authMiddleware.isPostOwner, postController.deletePost);

// Endpoint to search and filter posts
router.get('/posts', postController.searchPosts);

module.exports = router;
