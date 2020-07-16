import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
import { Paper, Button, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '450px',
      height: '550px',
      padding: theme.spacing(2),
    },
  },
  flexContentCenter: {
    display: 'flex',
    justifyContent: 'center',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  marginAuto: {
    margin: 'auto',
  },
  title: {
    margin: '15px',
    textAlign: 'center',
  },
  buttonSize: {
    height: '60px',
    width: '100px',
  },
  goingUp: {
    backgroundColor: '#3599db',
    '&:hover, &:focus': {
      backgroundColor: '#3599db',
    },
  },
  goingDown: {
    backgroundColor: '#8c2f51',
    '&:hover, &:focus': {
      backgroundColor: '#8c2f51',
    },
  },
  borderRadiusRight: {
    borderTopRightRadius: '0px',
    borderTopLeftRadius: '20px',
    borderBottomRightRadius: '0px',
    borderBottomLeftRadius: '20px',
  },
  borderRadiusLeft: {
    borderTopRightRadius: '20px',
    borderTopLeftRadius: '0px',
    borderBottomRightRadius: '20px',
    borderBottomLeftRadius: '0px',
  },
  disable: {
    backgroundColor: '#929292',
    '&:hover, &:focus': {
      backgroundColor: '#707070',
    },
  },
  fontWeight: {
    fontWeight: 'bold',
    color: 'white',
  },
  space: {
    margin: '20px 0px 20px 0px',
  },
}));

export default function PlayGround() {
  const classes = useStyles();
  const [isUp, setIsUp] = useState(false);
  const listBeting = [0.01, 0.1, 1];
  const [betEth, setBetEth] = useState(0.01);
  // const wallet = useSelector((state) => state.wallet);

  return (
    <div className={`${classes.root} ${classes.flexContentCenter}`}>
      <Paper elevation={4}>
        <div className={`${classes.flexContentCenter} ${classes.flexColumn}`}>
          <Button
            style={{ width: '120px', margin: 'auto' }}
            className={`${classes.fontWeight}`}
            variant='contained'
            color='primary'
          >
            Get Price and Time
          </Button>
          <Typography className={`${classes.title}`} variant='h6'>
            {'1 ETH = 250$ in ' + new Date().toTimeString()}
          </Typography>
          <Typography className={`${classes.title}`} variant='h6'>
            {'Price will go up or down in the next 10s'}
          </Typography>

          {isUp ? (
            <Grid container className={classes.space} direction='row' justify='center'>
              <Button
                variant='contained'
                className={`${classes.goingUp} ${classes.borderRadiusRight} ${classes.buttonSize} ${classes.fontWeight}`}
              >
                Going Up
              </Button>
              <Button
                variant='contained'
                className={`${classes.disable} ${classes.borderRadiusLeft} ${classes.buttonSize} ${classes.fontWeight}`}
                onClick={() => setIsUp(false)}
              >
                Going Down
              </Button>
            </Grid>
          ) : (
            <Grid container className={classes.space} direction='row' justify='center'>
              <Button
                variant='contained'
                className={`${classes.disable} ${classes.borderRadiusRight} ${classes.buttonSize} ${classes.fontWeight}`}
                onClick={() => setIsUp(true)}
              >
                Going Up
              </Button>
              <Button
                variant='contained'
                className={`${classes.goingDown} ${classes.borderRadiusLeft} ${classes.buttonSize} ${classes.fontWeight}`}
              >
                Going Down
              </Button>
            </Grid>
          )}
          <Grid container className={classes.space} direction='row' justify='space-around'>
            {listBeting.map((bet, index) =>
              betEth === bet ? (
                <Button
                  key={index}
                  variant='contained'
                  className={`${classes.goingUp} ${classes.buttonSize} ${classes.fontWeight}`}
                  onClick={() => setIsUp(true)}
                >
                  {bet.toString() + ' ETH'}
                </Button>
              ) : (
                <Button
                  key={index}
                  variant='contained'
                  className={`${classes.disable} ${classes.buttonSize} ${classes.fontWeight}`}
                  onClick={() => setBetEth(bet)}
                >
                  {bet.toString() + ' ETH'}
                </Button>
              )
            )}
          </Grid>

          <Grid container className={`${classes.space}`} direction='row' justify='center'>
            <Button
              style={{ width: '120px', margin: 'auto' }}
              className={`${classes.fontWeight}`}
              variant='contained'
              color='primary'
            >
              Send
            </Button>
          </Grid>
        </div>
      </Paper>
    </div>
  );
}
