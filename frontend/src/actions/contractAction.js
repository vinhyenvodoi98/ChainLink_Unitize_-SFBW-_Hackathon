import ReferenceConsumer from 'contracts/ReferenceConsumer.json';

export const INIT_CONTRACT = 'INIT_CONTRACT';
export const initContract = () => async (dispatch, getState) => {
  var state = getState();
  var web3 = state.wallet.web3;

  if (web3) {
    // networkId = 3
    var contractAddress = ReferenceConsumer.networks['3'].address;
    var ContractReference = new web3.eth.Contract(ReferenceConsumer.abi, contractAddress, {
      transactionConfirmationBlocks: 5,
    });
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

export const BET = 'BET';
export const bet = (user_choice, _amount) => async (dispatch, getState) => {
  var state = getState();
  // your address
  var from = state.wallet.address;
  var web3 = state.wallet.web3;
  var contract = state.contract.ContractReference;
  if (!!contract) {
    _amount = web3.utils.toWei(_amount.toString(), 'ether');
    user_choice ? (user_choice = 2) : (user_choice = 0);
    await contract.methods
      .beting(user_choice)
      .send({ from: from, value: _amount })
      .then(() => {
        console.log('success');
      })
      .catch((e) => {
        console.log(e);
      });
  }
};
