const { Post, Tag, sequelize } = require('../models');
const { validationResult } = require('express-validator');

exports.searchPosts = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { tags, startDate, endDate, author } = req.query;
        // Build query
        const query = {
            where: {},
            include: [{ model: Tag, where: {} }]
        };
        if (tags) {
            query.include[0].where.name = tags.split(',');
        }
        if (startDate && endDate) {
            query.where.createdAt = { [sequelize.Op.between]: [new Date(startDate), new Date(endDate)] };
        }
        if (author) {
            query.where.author = author;
        }
        // Execute query
        const posts = await Post.findAll(query);
        return res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
