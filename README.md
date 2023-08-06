# Ballot App

Contract Address: [0x003343f128839fe6253Ab3E15265aA60E8114DeF](https://sepolia.etherscan.io/address/0x003343f128839fe6253ab3e15265aa60e8114def)


### Vote
``Chairman Address``: [0x33Cb9c62131915C86DFfCb5C853379865Ae7379d](https://sepolia.etherscan.io/address/0x33Cb9c62131915C86DFfCb5C853379865Ae7379d)
``Voter Address``: [0xd22c7a03d8a7f55916a1df0ae3840b82b46216ae](https://sepolia.etherscan.io/address/0xd22c7a03d8a7f55916a1df0ae3840b82b46216ae) 

___

- Initially, the **voter** gives a vote to ``proposal[1]``, but **rejected** since the voter doesn't have right to vote ([0xe5490e5114f2a2484dcbe79bb805a28f652dfac2b6d8fd27ce4923abc0e7d093](https://sepolia.etherscan.io/tx/0xe5490e5114f2a2484dcbe79bb805a28f652dfac2b6d8fd27ce4923abc0e7d093)).
![0xe5490e5114f2a2484dcbe79bb805a28f652dfac2b6d8fd27ce4923abc0e7d093](./assets/no-right.png)

- Then, the **chairman** gives the **voter** a right to vote and **succeeded** ([0xf9181dc4cfc1a63c5a504af6ec362c5303f86258191ac085e1832b5cb33487aa](https://sepolia.etherscan.io/tx/0xf9181dc4cfc1a63c5a504af6ec362c5303f86258191ac085e1832b5cb33487aa)).
![0xf9181dc4cfc1a63c5a504af6ec362c5303f86258191ac085e1832b5cb33487aa](./assets/vote-right.png)

- The **voter** gives a vote to ``proposal[1]`` and **succeeded** ([0x94a468dfa48f42868b9c892b2b21a4c2807eae84000827dc330d4e6e1bf7b586](https://sepolia.etherscan.io/tx/0x94a468dfa48f42868b9c892b2b21a4c2807eae84000827dc330d4e6e1bf7b586)).
![0x94a468dfa48f42868b9c892b2b21a4c2807eae84000827dc330d4e6e1bf7b586](./assets/vote.png)

- The **voter** gives another vote again to ``proposal[1]``, but **rejected** since the voter alredy voted ([0x5f69537f1b097c17a08f08003719b33d9aafafcdd42bdd81a113d647cad4f783](https://sepolia.etherscan.io/tx/0x5f69537f1b097c17a08f08003719b33d9aafafcdd42bdd81a113d647cad4f783)).
![0x5f69537f1b097c17a08f08003719b33d9aafafcdd42bdd81a113d647cad4f783](./assets/another-vote.png)