import * as actions from 'actions/walletActions';

const initialState = {
  web3: null,
  address: '',
  balance: '',
  shortAddress: '',
};

const WalletReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.WEB3_CONNECT:
      return {
        ...state,
        web3: action.web3,
        isConnect: action.isConnect,
      };
    case actions.GET_USERINFO:
      return {
        ...state,
        address: action.address,
        balance: action.balance,
        shortAddress: action.shortAddress,
      };
    default:
      return state;
  }
};

export default WalletReducer;
