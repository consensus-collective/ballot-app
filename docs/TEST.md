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
      ✔ can not give right to vote for someone that has voted (81ms)
      ✔ can not give right to vote for someone that has already voting rights (40ms)
    when the voter interacts with the vote function in the contract
      ✔ should register the vote (45ms)
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
      ✔ should return the name of the winner proposal (179ms)

  Ballot2
    [deploy]
      ✔ shd return correct chairperson
      ✔ shd store proposals correctly
    [event]
      ✔ shd emit GiveVoteRight
      ✔ shd emit Vote (39ms)
      ✔ shd emit Delegate (77ms)


  22 passing (1s)

--------------|----------|----------|----------|----------|----------------|
File          |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
--------------|----------|----------|----------|----------|----------------|
 contracts/   |    88.37 |    56.25 |    83.33 |     83.1 |                |
  Ballot.sol  |       95 |    70.83 |      100 |    91.18 |      92,95,111 |
  Ballot2.sol |    82.61 |    41.67 |    66.67 |    75.68 |... 153,154,165 |
--------------|----------|----------|----------|----------|----------------|
All files     |    88.37 |    56.25 |    83.33 |     83.1 |                |
--------------|----------|----------|----------|----------|----------------|
```
