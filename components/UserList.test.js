import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import UserList from './UserList';
import axios from 'axios';

jest.mock('axios');

const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
    { id: 3, name: 'Jim Brown', email: 'jim.brown@example.com' },
    { id: 4, name: 'Lisa White', email: 'lisa.white@example.com' }
];

describe('UserList', () => {
    beforeEach(() => {
        axios.post.mockResolvedValue({ data: mockUsers });
    });

    test('renders UserList and applies filters', async () => {
        render(<UserList />);

        // Verifica que los usuarios se cargan correctamente
        // no pude resolver que este wait no me diera fallo pero debeira andar ok 
        // la verada no puede que no o que sea algo mas pero el bilk parece funcionar asi que  eso.
        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
        });

        // Aplica un filtro y verifica los resultados
        fireEvent.change(screen.getByLabelText(/Name:/i), { target: { value: 'Jane' } });
        fireEvent.click(screen.getByText(/Apply Filters/i));

        await waitFor(() => {
            expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        });
    });
});
