# Ballot App

Contract Address: [0x003343f128839fe6253Ab3E15265aA60E8114DeF](https://sepolia.etherscan.io/address/0x003343f128839fe6253ab3e15265aa60e8114def)

## Transaction details

Details: [here](docs/TRANSACTIONS.md)

## Scripts

- `giveRight [--network] [--name] [--voter] [--path]`

  - network: network alias from `hardhat.config.ts`
  - name: custom contract name for `hre.deployments.get()`. We input `Ballot2` here for our improved version. _default: Ballot_
  - voter: list of addresses. e.g. `  $ npx hardhat giveRight --network sepolia $RANDOM_ADDRESS1 $RANDOM_ADDRESS2`

  - path: file path of JSON file.

    e.g. `npx hardhat giveRight --network sepolia --name Ballot2 --path constants/address.json`

- `vote --contract <CONTRACT_ADDRESS> --signer <SIGNER> --proposal <PROPOSAL_ID>`

- `votingStatus --contract <CONTRACT_ADDRESS>`

- `winning-proposal --contract <CONTRACT_ADDRESS>`
- demo of all scripts:
  [here](docs/SCRIPTS.md)

## Unit testing

- [report](docs/TEST.md)

## Improvements

All improvement will be implemented at [Ballot2.sol](contracts/Ballot2.sol)

Details: [here](docs/IMPROVEMENT.md)
