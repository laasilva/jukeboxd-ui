import { Container, Box, Avatar, Typography, Grid, TextField, FormControlLabel, Checkbox, Button, Link, Stepper, Step, StepLabel, StepperContext } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuthContext } from "contexts/AuthContext";
import Copyright from "components/Copyright/Copyright";
import Step1 from "./Steps/Step1";
import { SignupContext } from "contexts/SignupContext";
import { Fragment, useState } from "react";
import React from "react";

const Signup = () => {
  const steps = ['Account information', 'Music taste', 'Your Picture'];

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [completed, setCompleted] = useState<boolean>(false);

  const { setLogin, setSignup } = useAuthContext();
  const [name, setName] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [genres, setGenres] = useState<string[]>();
  const [favoriteArtist, setFavoriteArtist] = useState<any>();
  const [favoriteAlbum, setFavoriteAlbum] = useState<any>();
  const [favoriteSong, setFavoriteSong] = useState<any>();
  const [picture, setPicture] = useState<any>();

  function isStepSkipped(step: number) {
    return skipped.has(step);
  };

  function handleNext() {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  function handleBack() {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function handleReset() {
    setActiveStep(0);
  };
  
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Container component="main" maxWidth="md">
      <StepperContext.Provider value={{ completed, setCompleted }}>
        <Box sx={{ 
          width: '100%',
        }}>
            <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
            </Box>
          <Stepper activeStep={activeStep} sx={{marginTop: 4}}>
            {steps.map((label, index) => {
              console.log(label, index);
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <Fragment>
            <Container component="main" maxWidth="xs">
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Box component="form" noValidate onSubmit={handleSubmit}>
                  <SignupContext.Provider value={{ 
                    name,
                    setName,
                    username,
                    setUsername,
                    email,
                    setEmail,
                    password,
                    setPassword,
                    description,
                    setDescription,
                    genres,
                    setGenres,
                    favoriteArtist,
                    setFavoriteArtist,
                    favoriteAlbum,
                    setFavoriteAlbum,
                    favoriteSong,
                    setFavoriteSong,
                    picture,
                    setPicture
                  }}>
                    {activeStep === 0 && <Step1 />}
                  </SignupContext.Provider>
                  <Grid container justifyContent="flex-end">
                    <Grid item marginTop={4}>
                      <Link href="#" variant="body2" onClick={() => {
                        setSignup(false);
                        setLogin(true);
                      }}>
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              {activeStep === steps.length - 1 ? 
                <Button
                  color="inherit"
                  fullWidth
                  variant="contained"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1, mt: 3, mb: 2 }}
                >
                  "I'm not ready yet!"
                </Button> : 
                <Button
                  color="inherit"
                  variant="contained"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>  
              }
              
              <Box sx={{ flex: '1 1 auto' }} />
              {
                activeStep === steps.length - 1 ? 
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                      Sign me up!
                  </Button> :
                  <Button 
                    variant="contained"
                    onClick={handleNext}>
                    Next
                  </Button>
              }
            </Box>
          </Fragment>
        </Box>
      </StepperContext.Provider>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}

export default Signup;