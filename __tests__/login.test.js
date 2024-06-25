import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../app/login/page';
import { useRouter } from 'next/navigation';
import AuthService from '../services/AuthService';

jest.mock('next/navigation');
jest.mock('../services/AuthService');

describe('Login Page', () => {
    let push = jest.fn();
    beforeAll(()=>{
        useRouter.mockImplementation(() => ({
            push: push,
        }));
        AuthService.handleLogin.mockImplementation(() => true);
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should render the login page', () => {
        render(<Login />);
        const h1 = screen.getByText('Inicia Sesión');
        const button = screen.getByText('Registrar');
        expect(h1).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    test('should user login', async () => {
        render(<Login />);
        await userEvent.click(screen.getByText('Iniciar Sesión'));
        expect(push).toHaveBeenCalledTimes(1);
        expect(push).toHaveBeenCalledWith('/users');
    });

    test('should user register', () => {
        render(<Login />);
        const button = screen.getByText('Registrar');
        button.click();
        expect(push).toHaveBeenCalledTimes(1);
        expect(push).toHaveBeenCalledWith('/register');
    });
})