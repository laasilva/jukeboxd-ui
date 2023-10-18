import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { AuthContext } from 'contexts/AuthContext';
import Login from 'pages/Auth/Login';
import Signup from 'pages/Auth/Signup';
import { useState } from 'react';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [login, setLogin] = useState<boolean>(true);
  const [signup, setSignup] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");

  return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
          <AuthContext.Provider value={{ login, setLogin, signup, setSignup, token, setToken }}>
            {login && <Login />}
            {signup && <Signup />}
          </AuthContext.Provider>
      </ThemeProvider>
  );
}

export default App;
