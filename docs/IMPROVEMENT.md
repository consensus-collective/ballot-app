### 1. Add event logs

```solidity
// Events
event GiveVoteRight(address indexed voter);
event Vote(address indexed voter, uint proposalId);
event Delegate(address indexed sender, address indexed to);
```

### 2. Support `giveVoteRight` with array

function:

```solidity
  function giveRightToVotes(address[] calldata _voters) external {
      require( msg.sender == chairperson, "Only chairperson can give right to vote.");

      for (uint i; i < _voters.length; ++i){
          address newVoter = _voters[i];
          if (!voters[newVoter].voted && voters[newVoter].weight == 0){
              voters[newVoter].weight = 1;
              emit GiveVoteRight(newVoter);
          }
      }
  }
```

test case:

```typescript
it('shd be able to mass give right', async function () {
  const userArr = users.slice(0, 3).map((user) => user.address)
  const res = await ballotContract.connect(owner).giveRightToVotes(userArr)
  const receipt = await res.wait()
  for (const user of userArr) {
    // check weight
    expect((await ballotContract.voters(user)).weight).to.equal(1)
    // shd emit `GiveVoteRight` 3 times
    await expect(res).to.emit(ballotContract, 'GiveVoteRight').withArgs(user)
  }

  // should emit 3 events
  await expect(receipt?.logs.length).to.equal(userArr.length)
})
```

### 3. Add getter for proposals length

```solidity
   // return total number of proposals
   function proposalCount() external view returns (uint count){
    count = proposals.length;
   }
```

tx: https://sepolia.etherscan.io/tx/0xe12a7255da2275056462d21c1400e7a851f38c3eb2ea02affd12e4d470aee0ea
