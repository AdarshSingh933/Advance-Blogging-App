const postRoutes = require('../../routes/postRoutes');
const postController = require('../../controllers/postController');
const authMiddleware = require('../../middleware/authMiddleware');

jest.mock('../../controllers/postController');
jest.mock('../../middleware/authMiddleware');

describe('Post Routes', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    test('should define delete endpoint for posts', () => {
        expect(postRoutes.stack[0].route.path).toBe('/posts/:id');
        expect(postRoutes.stack[0].route.methods.delete).toBeTruthy();
    });

    test('should call authMiddleware.isAdmin and authMiddleware.isPostOwner for delete endpoint', () => {
        expect(postRoutes.stack[0].route.stack[0].handle).toBe(authMiddleware.isAdmin);
        expect(postRoutes.stack[0].route.stack[1].handle).toBe(authMiddleware.isPostOwner);
    });

    test('should define get endpoint for searching and filtering posts', () => {
        expect(postRoutes.stack[1].route.path).toBe('/posts');
        expect(postRoutes.stack[1].route.methods.get).toBeTruthy();
    });

    test('should call postController.searchPosts for get endpoint', () => {
        expect(postRoutes.stack[1].route.stack[0].handle).toBe(postController.searchPosts);
    });
});
