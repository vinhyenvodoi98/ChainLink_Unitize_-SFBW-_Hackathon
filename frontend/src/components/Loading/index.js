import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    zIndex: '1',
    top: '0px',
    left: '0px',
    backgroundColor: '#5db45c',
  },
  loading: {
    backgroundImage: 'url(/money.gif)',
    backgroundSize: '400px',
    margin: 'auto',
    width: '300px',
    height: '300px',
    backgroundPosition: 'center',
  },
  title: {
    position: 'absolute',
    top: '20vh',
    fontSize: '3em',
    fontWeight: 'bold',
  },
}));

export default function Loading() {
  const classes = useStyles();
  return (
    <div className={`${classes.root}`}>
      <div className={`${classes.loading}`} />
      <p className={`${classes.title}`}>Loading Price ...</p>
    </div>
  );
}
