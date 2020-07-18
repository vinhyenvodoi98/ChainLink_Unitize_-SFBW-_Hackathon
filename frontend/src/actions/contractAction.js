import Contract from 'web3-eth-contract';
import ReferenceConsumer from 'contracts/ReferenceConsumer.json';

export const INIT_CONTRACT = 'INIT_CONTRACT';
export const initContract = () => async (dispatch, getState) => {
  var state = getState();
  var web3 = state.wallet.web3;
  Contract.setProvider(process.env.REACT_APP_RPC_URL);
  if (web3) {
    // networkId = 3
    var contractAddress = ReferenceConsumer.networks['3'].address;
    var ContractReference = new Contract(ReferenceConsumer.abi, contractAddress);
    dispatch({
      type: INIT_CONTRACT,
      ContractReference,
    });
  }
};

export const UPDATE_LASTEST = 'UPDATE_LASTEST';
export const getLastest = () => async (dispatch, getState) => {
  var state = getState();
  // your address
  var from = state.wallet.address;
  var contract = state.contract.ContractReference;
  if (!!contract) {
    var lastPrice = await contract.methods.getLatestAnswer().call({ from });
    var lastTime = await contract.methods.getLatestTimestamp().call({ from });

    // Convert
    lastPrice = lastPrice / 100000000;
    var date = new Date(lastTime * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = '0' + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = '0' + date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    dispatch({
      type: UPDATE_LASTEST,
      lastPrice,
      lastTime: formattedTime,
    });
  }
};
