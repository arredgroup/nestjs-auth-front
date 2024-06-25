import '@testing-library/jest-dom';
import axios from 'axios';
import AuthService from "@/services/AuthService.js";

jest.mock('axios');

describe('AuthService', () => {
    let post = jest.fn();
    beforeAll(() => {
        axios.post.mockImplementation(post);
    });
    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should return true when user login', async () => {
        post.mockResolvedValue({data: "ewogICAgbm9tYnJlOiAnZmFrZScsCiAgICBlbWFpbDogJ2FAYi5jbCcKfQ=="});
        const result = await AuthService.handleLogin('user', 'pass');
        expect(result).toBe(true);
    });

    test('should return false when user login fail', async () => {
        post.mockImplementation(() => {
            throw new Error('fakeError');
        });
        const result = await AuthService.handleLogin('user', 'pass');
        expect(result).toBe(false);
    });
});