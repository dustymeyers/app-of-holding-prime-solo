import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';

import { Grid, Typography, } from '@material-ui/core';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <Grid item container spacing={5} alignItems="center">
      <Grid item>
        <Typography variant="h3">Welcome, {user.username}!</Typography>
      </Grid>

      <Grid item>
        <LogOutButton variant="contained" color="secondary" />
      </Grid>
    </Grid>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
