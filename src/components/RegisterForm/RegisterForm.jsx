import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button, 
  FormControl, 
  Grid, 
  Typography, 
  TextField
} from '@material-ui/core';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <Typography variant="h2">Register User</Typography>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <Grid item container direction="column" alignItems="stretch" spacing={3} xs={12}>
        <Grid item>
          <FormControl fullWidth>
            <TextField
              label="Username"
              type="text"
              name="username"
              value={username}
              variant="outlined"
              required
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
              value={password}
              variant="outlined"
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </FormControl>
        </Grid>

        <Grid item container justify="center">
          <Button color="primary" variant="contained" className="btn" type="submit" name="submit">Register</Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default RegisterForm;
