### `giveRight`

`npx hardhat giveRight [--network] [--name] [--voter] [--path]`

```
# grant voting access for every access inside a json
$ npx hardhat giveRight --network sepolia --name Ballot2 --path constants/address.json

Granted voting right for 0xc6ffcA45d451f28754A81D10826f2ACDF171D9C5
Ballot Contract: 0x5C2E5d004B7e5b3A1CD6b4BeEa5eD2Fa3c83b191
txHash: 0x037d5c19e0f4ad2d87df39d0ff8562fbf6ea4ff098ac0c06c0e009d3a1f6272c

Granted voting right for 0x265832C44f412013702761b9bC657CFBCd4cE69a
Ballot Contract: 0x5C2E5d004B7e5b3A1CD6b4BeEa5eD2Fa3c83b191
txHash: 0xd3a0edea23cb4236119407b1c0532ae656bcb5b44e2726364d9ce01b2e256aa6

Granted voting right for 0x33Cb9c62131915C86DFfCb5C853379865Ae7379d
Ballot Contract: 0x5C2E5d004B7e5b3A1CD6b4BeEa5eD2Fa3c83b191
txHash: 0xfc9208eace9170d2cb4dca2067831f5fc82c504956dda1916d48dd24d505031f

Granted voting right for 0x2F53eDad37fA7FC72E193d6d708065Bb9f38F4c2
Ballot Contract: 0x5C2E5d004B7e5b3A1CD6b4BeEa5eD2Fa3c83b191
txHash: 0x1f57bcc656cc208d2f73e3f9bbb206c9fad7eda9ee370180f8d8bca7c9bbd41d

Granted voting right for 0xD22C7a03d8a7f55916A1DF0ae3840B82B46216ae
Ballot Contract: 0x5C2E5d004B7e5b3A1CD6b4BeEa5eD2Fa3c83b191
txHash: 0xf311e36f772fc2cbf33e2836bd8b53d3f3be2297196a63f1af9aeee21b80afe9
```

### `vote`

`vote --contract <CONTRACT_ADDRESS> --signer <SIGNER> --proposal <PROPOSAL_ID>`

```bash
$ npx hardhat vote --contract $CONTRACT_ADDRESS --signer $MY_ADDRESS --proposal 1 --network sepolia

Account 0xb66c6D8d96fAa683A4eb2Cb4b854f7bB2295e01E is giving vote to Proposal1
Voting...
{
  name: 'vote',
  hash: '0xd71a237bbd87bc551c440e716e78e1fd6264dfe385d85c74a4c98fabf9b622dd',
  block: 4037738,
  from: '0xb66c6D8d96fAa683A4eb2Cb4b854f7bB2295e01E',
  to: '0x5C2E5d004B7e5b3A1CD6b4BeEa5eD2Fa3c83b191',
  explorerURL: 'https://sepolia.etherscan.io/tx/0xd71a237bbd87bc551c440e716e78e1fd6264dfe385d85c74a4c98fabf9b622dd'
}
Successfully voted...
```

### `votingStatus`

`votingStatus --contract <CONTRACT>`

```bash
$ npx hardhat votingStatus --network sepolia

┌─────────┬─────────────┬───────┐
│ (index) │    name     │ votes │
├─────────┼─────────────┼───────┤
│    0    │ 'Proposal0' │  '0'  │
│    1    │ 'Proposal1' │  '1'  │
│    2    │ 'Proposal2' │  '0'  │
│    3    │ 'Proposal3' │  '0'  │
│    4    │ 'Proposal4' │  '0'  │
│    5    │ 'Proposal5' │  '0'  │
│    6    │ 'Proposal6' │  '0'  │
│    7    │ 'Proposal7' │  '0'  │
│    8    │ 'Proposal8' │  '0'  │
│    9    │ 'Proposal9' │  '0'  │
└─────────┴─────────────┴───────┘
```

### `winning-proposal`

`winning-proposal --contract <CONTRACT>`

```bash
$ npx hardhat winning-proposal --contract $CONTRACT --network sepolia

Winner: Proposal1
Total Count: 1
```
