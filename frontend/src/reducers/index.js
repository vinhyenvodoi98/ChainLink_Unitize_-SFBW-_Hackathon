import { combineReducers } from 'redux';
import WalletReducer from './WalletReducer';
import ContractReducer from './ContractReducer';

const rootReducer = combineReducers({
  wallet: WalletReducer,
  contract: ContractReducer,
});

export default rootReducer;
