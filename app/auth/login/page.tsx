"use client";

import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Stack,
} from "@mui/material";
import { useStore } from "@/store/taskStore";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useStore();
  const router = useRouter();

  // Демо-учётные данные
  const demoCredentials = {
    email: "dbdb@gmail.com",
    password: "58Eb4RsYmsQXm4w",
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser({ email, password });
      router.push("/");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  // Мгновенный логин для демо-аккаунта
  const handleDemoLogin = async () => {
    try {
      await loginUser(demoCredentials);
      router.push("/");
    } catch (error) {
      console.error("Demo login failed", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Login
            </Button>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={handleDemoLogin}
            >
              Use Demo Account
            </Button>
          </Stack>
        </form>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <Link href="/auth/register" underline="hover">
            Register
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
