import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';

import {
  Button, 
  FormControl, 
  Grid, 
  Typography, 
  TextField
} from '@material-ui/core';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form className="formPanel" onSubmit={login}>
      <Typography variant="h2">Login</Typography>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <Grid item container direction="column" alignItems="stretch" spacing={3} xs={12}>
        <Grid item>
          <FormControl fullWidth>
            <TextField
              label="Username"
              type="text"
              name="username"
              required
              value={username}
              variant="outlined"
              onChange={(event) => setUsername(event.target.value)}
            />
          </FormControl>
        </Grid>
        
        <Grid item>
          <FormControl fullWidth>
            <TextField
              label="Password"
              type="password"
              name="password"
              required
              value={password}
              variant="outlined"
              onChange={(event) => setPassword(event.target.value)}
            />
          </FormControl>
        </Grid>

        <Grid item container justify="center">
          <Button color="primary" variant="contained" className="btn" type="submit" name="submit">Log In</Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default LoginForm;
