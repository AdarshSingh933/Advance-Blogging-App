const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');
const authMiddleware = require('../middleware/authMiddleware');

// Endpoint to create a new tag
router.post('/tags', tagController.createTag);

// Endpoint to update an existing tag
router.put('/tags/:id', tagController.updateTag);

// Endpoint to delete a tag (only accessible to admins or tag owners)
router.delete('/tags/:id', authMiddleware.isAdmin, authMiddleware.isTagOwner, tagController.deleteTag);

module.exports = router;
