import * as actions from 'actions/contractAction';

const initialState = {
  ContractReference: null,
  lastPrice: null,
  lastTime: null,
};

const ContractReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.INIT_CONTRACT:
      return {
        ...state,
        ContractReference: action.ContractReference,
      };
    case actions.UPDATE_LASTEST:
      return {
        ...state,
        lastPrice: action.lastPrice,
        lastTime: action.lastTime,
      };
    default:
      return state;
  }
};

export default ContractReducer;
