import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as contractAction from 'actions/contractAction';
import { Paper, Button, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Loading from 'components/Loading';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '450px',
      height: '520px',
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
  unchanged: {
    backgroundColor: '#4caf50',
    '&:hover, &:focus': {
      backgroundColor: '#4caf50',
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
  noBorderRadius: {
    borderTopRightRadius: '0px',
    borderTopLeftRadius: '0px',
    borderBottomRightRadius: '0px',
    borderBottomLeftRadius: '0px',
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
  const dispatch = useDispatch();
  const contract = useSelector((state) => state.contract);

  const classes = useStyles();
  const [isUp, setIsUp] = useState(2);
  const listBeting = [0.01, 0.1, 1];
  const [betEth, setBetEth] = useState(0.01);

  useEffect(() => {
    const getLastestTimeAndPrice = async () => {
      dispatch(contractAction.getLastest());
    };
    getLastestTimeAndPrice();
  }, [dispatch, contract.ContractReference]);

  const updateLastest = () => {
    dispatch(contractAction.getLastest());
  };

  const Bet = () => {
    dispatch(contractAction.bet(isUp, betEth));
  };

  return (
    <div className={`${classes.root} ${classes.flexContentCenter}`}>
      <Paper elevation={4}>
        <div className={`${classes.flexContentCenter} ${classes.flexColumn}`}>
          <Button
            style={{ width: '120px', margin: 'auto' }}
            className={`${classes.fontWeight}`}
            variant='contained'
            color='primary'
            onClick={() => updateLastest()}
          >
            Update Price
          </Button>
          {!!contract.lastPrice ? (
            <Typography className={`${classes.title}`} variant='h6'>
              {`1 ETH = ${contract.lastPrice}$ in ${contract.lastTime} GMT+0:00`}
            </Typography>
          ) : (
            <Loading />
          )}

          <Typography className={`${classes.title}`} variant='h6'>
            {'Price will go up or down in next 3 hours'}
          </Typography>

          <Typography className={`${classes.title}`} variant='h6'>
            {'If you win you will get x1.9 what you bet'}
          </Typography>

          {isUp === 0 ? (
            <Grid container className={classes.space} direction='row' justify='center'>
              <Button
                variant='contained'
                className={`${classes.goingUp} ${classes.borderRadiusRight} ${classes.buttonSize} ${classes.fontWeight}`}
              >
                Going Up
              </Button>
              <Button
                variant='contained'
                className={`${classes.disable} ${classes.noBorderRadius} ${classes.buttonSize} ${classes.fontWeight}`}
                onClick={() => setIsUp(1)}
              >
                Unchanged
              </Button>
              <Button
                variant='contained'
                className={`${classes.disable} ${classes.borderRadiusLeft} ${classes.buttonSize} ${classes.fontWeight}`}
                onClick={() => setIsUp(2)}
              >
                Going Down
              </Button>
            </Grid>
          ) : isUp === 1 ? (
            <Grid container className={classes.space} direction='row' justify='center'>
              <Button
                variant='contained'
                className={`${classes.disable} ${classes.borderRadiusRight} ${classes.buttonSize} ${classes.fontWeight}`}
                onClick={() => setIsUp(0)}
              >
                Going Up
              </Button>
              <Button
                variant='contained'
                className={`${classes.unchanged} ${classes.noBorderRadius} ${classes.buttonSize} ${classes.fontWeight}`}
              >
                Unchanged
              </Button>
              <Button
                variant='contained'
                className={`${classes.disable} ${classes.borderRadiusLeft} ${classes.buttonSize} ${classes.fontWeight}`}
                onClick={() => setIsUp(2)}
              >
                Going Down
              </Button>
            </Grid>
          ) : (
            <Grid container className={classes.space} direction='row' justify='center'>
              <Button
                variant='contained'
                className={`${classes.disable} ${classes.borderRadiusRight} ${classes.buttonSize} ${classes.fontWeight}`}
                onClick={() => setIsUp(0)}
              >
                Going Up
              </Button>
              <Button
                variant='contained'
                className={`${classes.disable} ${classes.noBorderRadius} ${classes.buttonSize} ${classes.fontWeight}`}
                onClick={() => setIsUp(1)}
              >
                Unchanged
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
              onClick={() => Bet()}
            >
              Send
            </Button>
          </Grid>
        </div>
      </Paper>
    </div>
  );
}
