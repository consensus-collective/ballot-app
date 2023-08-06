# Test report

```
$ yarn coverage

$ hardhat coverage

Version
=======
> solidity-coverage: v0.8.4

Instrumenting for coverage...
=============================

> Ballot.sol
> Ballot2.sol

Compilation:
============

Generating typings for: 2 artifacts in dir: typechain-types for target: ethers-v6
Successfully generated 8 typings!
Compiled 2 Solidity files successfully

Network Info
============
> HardhatEVM: v2.17.1
> network:    hardhat



  Ballot
    when the contract is deployed
      ✔ has the provided proposals
      ✔ has zero votes for all proposals
      ✔ sets the deployer address as chairperson
      ✔ sets the voting weight for the chairperson as 1
    when the chairperson interacts with the giveRightToVote function in the contract
      ✔ gives right to vote for another address
      ✔ can not give right to vote for someone that has voted (74ms)
      ✔ can not give right to vote for someone that has already voting rights (41ms)
    when the voter interacts with the vote function in the contract
      ✔ should register the vote (46ms)
    when the voter interacts with the delegate function in the contract
      ✔ should transfer voting power (46ms)
    when an account other than the chairperson interacts with the giveRightToVote function in the contract
      ✔ should revert
    when an account without right to vote interacts with the vote function in the contract
      ✔ should revert
    when an account without right to vote interacts with the delegate function in the contract
      ✔ should revert
    when someone interacts with the winningProposal function before any votes are cast
      ✔ should return 0
    when someone interacts with the winningProposal function after one vote is cast for the first proposal
      ✔ should return 0
    when someone interacts with the winnerName function before any votes are cast
      ✔ should return name of proposal 0
    when someone interacts with the winnerName function after one vote is cast for the first proposal
      ✔ should return name of proposal 0
    when someone interacts with the winningProposal function and winnerName after 5 random votes are cast for the proposals
      ✔ should return the name of the winner proposal (178ms)

  Ballot2
    [deploy]
      ✔ shd return correct chairperson
      ✔ shd store proposals correctly
      ✔ shd return correct number of proposals
    [event]
      ✔ shd emit GiveVoteRight
      ✔ shd emit Vote
      ✔ shd emit Delegate (77ms)
    [voteRights]
      ✔ shd be able to mass give right
      ✔ shd works with duplicated address
      ✔ shd revert if caller is not chairperson


  26 passing (1s)

--------------|----------|----------|----------|----------|----------------|
File          |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
--------------|----------|----------|----------|----------|----------------|
 contracts/   |    89.58 |    59.62 |    85.71 |    84.62 |                |
  Ballot.sol  |       95 |    70.83 |      100 |    91.18 |      92,95,111 |
  Ballot2.sol |    85.71 |       50 |       75 |    79.55 |... 165,166,177 |
--------------|----------|----------|----------|----------|----------------|
All files     |    89.58 |    59.62 |    85.71 |    84.62 |                |
--------------|----------|----------|----------|----------|----------------|

> Istanbul reports written to ./coverage/ and ./coverage.json
✨  Done in 4.01s.
```
