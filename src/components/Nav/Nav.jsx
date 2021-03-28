import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

import { Grid, Typography } from '@material-ui/core';

function Nav() {
  const user = useSelector((store) => store.user);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }

  return (
    <Grid item container className="nav" alignItems="stretch" direction="row" justify="space-between">
      <Grid item xs={8}>
        <Link to="/home">
          <Typography variant="h1" className="nav-title">App of Holding</Typography>
        </Link>
      </Grid>
      <Grid item container xs={4} justify="flex-end" alignItems="stretch" wrap="nowrap">
        <Link className="navLink" to={loginLinkData.path}>
          {loginLinkData.text}
        </Link>
        
        {user.id && (
          <>
            <Link className="navLink" to="/characterCreator">
              Character Creator
            </Link>

            <LogOutButton className="navLink" color="default" variant="text" />
          </>
        )}
      </Grid>
    </Grid>
  );
}

export default Nav;
