const { Tag } = require('../models');
const { validationResult } = require('express-validator');

exports.createTag = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { name } = req.body;  
        // Create new tag
        const tag = await Tag.create({ name });
        return res.status(201).json(tag);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateTag = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        // Find tag by ID
        const tag = await Tag.findByPk(id);
        if (!tag) {
            return res.status(404).json({ error: 'Tag not found' });
        }
        // Update tag
        tag.name = name;
        await tag.save();
        return res.status(200).json(tag);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteTag = async (req, res) => {
    try {
        const { id } = req.params;
        // Find tag by ID
        const tag = await Tag.findByPk(id);
        if (!tag) {
            return res.status(404).json({ error: 'Tag not found' });
        }
        // Delete tag
        await tag.destroy();
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Validation rules for tag creation
exports.validateCreateTag = [
    body('name').trim().notEmpty().withMessage('Tag name is required')
];
