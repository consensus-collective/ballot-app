# Ballot App

Contract Address: [0x003343f128839fe6253Ab3E15265aA60E8114DeF](https://sepolia.etherscan.io/address/0x003343f128839fe6253ab3e15265aa60e8114def)

## Improvement

All improvement will be implemented at [Ballot2.sol](contracts/Ballot2.sol)

1. Add events

```solidity
// Events
event GiveVoteRight(address indexed voter);
event Vote(address indexed voter, uint proposalId);
event Delegate(address indexed sender, address indexed to);
```
