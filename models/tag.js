const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Post = require('./post');

const Tag = sequelize.define('Tag', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Tag.belongsToMany(Post, { through: 'PostTag' });

module.exports = Tag;
