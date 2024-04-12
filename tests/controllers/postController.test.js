const postController = require('../../controllers/postController');
const { Post, Tag, sequelize } = require('../models');
const { validationResult } = require('express-validator');

jest.mock('../models'); // Mocking the models

describe('Post Controller', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    describe('searchPosts', () => {
        test('should return 400 if validation fails', async () => {
            const req = { query: {} };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };
            validationResult.mockReturnValueOnce({ isEmpty: () => false, array: () => [{ msg: 'Validation error' }] });

            await postController.searchPosts(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ errors: [{ msg: 'Validation error' }] });
        });

        test('should return 500 if an error occurs during execution', async () => {
            const req = { query: {} };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };
            validationResult.mockReturnValueOnce({ isEmpty: () => true });
            Post.findAll.mockRejectedValueOnce(new Error('Database error'));

            await postController.searchPosts(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
        });

        test('should return posts if query is successful', async () => {
            const req = { query: {} };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };
            validationResult.mockReturnValueOnce({ isEmpty: () => true });
            Post.findAll.mockResolvedValueOnce([{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }]);

            await postController.searchPosts(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }]);
        });
    });
});
