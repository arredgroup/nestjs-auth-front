"use client";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Container, Button } from "@mui/material";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      router.push('/users');
    }
  }, []);

  return (
    <Container maxWidth="sm">
      <div className={"navigator"}>
        <Button id="iniciar-sesion" onClick={() => router.push('/login')}>Iniciar Sesión</Button>
      </div>
    </Container>
  );
}

