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

const convertTime = (timestamp) => {
  var date = new Date(timestamp * 1000);
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = '0' + date.getMinutes();
  // Seconds part from the timestamp
  var seconds = '0' + date.getSeconds();

  // Will display time in 10:30:23 format
  return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
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
    lastTime = convertTime(lastTime);

    dispatch({
      type: UPDATE_LASTEST,
      lastPrice,
      lastTime,
    });
  }
};

export const bet = (user_choice, _amount) => async (dispatch, getState) => {
  var state = getState();
  // your address
  var from = state.wallet.address;
  var web3 = state.wallet.web3;
  var contract = state.contract.ContractReference;
  if (!!contract) {
    _amount = web3.utils.toWei(_amount.toString(), 'ether');
    dispatch(isLoading(1));
    await contract.methods
      .beting(user_choice, _amount)
      .send({ from: from, value: _amount })
      .then(() => {
        // transaction success
        dispatch(isLoading(2));
        dispatch(updateHistory());
      })
      .catch((e) => {
        // transaction falls
        dispatch(isLoading(3));
      });
  }
};

export const ISLOADING = 'ISLOADING';
export const isLoading = (isLoading) => async (dispatch) => {
  dispatch({
    type: ISLOADING,
    isLoading,
  });
};

export const UPDATE_HISTORY = 'UPDATE_HISTORY';
export const updateHistory = () => async (dispatch, getState) => {
  var state = getState();
  // your address
  var web3 = state.wallet.web3;
  var from = state.wallet.address;
  var contract = state.contract.ContractReference;

  function getDataAsync(value) {
    return new Promise(async (resolve) => {
      let temp = await contract.methods.bets(value).call({ from });
      delete temp['0'];
      delete temp['1'];
      delete temp['2'];
      delete temp['3'];
      delete temp['4'];
      delete temp['5'];
      delete temp['6'];
      delete temp['7'];

      if (temp.choice === '0') temp.choice = 'Down';
      else if (temp.choice === '1') temp.choice = 'UnChanged';
      else temp.choice = 'Up';

      if (temp.status === '0') {
        temp.status = 'Pending';
        temp.isWin = 'Pending';
      } else {
        if (temp.isWin === '1') temp.isWin = 'Win';
        else temp.isWin = 'Lose';
        temp.status = 'Done';
      }

      temp.player = temp.player.slice(0, 5) + '...' + temp.player.slice(temp.player.length - 4);
      temp.timeStart = convertTime(temp.timeStart);
      temp.timeEnd = convertTime(temp.timeEnd);
      temp.lastPrice = parseInt(temp.lastPrice) / 100000000;
      temp.amount = web3.utils.fromWei(temp.amount, 'ether');

      resolve(temp);
    });
  }

  if (!!contract) {
    var historyIndex = await contract.methods.numberOfBet().call({ from });
    var promises = [];

    // let temp = await contract.methods.bets(0).call({ from });
    // console.log(temp);
    for (var i = historyIndex - 1; i > historyIndex - 10; --i) {
      if (i < 0) break;
      promises.push(getDataAsync(i));
    }
    Promise.all(promises)
      .then((results) => {
        console.log(results);
        dispatch({
          type: UPDATE_HISTORY,
          history: results,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }
};
