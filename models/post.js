const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Tag = require('./tag'); // Import Tag model

const Post = sequelize.define('Post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

// Define association
Post.belongsToMany(Tag, { through: 'PostTag' });

module.exports = Post;
