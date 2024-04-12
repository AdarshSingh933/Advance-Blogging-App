const authMiddleware = require('../../middleware/authMiddleware');
const { Post, Tag } = require('../models');

jest.mock('../models');

describe('Auth Middleware', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    describe('isAdmin', () => {
        test('should return 403 if user is not an admin', () => {
            const req = { user: { role: 'user' } };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };

            authMiddleware.isAdmin(req, res, {});

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ error: 'Forbidden' });
        });

        test('should call next if user is an admin', () => {
            const req = { user: { role: 'admin' } };
            const next = jest.fn();

            authMiddleware.isAdmin(req, {}, next);

            expect(next).toHaveBeenCalled();
        });
    });

    describe('isPostOwner', () => {
        test('should return 404 if post is not found', async () => {
            const req = { params: { id: 1 }, user: { id: 1, role: 'user' } };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };
            Post.findByPk.mockResolvedValueOnce(null);
    
            await authMiddleware.isPostOwner(req, res, {});
    
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Post not found' });
        });
    
        test('should return 403 if user is not the owner or an admin', async () => {
            const req = { params: { id: 1 }, user: { id: 2, role: 'user' } };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };
            const post = { id: 1, userId: 1 };
            Post.findByPk.mockResolvedValueOnce(post);
    
            await authMiddleware.isPostOwner(req, res, {});
    
            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ error: 'Forbidden' });
        });
    
        test('should call next if user is the owner', async () => {
            const req = { params: { id: 1 }, user: { id: 1, role: 'user' } };
            const next = jest.fn();
            const post = { id: 1, userId: 1 };
            Post.findByPk.mockResolvedValueOnce(post);
    
            await authMiddleware.isPostOwner(req, {}, next);
    
            expect(next).toHaveBeenCalled();
        });
    
        test('should call next if user is an admin', async () => {
            const req = { params: { id: 1 }, user: { id: 2, role: 'admin' } };
            const next = jest.fn();
            const post = { id: 1, userId: 1 };
            Post.findByPk.mockResolvedValueOnce(post);
    
            await authMiddleware.isPostOwner(req, {}, next);
    
            expect(next).toHaveBeenCalled();
        });
    });
    
    describe('isTagOwner', () => {
        test('should return 404 if tag is not found', async () => {
            const req = { params: { id: 1 }, user: { id: 1, role: 'user' } };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };
            Tag.findByPk.mockResolvedValueOnce(null);
    
            await authMiddleware.isTagOwner(req, res, {});
    
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Tag not found' });
        });
    
        test('should return 403 if user is not the owner or an admin', async () => {
            const req = { params: { id: 1 }, user: { id: 2, role: 'user' } };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };
            const tag = { id: 1, userId: 1 };
            Tag.findByPk.mockResolvedValueOnce(tag);
    
            await authMiddleware.isTagOwner(req, res, {});
    
            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ error: 'Forbidden' });
        });
    
        test('should call next if user is the owner', async () => {
            const req = { params: { id: 1 }, user: { id: 1, role: 'user' } };
            const next = jest.fn();
            const tag = { id: 1, userId: 1 };
            Tag.findByPk.mockResolvedValueOnce(tag);
    
            await authMiddleware.isTagOwner(req, {}, next);
    
            expect(next).toHaveBeenCalled();
        });
    
        test('should call next if user is an admin', async () => {
            const req = { params: { id: 1 }, user: { id: 2, role: 'admin' } };
            const next = jest.fn();
            const tag = { id: 1, userId: 1 };
            Tag.findByPk.mockResolvedValueOnce(tag);
    
            await authMiddleware.isTagOwner(req, {}, next);
    
            expect(next).toHaveBeenCalled();
        });
    });
    
});
