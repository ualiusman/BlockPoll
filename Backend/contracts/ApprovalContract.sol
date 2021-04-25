//
pragma solidity ^0.5.16;

contract ApprovalContract{
  address public sender;
  address payable public receiver;
  address public constant approver = 0xeb8Ff84f5Fde6b9f745c6eE08D2Ac99AB9878C8D;


  function deposit(address payable _receiver) external payable{
    require(msg.value > 0 );
    sender = msg.sender;
    receiver = _receiver;
  }

  function viewApprover() external pure returns(address){
    return(approver);
  }

  function approve() external{
    require(msg.sender == approver);
    receiver.transfer(address(this).balance);
  }
}
