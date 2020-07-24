import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as walletActions from './actions/walletActions';
import Nav from 'components/nav';
import './App.css';
import PlayGround from 'components/playground';
import SimpleTable from 'components/table';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function App() {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    const getAddress = () => {
      window.addEventListener('load', () => {
        dispatch(walletActions.web3Connect());
      });
    };
    getAddress();
  });

  return (
    <div className='App'>
      <Nav />
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={5}>
            <PlayGround />
          </Grid>
          <Grid item xs={7}>
            <SimpleTable />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;
