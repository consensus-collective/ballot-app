# Ballot App

Contract Address: [0x003343f128839fe6253Ab3E15265aA60E8114DeF](https://sepolia.etherscan.io/address/0x003343f128839fe6253ab3e15265aa60e8114def)

## Contract Deployment

We deployed a contract with 10 proposals using `lodash`:

```javascript
const proposals = _.range(10).map((i) => {
  return ethers.encodeBytes32String('Proposal' + i)
})
```

```bash
$ npx hardhat deploy --tags Ballot --network sepolia
> Nothing to compile
> No need to generate any newer typings.
> Deployer: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, Network: hardhat
> Deploying Ballot contract...
> deploying "Ballot" (tx: 0xe1042dee5a941bab7c5e88d1881d4eac85ddcf75159976aa8fdc41d142662149)...: deployed at 0x5FbDB2315678afecb367f032d93F642f64180aa3 with 925427 gas
> Deployed Ballot address: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

# Scripts

1. `giveRightToVote()`

We wrote a function `giveRight` to grant voting right, and wrap it into a hardhat hask with multiple input.
Demo:

```bash
$ RANDOM_ADDRESS1=0xe9e08A478e3a773c1B5D59014A0FDb901e6d1d69
$ RANDOM_ADDRESS2=0x2634BD65ba27AB63811c74A63118ACb312701Bfa
$ npx hardhat giveRight --network sepolia $RANDOM_ADDRESS1 $RANDOM_ADDRESS2

> Granted voting right for 0xe9e08A478e3a773c1B5D59014A0FDb901e6d1d69
> Ballot Contract: 0x8517Cdd39856bc6d43bd851714f86594AcAa4580
> txHash: 0x117da93f5d6633b26f40ef1aa036fa07c08fe0c002d1d9a12e0203790b962b33

> Granted voting right for 0x2634BD65ba27AB63811c74A63118ACb312701Bfa
> Ballot Contract: 0x8517Cdd39856bc6d43bd851714f86594AcAa4580
> txHash: 0xee65b27118e8604d3abb3b8dbc035c9b324726054ae102d3c3e7a5796b371e6b
```
