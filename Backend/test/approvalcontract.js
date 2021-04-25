

const ApprovalContract = artifacts.require('../../contracts/ApprovalContract.sol');
contract('ApprovalContract', function(account){
  it('initiate contract', async  function(){
    const contract =  await ApprovalContract.deployed();
    const approver = await contract.approver.call();

    assert.equal(approver, 0xeb8Ff84f5Fde6b9f745c6eE08D2Ac99AB9878C8D,'Approver dont match');
  });


  it('takes a deposit', async function(){
    const contract = await ApprovalContract.deployed();
    await contract.deposit(accounts[0],{value: 1e+18, from: accounts[0]});

    assert.equal(web3.eth.getBalance(contract.address),1+18,'not match');
  })
})
