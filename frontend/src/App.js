import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as walletActions from './actions/walletActions';
import Nav from 'components/nav';
import './App.css';
import PlayGround from 'components/playground';

function App() {
  const dispatch = useDispatch();

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
      <PlayGround />
    </div>
  );
}

export default App;
