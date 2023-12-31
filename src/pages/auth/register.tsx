import userService from "@/services/user-service";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import CssBaseline from "@mui/material/CssBaseline";
import PersonOutlined from "@mui/icons-material/PersonOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/router";
import React, { useState } from "react";
import ModalFailed from "../user/modalFailed";
import ModalSuccess from "../user/modalSucess";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

const theme = createTheme();

export default function Register() {
  const router = useRouter();

  const [username, setUsername] = useState<String>("");
  const [usernameError, setUsernameError] = useState(false);
  const [password, setPassword] = useState<String>("");
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState<String>("");
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<String>("");
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCloseModalSuccess = () => {
    setModalSuccessOpen(false);
  };

  const handleUsernameChange = (event: any) => {
    setUsername(event.target.value);
    setUsernameError(event.target.value === "");
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
    setPasswordError(event.target.value === "");
  };

  const handlePasswordConfirmChange = (event: any) => {
    setPasswordConfirm(event.target.value);
    setPasswordConfirmError(event.target.value === "");
  };

  const handleRegister = (event: any) => {
    event.preventDefault();
    if (username === "" && password === "" && passwordConfirm === "") {
      setModalOpen(true);
      setErrorMessage(
        "Username, password and password confirmation are required"
      );
      setUsernameError(true);
      setPasswordError(true);
      setPasswordConfirmError(true);
      return;
    }
    if (username === "") {
      setModalOpen(true);
      setErrorMessage("Username is required");
      setUsernameError(true);
      return;
    }
    if (password === "") {
      setModalOpen(true);
      setErrorMessage("Password is required");
      setPasswordError(true);
      return;
    }
    if (passwordConfirm === "") {
      setModalOpen(true);
      setErrorMessage("Password confirmation is required");
      setPasswordConfirmError(true);
      return;
    }
    if (passwordConfirm !== password) {
      setModalOpen(true);
      setErrorMessage("Password confirmation does not match password");
      return;
    }

    const dataUser = {
      username,
      password,
    };

    userService
      .register(dataUser)
      .then((response) => {
        setTimeout(() => {
          setModalSuccessOpen(true);
        }, 3000);
        setModalSuccessOpen(false);
        router.push("/auth/login");
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setErrorMessage("Error: Please try another username");
        } else {
          setErrorMessage("Error: " + error.message);
        }
        setModalOpen(true);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <title>Register</title>
      </Head>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Container component="main" maxWidth="xl">
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Link href="/">
                <Image src="/logo.png" alt="Logo" className="h-12 mt-5 mb-5" width={250} height={61} />
              </Link> 
              <Typography
                component="h1"
                variant="h4"
                className="mt-3"
                sx={{
                  fontFamily: "Poppins",
                  fontStyle: "bold",
                  fontSize: "4vh",
                }}
              >
                Register to ProLearn
              </Typography>
              <Box
                component="form"
                noValidate
                sx={{ mt: 1 }}
                onSubmit={handleRegister}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="current-username"
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlined />
                      </InputAdornment>
                    ),
                  }}
                  value={username}
                  onChange={handleUsernameChange}
                  error={usernameError}
                  helperText={usernameError ? "Username is required" : ""}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  name="password"
                  autoComplete="current-password"
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  value={password}
                  onChange={handlePasswordChange}
                  error={passwordError}
                  helperText={passwordError ? "Password is required" : ""}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="confpassword"
                  type={showPasswordConfirm ? "text" : "password"}
                  label="Password Confirmation"
                  name="confpassword"
                  autoComplete="current-confirmation-password"
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={() => setShowPasswordConfirm(!showPasswordConfirm)} edge="end">
                          {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  value={passwordConfirm}
                  onChange={handlePasswordConfirmChange}
                  error={passwordConfirmError}
                  helperText={
                    passwordConfirmError
                      ? "Password confirmation is required"
                      : ""
                  }
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    display: "flex",
                    margin: "auto",
                    mt: 2,
                    mb: 3,
                    paddingLeft: "1.5rem",
                    paddingRight: "1.5rem",
                    fontFamily: "Poppins",
                    color: "white",
                    fontSize: "2vh",
                    backgroundColor: "#0C21C1 !important",
                    borderRadius: "7.5px",
                    width: "content-fit",
                    "&:hover": { backgroundColor: "#0C21C1 !important" },
                  }}
                >
                  Register
                </Button>
              </Box>
              <div className="text-md font-medium">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-blue-700">
                  Login here
                </Link>
              </div>
            </Box>
          </Container>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Container component="main" maxWidth="xl">
            <Box
              sx={{
                height: "80vh",
                width: "70vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "end",
                backgroundColor: "#000842",
                borderRadius: "10px",
                marginTop: 10,
              }}
            >
              <Container
                component="main"
                maxWidth="xs"
                sx={{
                  height: "100vh",
                  width: "100vh",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "start",
                  borderRadius: "10px",
                  marginBottom: 5,
                }}
              >
                <Image
                  src="/Saly-10 (1).png"
                  alt="Logo"
                  width={1826}
                  height={2084}
                  priority
                />
              </Container>
              <Container component="main" maxWidth="xl">
                <Typography
                  component="h1"
                  variant="h5"
                  textAlign={"center"}
                  color="white"
                  className="ml-10"
                  sx={{
                    fontFamily: "Montserrat",
                    fontStyle: "bold",
                    fontSize: "4vh",
                  }}
                >
                  Meet ProLearn,
                </Typography>
                <Typography
                  component="h1"
                  variant="h5"
                  textAlign={"center"}
                  color="white"
                  className="ml-10"
                  sx={{
                    fontFamily: "Montserrat",
                    fontStyle: "bold",
                    fontSize: "2.5vh",
                    marginBottom: "10vh",
                  }}
                >
                  Learning Like a Pro Starts Here
                </Typography>
              </Container>
            </Box>
          </Container>
        </Grid>
        <Modal open={modalOpen} onClose={handleCloseModal}>
          <ModalFailed
            open={modalOpen}
            onClose={handleCloseModal}
            error={errorMessage}
          />
        </Modal>
        <Modal open={modalSuccessOpen}>
          <ModalSuccess
            open={modalSuccessOpen}
            onClose={handleCloseModalSuccess}
          />
        </Modal>
      </Grid>
    </ThemeProvider>
  );
}
