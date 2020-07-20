import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Badge, AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#4156b5',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  badgePosition: {
    '& span': {
      marginLeft: '5px',
      marginRight: '5px',
    },
  },
  mgr: {
    marginRight: '10px',
  },
  success: {
    '& span': {
      backgroundColor: '#28a745',
    },
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Nav() {
  const classes = useStyles();
  const wallet = useSelector((state) => state.wallet);

  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          ></IconButton>
          <Typography variant='h6' className={classes.title}>
            King of Gambling
          </Typography>
          <p className={classes.mgr}>
            <strong>Address :</strong> {wallet.shortAddress} <strong>Balance :</strong>{' '}
            {wallet.balance} Eth
          </p>
          {!!wallet.web3 ? (
            <Button className={classes.badgePosition} variant='outlined' color='inherit'>
              <Badge className={classes.success} variant='dot' />
              Connected
            </Button>
          ) : (
            <Button className={classes.badgePosition} variant='outlined' color='inherit'>
              <Badge color='error' variant='dot' />
              Not Connected
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
