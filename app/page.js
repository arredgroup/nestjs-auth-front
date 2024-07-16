"use client"
import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import { useRouter } from 'next/navigation';


export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Inicializar los datos en el local storage si no están presentes
    const initializeLocalStorage = () => {
      const users = [
        
          
      ];

      const addHours = (date, hours) => {
        const result = new Date(date);
        result.setHours(result.getHours() + hours);
        return result;
      }

      const sessions = [
        {
          id: 1,
          id_user: 1,
          token: 'token123',
          expiration: addHours(new Date('2024-07-15T21:31:58.291Z'), 1).toISOString(),
          createdAt: '2024-07-15T21:31:58.291Z',
          updatedAt: '2024-07-15T21:31:58.291Z'
        },
        {
          id: 2,
          id_user: 1,
          token: 'token124',
          expiration: addHours(new Date('2024-07-11T21:31:58.291Z'), 1).toISOString(),
          createdAt: '2024-07-11T21:31:58.291Z',
          updatedAt: '2024-07-11T21:31:58.291Z'
        },
        {
          id: 3,
          id_user: 2,
          token: 'token125',
          expiration: addHours(new Date('2024-07-07T21:31:58.291Z'), 1).toISOString(),
          createdAt: '2024-07-07T21:31:58.291Z',
          updatedAt: '2024-07-07T21:31:58.291Z'
        },
        {
          id: 4,
          id_user: 3,
          token: 'token126',
          expiration: addHours(new Date('2024-07-03T21:31:58.291Z'), 1).toISOString(),
          createdAt: '2024-07-03T21:31:58.291Z',
          updatedAt: '2024-07-03T21:31:58.291Z'
        },
        {
          id: 5,
          id_user: 4,
          token: 'token127',
          expiration: addHours(new Date('2024-07-12T21:31:58.291Z'), 1).toISOString(),
          createdAt: '2024-07-12T21:31:58.291Z',
          updatedAt: '2024-07-12T21:31:58.291Z'
        },
        {
          id: 6,
          id_user: 4,
          token: 'token128',
          expiration: addHours(new Date('2024-07-08T21:31:58.291Z'), 1).toISOString(),
          createdAt: '2024-07-08T21:31:58.291Z',
          updatedAt: '2024-07-08T21:31:58.291Z'
        },
        {
          id: 7,
          id_user: 5,
          token: 'token129',
          expiration: addHours(new Date('2024-07-05T21:31:58.291Z'), 1).toISOString(),
          createdAt: '2024-07-05T21:31:58.291Z',
          updatedAt: '2024-07-05T21:31:58.291Z'
        },
        {
          id: 8,
          id_user: 5,
          token: 'token130',
          expiration: addHours(new Date('2024-07-02T21:31:58.291Z'), 1).toISOString(),
          createdAt: '2024-07-02T21:31:58.291Z',
          updatedAt: '2024-07-02T21:31:58.291Z'
        }
      ];


      if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify(users));
      }

      if (!localStorage.getItem('sessions')) {
        localStorage.setItem('sessions', JSON.stringify(sessions));
      }
    };

    initializeLocalStorage();

    const user = localStorage.getItem('user');
    if (user) {
      router.push('/users');
    }
  }, [router]);

  return (
    <Container maxWidth="sm">
      <div className={"navigator"}>
        <Button id="iniciar-sesion" onClick={() => router.push('/login')}>Iniciar Sesión</Button>
        
      </div>
    </Container>
  );
}