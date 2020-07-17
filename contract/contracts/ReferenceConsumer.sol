pragma solidity ^0.4.24;

import "@chainlink/contracts/src/v0.4/interfaces/AggregatorInterface.sol";

contract ReferenceConsumer {
  AggregatorInterface internal ref;

  int256 public ETHUSD_STORED;
  address ceoAddress;

  mapping(address => uint256) public choice;
  mapping(address => uint256) public time;
  mapping(address => uint256) private amount;
  mapping(address => int256) public lastPrice;
  mapping(address => uint256) public lastTime;

  constructor(address _aggregator) public {
    ref = AggregatorInterface(_aggregator);
    ETHUSD_STORED = ref.latestAnswer();
    ceoAddress = msg.sender;
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

  // check time
  modifier checkTime() {
    require(now <= ref.latestTimestamp() + 3600, "bet time has end.");
    _;
  }

  modifier onlyCeo() {
    require(msg.sender == ceoAddress, "sender must be ceo.");
    _;
  }

  function fund(uint _amount) public payable onlyCeo {
    require(msg.value >= _amount, "Must put enough eth");
  }

  function getBalance() public view returns (uint256) {
    return address(this).balance;
  }

  function beting(uint256 user_choice, uint _amount)  external  payable checkTime {
    require(msg.value >= _amount, "Must put enough eth");

    // user_choice = 0 mean <
    // user_choice = 1 mean =
    // user_choice = 2 mean >

    require(user_choice == 0 || user_choice == 1 || user_choice == 2, "user's choice must in range");

    amount[msg.sender] = msg.value;
    choice[msg.sender] = user_choice;
    lastTime[msg.sender] = ref.latestTimestamp();
    lastPrice[msg.sender] = ref.latestAnswer();
  }

  function claim() public {
    require(ref.latestTimestamp() >= lastTime[msg.sender] + 10800, "It's not time to receive your reward yet.");

    if(lastPrice[msg.sender] < ref.latestAnswer() && choice[msg.sender] == 0){
      //if win claim x1.9
      msg.sender.transfer(amount[msg.sender] + amount[msg.sender] - amount[msg.sender] / 10);
    }else if(lastPrice[msg.sender] == ref.latestAnswer() && choice[msg.sender] == 1){
      msg.sender.transfer(amount[msg.sender] + amount[msg.sender] - amount[msg.sender] / 10);
    }else if(lastPrice[msg.sender] > ref.latestAnswer() && choice[msg.sender] == 2){
      msg.sender.transfer(amount[msg.sender] + amount[msg.sender] - amount[msg.sender] / 10);
    }
  }
}
