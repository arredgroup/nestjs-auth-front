import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../app/page';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation');

describe('Page', () => {
    let push = jest.fn();
    beforeAll(()=>{
        useRouter.mockImplementation(() => ({
            push: push,
        }));
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should render the page', () => {
        render(<Home />);
        const button = screen.getByText('Iniciar Sesión');
        button.click();
        expect(button).toBeInTheDocument();
        expect(push).toHaveBeenCalledTimes(1);
    });

    test('should user already login', () => {
        localStorage.setItem('user', 'fakedata');
        render(<Home />);
        expect(push).toHaveBeenCalledTimes(1);
        expect(push).toHaveBeenCalledWith('/users');
    });
});