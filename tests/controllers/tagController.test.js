const tagController = require('../../controllers/tagController');
const { Tag } = require('../models');
const { validationResult } = require('express-validator');

jest.mock('../models');

describe('Tag Controller', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    describe('createTag', () => {
        test('should return 400 if validation fails', async () => {
            const req = { body: {} };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };
            validationResult.mockReturnValueOnce({ isEmpty: () => false, array: () => [{ msg: 'Validation error' }] });

            await tagController.createTag(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ errors: [{ msg: 'Validation error' }] });
        });

        test('should return 500 if an error occurs during creation', async () => {
            const req = { body: { name: 'Test Tag' } };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };
            validationResult.mockReturnValueOnce({ isEmpty: () => true });
            Tag.create.mockRejectedValueOnce(new Error('Database error'));

            await tagController.createTag(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
        });

        test('should create a new tag if validation passes', async () => {
            const req = { body: { name: 'Test Tag' } };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };
            validationResult.mockReturnValueOnce({ isEmpty: () => true });
            const createdTag = { id: 1, name: 'Test Tag' };
            Tag.create.mockResolvedValueOnce(createdTag);

            await tagController.createTag(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(createdTag);
        });
    });

    describe('updateTag', () => {
        test('should return 404 if tag is not found', async () => {
            const req = { params: { id: 1 }, body: { name: 'Updated Tag' } };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };
            Tag.findByPk.mockResolvedValueOnce(null);
    
            await tagController.updateTag(req, res);
    
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Tag not found' });
        });
    
        test('should return 500 if an error occurs during update', async () => {
            const req = { params: { id: 1 }, body: { name: 'Updated Tag' } };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };
            const tag = { id: 1, name: 'Test Tag' };
            Tag.findByPk.mockResolvedValueOnce(tag);
            tag.save.mockRejectedValueOnce(new Error('Database error'));
    
            await tagController.updateTag(req, res);
    
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
        });
    
        test('should update tag successfully', async () => {
            const req = { params: { id: 1 }, body: { name: 'Updated Tag' } };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };
            const tag = { id: 1, name: 'Test Tag', save: jest.fn() };
            Tag.findByPk.mockResolvedValueOnce(tag);
    
            await tagController.updateTag(req, res);
    
            expect(tag.name).toBe('Updated Tag');
            expect(tag.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(tag);
        });
    });
    
    describe('deleteTag', () => {
        test('should return 404 if tag is not found', async () => {
            const req = { params: { id: 1 } };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };
            Tag.findByPk.mockResolvedValueOnce(null);
    
            await tagController.deleteTag(req, res);
    
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Tag not found' });
        });
    
        test('should return 500 if an error occurs during deletion', async () => {
            const req = { params: { id: 1 } };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };
            const tag = { id: 1, name: 'Test Tag' };
            Tag.findByPk.mockResolvedValueOnce(tag);
            tag.destroy.mockRejectedValueOnce(new Error('Database error'));
    
            await tagController.deleteTag(req, res);
    
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
        });
    
        test('should delete tag successfully', async () => {
            const req = { params: { id: 1 } };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };
            const tag = { id: 1, name: 'Test Tag', destroy: jest.fn() };
            Tag.findByPk.mockResolvedValueOnce(tag);
    
            await tagController.deleteTag(req, res);
    
            expect(tag.destroy).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.send).toHaveBeenCalled();
        });
    });
    
});
