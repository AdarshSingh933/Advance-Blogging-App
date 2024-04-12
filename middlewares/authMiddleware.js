exports.isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    return res.status(403).json({ error: 'Forbidden' });
};

exports.isPostOwner = async (req, res, next) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        if (req.user && (req.user.role === 'admin' || req.user.id === post.userId)) {
            return next();
        }
        return res.status(403).json({ error: 'Forbidden' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.isTagOwner = async (req, res, next) => {
    try {
        const tag = await Tag.findByPk(req.params.id);
        if (!tag) {
            return res.status(404).json({ error: 'Tag not found' });
        }
        if (req.user && (req.user.role === 'admin' || req.user.id === tag.userId)) {
            return next();
        }
        return res.status(403).json({ error: 'Forbidden' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
