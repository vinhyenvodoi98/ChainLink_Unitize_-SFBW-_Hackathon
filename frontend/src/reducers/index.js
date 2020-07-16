import { combineReducers } from 'redux';
import WalletReducer from './WalletReducer';

const rootReducer = combineReducers({
  wallet: WalletReducer,
});

export default rootReducer;
