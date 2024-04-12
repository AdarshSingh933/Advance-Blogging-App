const tagRoutes = require('../../routes/tagRoutes');
const tagController = require('../../controllers/tagController');
const authMiddleware = require('../../middleware/authMiddleware');

jest.mock('../../controllers/tagController');
jest.mock('../../middleware/authMiddleware');

describe('Tag Routes', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    test('should define post endpoint for creating tags', () => {
        expect(tagRoutes.stack[0].route.path).toBe('/tags');
        expect(tagRoutes.stack[0].route.methods.post).toBeTruthy();
    });

    test('should call tagController.createTag for post endpoint', () => {
        expect(tagRoutes.stack[0].route.stack[0].handle).toBe(tagController.createTag);
    });

    test('should define put endpoint for updating tags', () => {
        expect(tagRoutes.stack[1].route.path).toBe('/tags/:id');
        expect(tagRoutes.stack[1].route.methods.put).toBeTruthy();
    });

    test('should call tagController.updateTag for put endpoint', () => {
        expect(tagRoutes.stack[1].route.stack[0].handle).toBe(tagController.updateTag);
    });

    test('should define delete endpoint for deleting tags', () => {
        expect(tagRoutes.stack[2].route.path).toBe('/tags/:id');
        expect(tagRoutes.stack[2].route.methods.delete).toBeTruthy();
    });

    test('should call authMiddleware.isAdmin and authMiddleware.isTagOwner for delete endpoint', () => {
        expect(tagRoutes.stack[2].route.stack[0].handle).toBe(authMiddleware.isAdmin);
        expect(tagRoutes.stack[2].route.stack[1].handle).toBe(authMiddleware.isTagOwner);
    });

    test('should call tagController.deleteTag for delete endpoint', () => {
        expect(tagRoutes.stack[2].route.stack[2].handle).toBe(tagController.deleteTag);
    });
});
