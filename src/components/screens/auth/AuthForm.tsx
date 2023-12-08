"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { authSchema } from "./schema";
import { LoginInput } from "@/contexts/AuthContext/types";
import { useAuthContext } from "@/contexts/AuthContext";

export default function AuthForm() {
  const [isLogin, setIsLogin] = React.useState(true);
  const { login, register, user } = useAuthContext();
  const { handleSubmit, control } = useForm<LoginInput>({
    resolver: yupResolver(authSchema),
    mode: "onChange",
  });

  function onSubmit(data: LoginInput) {
    console.log(data);
    if (isLogin) {
      login(data);
    } else {
      register(data);
    }
  }

  function handleChangeLoginType() {
    setIsLogin((prev) => !prev);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isLogin ? "Sign in" : "Sign up"}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState: { error, invalid } }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                error={invalid}
                // error={!!error} //error = {} -> true, error = undefined -> false
                helperText={error?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState: { error, invalid } }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={invalid}
                helperText={error?.message}
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isLogin ? "Sign in" : "Sign up"}
          </Button>
          <Grid container>
            <Grid item xs>
              {isLogin && (
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              )}
            </Grid>
            <Grid item>
              <Link onClick={handleChangeLoginType} href="#" variant="body2">
                {isLogin
                  ? "Don't have an account? Sign Up"
                  : "Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
