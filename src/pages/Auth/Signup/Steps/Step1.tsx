import { Container, Box, Avatar, Typography, Grid, TextField, FormControlLabel, Checkbox, Button, Link, InputAdornment, IconButton } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useSignupContext } from "contexts/SignupContext";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import useAuth from "hooks/useAuth";
const Step1 = () => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}/gm;
  const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
  const [passwordIsValid, setPasswordIsValid] = useState<boolean>(true);
  const [finalMatch, setFinalMatch] = useState<boolean>(false);
  const [passwordText, setPasswordText] = useState<string>("");
  const [passwordFinal, setPasswordFinal] = useState<string>("");
  const [emailErrorText, setEmailErrorText] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const {
    name,
    setName,
    setEmail,
    setUsername,
    setPassword,
  } = useSignupContext();

  const usernameExists = useState<boolean>(false);
  const minUsernameLength = 8;
  const [isMinLength, setIsMinLength] = useState<boolean>(true);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const {
    setUsern,
  } = useAuth.UsernameExists();

  function emailValidation(input: string) {
    var match = emailRegex.test(input);

    if (!match) {
      setEmailErrorText("Email must be in example@example.ex format");
      setEmailError(true);

      return ;
    }

    setEmailError(false);
    setEmail(input);
  }

  function passwordValidation(input: string) {
    if (input.length < 8) {
      setPasswordIsValid(false);
      setPasswordText("Password must be at least 8 characters long");

      return ;
    }
    
    var match = passwordRegex.test(input);

    if (!match) {
      setPasswordText("Password must contain at least 1: Number, Uppercase, Lowercase and Special Character");
      setPasswordIsValid(false);

      return ;
    }

    setPasswordIsValid(match);
    setPasswordFinal(input);
    setPassword(input);
  }
  
  return (
    <>
      <Typography component="h3" variant="body1" marginBottom={2}>
        Enter your login information
      </Typography>
      <Typography component="p" variant="caption" marginBottom={2}>
        Your username and password will allow you to log into the platform.
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="given-name"
            name="firstName"
            required
            fullWidth
            id="firstName"
            label="First Name"
            onChange={(event) => {
              setName(event.target.value);
            }}
            autoFocus />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
            onChange={(event) => {
              setName(name + " " + event.target.value);
            }} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            error={emailError}
            helperText={emailError ? emailErrorText : ""}
            onChange={(event) => {
              emailValidation(event.target.value);
            }} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            error={usernameExists && !isMinLength}
            id="username"
            label="Username"
            name="username"
            helperText={usernameExists ? "" : "Username already in use."}
            autoComplete="username"
            onChange={(event) => {
              let value = event.target.value;
              if (value.length < minUsernameLength) {
                setIsMinLength(false);

                return ;
              }

              setIsMinLength(true);
              setUsern(value);
              
              setUsername(value);
            }} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="new-password"
            error={!passwordIsValid}
            helperText={!passwordIsValid ? passwordText : ""}
            onChange={(event) => {
              passwordValidation(event.target.value);
            }}
            InputProps={{
              endAdornment: <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>,
            }} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="repeatPassword"
            label="Re-Enter Password"
            type={showPassword ? 'text' : 'password'}
            id="repeatPassword"
            autoComplete="repeat-password"
            error={finalMatch}
            onChange={(event) => {
              if (passwordFinal == event.target.value) {
                setFinalMatch(false);

                return ;
              }

              setFinalMatch(true);
            }}
            InputProps={{
              endAdornment: <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>,
            }} />
        </Grid>
      </Grid>
    </>
  );
}

export default Step1;