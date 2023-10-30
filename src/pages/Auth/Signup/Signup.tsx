import { Container, Box, Avatar, Typography, Grid, TextField, FormControlLabel, Checkbox, Button, Link, Stepper, Step, StepLabel, StepperContext } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuthContext } from "contexts/AuthContext";
import Copyright from "components/Copyright/Copyright";
import Step1 from "./Steps/Step1";
import { SignupContext } from "contexts/SignupContext";
import { Fragment, useEffect, useState } from "react";
import React from "react";
import Step2 from "./Steps/Step2";

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
  const [favoriteArtists, setFavoriteArtists] = useState<any>();
  const [favoriteAlbums, setFavoriteAlbums] = useState<any>();
  const [favoriteSongs, setFavoriteSongs] = useState<any>();
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

    switch (activeStep) {
      case 0:
        handleAccount(data);
        break ;
      case 1:
        handleInfo(data);
        break ;
      case 2:
        handlePicture(data);
        break ;
    } 

    handleNext();
  };

  function handleAccount(data: any) {
    var accountObject = {
      name: data.get('firstName') + " " + data.get('lastName'),
      email: data.get('email'),
      username: data.get('username'),
      password: data.get('password'),
    };

    console.log(accountObject);
  }

  function handleInfo(data: any) {
    var infoObject = {

    }

    console.log(infoObject);
  }

  function handlePicture(data: any) {
    var pictureObject = {

    }

    console.log(pictureObject);
  }

  return (
    <Container component="main" maxWidth="md">
      <StepperContext.Provider value={{ completed, setCompleted }}>
        <Box sx={{ width: '100%' }} component="form" noValidate onSubmit={handleSubmit}>
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
                <Box>
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
                    favoriteArtists,
                    setFavoriteArtists,
                    favoriteAlbums,
                    setFavoriteAlbums,
                    favoriteSongs,
                    setFavoriteSongs,
                    picture,
                    setPicture
                  }}>
                    {activeStep === 0 && <Step1 />}
                    {activeStep === 1 && <Step2 />}
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
                    type="submit"
                    variant="contained">
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