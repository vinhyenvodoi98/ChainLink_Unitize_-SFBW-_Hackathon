<h1 align="center">King Of Gambling</h1>

![alt](https://github.com/vinhyenvodoi98/ChainLink_Unitize_-SFBW-_Hackathon/blob/master/images/app.png)

# King Of Gambling Dapp
This demo includes 2 parts:

1. the browser UI (the frontend)
2. the Contract (the backend)

This application is deployed on ethereum's testnet (Ropsten network). This is a betting application for the price of ETH will go up or down or unchanged within the next 3 hours (because when using the Chainlink reference data contract every after 10800 seconds, aggregator smart contract calls oracles to get the new trusted answer). The person who correct prediction will be awarded 1.9 times the bet amount .

`If in the future time to get price of the chainlink reference contract is faster, then the bet time will be less than 3 hours.`

This particular dapp UI is written in Reactjs + Redux

## Functionality

1. Update Price : Because it is not possible to show realtime when the price changes, the top button will take the price of ethereum on the chainlink reference contract.
2. Going up / Unchanged / Going down : For users to predict the price of ethereum
3. 0.01 ETH /0.1 ETH/ 1 ETH : Amount of money the user wants to bet
4. Send : Send predict results


## How to run

### Prerequisites :

* Node : > v12.16
* Have eth in ropsten network

### Deploy contract

First set up the network and account by editing the .env.example file to .env file and enter MNEMONIC and RPC_URL (eg url provided by infura)

```sh
MNEMONIC =
RPC_URL=
```

Then using command

```sh
cd contract

yarn install

yarn migrate:live
```

### Run frontend

```
cd frontend

yarn install

yarn start
```

> ### Create abi symLink from contract to frontend

```sh
ln -s $PWD/contract/build/contracts $PWD/frontend/src
```

## Here's the video Demo:
