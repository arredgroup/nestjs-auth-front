import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BulkCreateUsers from './BulkCreateUsers';
import axios from 'axios';


jest.mock('axios');

describe('BulkCreateUsers', () => {
    beforeEach(() => {
        axios.post.mockResolvedValue({ data: { success: true } });
        window.alert = jest.fn();
    });

    test('renders BulkCreateUsers and adds users', async () => {
        render(<BulkCreateUsers />);

        // Agrega un nuevo usuario
        fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'New User' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'new.user@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });

        fireEvent.click(screen.getByText(/Add User/i));
        fireEvent.click(screen.getByText(/Submit/i));

        // Verifica que el usuario se haya agregado correctamente
        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('Users created successfully');
        });
    });
});
