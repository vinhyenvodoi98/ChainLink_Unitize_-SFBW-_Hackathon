import * as actions from 'actions/contractAction';

const initialState = {
  ContractReference: null,
  lastPrice: null,
  lastTime: null,
  isLoading: 0, // 1 is loading, 2 is success, 3 is error
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
    case actions.ISLOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
};

export default ContractReducer;
