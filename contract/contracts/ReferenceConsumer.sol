pragma solidity ^0.5.0;

import "@chainlink/contracts/src/v0.4/interfaces/AggregatorInterface.sol";

contract ReferenceConsumer {

  AggregatorInterface internal ref;

  struct Bet {
    address player;
    uint256 amount;
    uint256 timeStart;
    uint256 timeEnd;
    int256 lastPrice;
    uint8 choice; // 0 < // 1 == // 2 >
    uint8 status; // 0 = not done // 1 = done
    uint8 isWin;  // 0 = lost // 1 = win
  }

  address ceoAddress;              // address of ceo
  Bet[] public bets;               // array of Bet
  uint256 public numberOfBet = 0;  //index
  uint256 private rewardAmount = 0;   //eth can't withdraw
  uint256[] public waitingBet;

  constructor(address _aggregator) public {
    ref = AggregatorInterface(_aggregator);
    ceoAddress = msg.sender;
  }

  modifier onlyCeo() {
    require(msg.sender == ceoAddress, "sender must be ceo.");
    _;
  }

  function getLatestAnswer() public view returns (int256) {
    return ref.latestAnswer();
  }

  function getLatestTimestamp() public view returns (uint256) {
    return ref.latestTimestamp();
  }

  function getPreviousAnswer(uint256 _back) public view returns (int256) {
    uint256 latest = ref.latestRound();
    require(_back <= latest, "Not enough history");
    return ref.getAnswer(latest - _back);
  }

  function getPreviousTimestamp(uint256 _back) public view returns (uint256) {
    uint256 latest = ref.latestRound();
    require(_back <= latest, "Not enough history");
    return ref.getTimestamp(latest - _back);
  }

  function CeoFunding(uint _amount) public payable onlyCeo {
    require(msg.value >= _amount, "Input not enough");
  }

  function BalanceOfContract() public view returns (uint256) {
    return address(this).balance;
  }

  function BalanceCeoCanWithdraw() public view onlyCeo returns (uint256){
      return address(this).balance - rewardAmount;
  }

  function CeoWithdraw(uint256 _amount) external {
    require(msg.sender == ceoAddress, 'Only manager');
    require(_amount <= address(this).balance - rewardAmount, 'Can only withdraw balance not in reward o');
    msg.sender.transfer(_amount);
  }

  function beting(uint8 user_choice, uint256 _amount) external payable {
    require(msg.value >= _amount, "Input not enough");
    require(now <= ref.latestTimestamp() + 3600, "bet time has end.");

    // user_choice = 0 mean <
    // user_choice = 1 mean =
    // user_choice = 2 mean >
    require(user_choice == 0 || user_choice == 1 || user_choice == 2, "User's choice must in range");

    // push user request to BET
    bets.push(Bet(msg.sender, msg.value, now, now + 10800, ref.latestAnswer(), user_choice, 0, 0));
    waitingBet.push(bets.length - 1);

    rewardAmount += (_amount*2 - _amount/10);
    numberOfBet += 1;
  }

  function reward() public onlyCeo {
      for (uint256 i = 0; i < waitingBet.length; i++) {
        if (bets[waitingBet[i]].timeEnd <= ref.latestTimestamp()) {
          if(bets[waitingBet[i]].lastPrice < ref.latestAnswer() && bets[waitingBet[i]].choice == 0
          || bets[waitingBet[i]].lastPrice == ref.latestAnswer() && bets[waitingBet[i]].choice == 1
          || bets[waitingBet[i]].lastPrice > ref.latestAnswer() && bets[waitingBet[i]].choice == 2
          ){
          bets[waitingBet[i]].timeEnd = ref.latestTimestamp();
          bets[waitingBet[i]].status = 1;
          bets[waitingBet[i]].isWin = 1;
           rewardAmount -= ( bets[waitingBet[i]].amount*2 - bets[waitingBet[i]].amount/10 );
          msg.sender.transfer(bets[waitingBet[i]].amount + bets[waitingBet[i]].amount - bets[waitingBet[i]].amount/10);
            waitingBet[i] = waitingBet[waitingBet.length - 1];
            waitingBet.pop();
          }
        }
      }
  }
}
