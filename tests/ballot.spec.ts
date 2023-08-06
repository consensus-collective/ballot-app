import { expect } from 'chai'
import { ethers } from 'hardhat'
import { Ballot } from '../typechain-types'
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'

const PROPOSALS = ['Proposal 1', 'Proposal 2', 'Proposal 3']

function convertStringArrayToBytes32(array: string[]) {
  const bytes32Array = []
  for (let index = 0; index < array.length; index++) {
    bytes32Array.push(ethers.encodeBytes32String(array[index]))
  }
  return bytes32Array
}

async function deployContract() {
  const ballotFactory = await ethers.getContractFactory('Ballot')
  const ballotContract = await ballotFactory.deploy(convertStringArrayToBytes32(PROPOSALS))
  await ballotContract.waitForDeployment()
  return ballotContract as unknown as Ballot
}

describe('Ballot', async () => {
  let ballotContract: Ballot

  beforeEach(async () => {
    ballotContract = await loadFixture(deployContract)
  })

  describe('when the contract is deployed', async () => {
    it('has the provided proposals', async () => {
      for (let index = 0; index < PROPOSALS.length; index++) {
        const proposal = await ballotContract.proposals(index)
        expect(ethers.decodeBytes32String(proposal.name)).to.eq(PROPOSALS[index])
      }
    })
    it('has zero votes for all proposals', async () => {
      for (let i = 0; i < PROPOSALS.length; i++) {
        const proposal = await ballotContract.proposals(i)
        expect(proposal.voteCount).to.eq(0)
      }
    })
    it('sets the deployer address as chairperson', async () => {
      const accounts = await ethers.getSigners()
      const chairperson = await ballotContract.chairperson()
      expect(chairperson).to.eq(accounts[0].address)
    })
    it('sets the voting weight for the chairperson as 1', async () => {
      const chairperson = await ballotContract.chairperson()
      const weight = (await ballotContract.voters(chairperson)).weight
      expect(weight).to.eq(1)
    })
  })

  describe('when the chairperson interacts with the giveRightToVote function in the contract', async () => {
    it('gives right to vote for another address', async () => {
      const accounts = await ethers.getSigners()
      // Connect as chairperson and test
      await expect(ballotContract.connect(accounts[0]).giveRightToVote(accounts[1].address)).to.not.reverted
    })
    it('can not give right to vote for someone that has voted', async () => {
      const accounts = await ethers.getSigners()
      // Give a voter the right to vote
      await ballotContract.connect(accounts[0]).giveRightToVote(accounts[1])
      // Set the voted attribute to true by having the voter vote on something
      await ballotContract.connect(accounts[1]).vote(0)
      // Connect as the chairperson and try to give the voter the right to vote
      await expect(ballotContract.connect(accounts[0]).giveRightToVote(accounts[1].address)).to.be.revertedWith(
        'The voter already voted.',
      )
    })
    it('can not give right to vote for someone that has already voting rights', async () => {
      const accounts = await ethers.getSigners()
      // Give the voter voting rights by changing their weight
      await ballotContract.connect(accounts[0]).giveRightToVote(accounts[1])
      // Connect as chairperson and runt test
      await expect(ballotContract.connect(accounts[0]).giveRightToVote(accounts[1])).to.be.revertedWithoutReason()
    })
  })

  describe('when the voter interacts with the vote function in the contract', async () => {
    it('should register the vote', async () => {
      const accounts = await ethers.getSigners()
      // Give voter the right to vote
      await ballotContract.connect(accounts[0]).giveRightToVote(accounts[1].address)
      // Have voter vote on any indexed proposal
      await ballotContract.connect(accounts[1]).vote(0)
      // Test that vote registered
      const voted = (await ballotContract.voters(accounts[1].address)).voted
      expect(voted).to.eq(true)
    })
  })

  describe('when the voter interacts with the delegate function in the contract', async () => {
    it('should transfer voting power', async () => {
      const accounts = await ethers.getSigners()
      // Give voter the right to vote
      await ballotContract.connect(accounts[0]).giveRightToVote(accounts[1].address)
      // Perform delegate function
      await ballotContract.connect(accounts[0]).delegate(accounts[1].address)
      // Check delegate attribute equals address delegated to
      const delegate = (await ballotContract.voters(accounts[0].address)).delegate
      expect(delegate).to.eq(accounts[1].address)
    })
  })

  describe('when an account other than the chairperson interacts with the giveRightToVote function in the contract', async () => {
    it('should revert', async () => {
      const accounts = await ethers.getSigners()
      expect(ballotContract.connect(accounts[1]).giveRightToVote(accounts[2])).to.be.revertedWith(
        'Only the chairperson can give the right to vote',
      )
    })
  })

  describe('when an account without right to vote interacts with the vote function in the contract', async () => {
    it('should revert', async () => {
      const accounts = await ethers.getSigners()
      // Have voter vote on any indexed proposal
      await expect(ballotContract.connect(accounts[1]).vote(0)).to.revertedWith('Has no right to vote')
    })
  })

  describe('when an account without right to vote interacts with the delegate function in the contract', async () => {
    it('should revert', async () => {
      const accounts = await ethers.getSigners()
      // Perform delegate function
      await expect(ballotContract.connect(accounts[1]).delegate(accounts[0].address)).to.be.revertedWith(
        'You have no right to vote',
      )
    })
  })

  describe('when someone interacts with the winningProposal function before any votes are cast', async () => {
    it('should return 0', async () => {
      const accounts = await ethers.getSigners()
      const winningProposal = await ballotContract.connect(accounts[0]).winningProposal()
      expect(winningProposal).to.eq(0)
    })
  })

  describe('when someone interacts with the winningProposal function after one vote is cast for the first proposal', async () => {
    it('should return 0', async () => {
      const accounts = await ethers.getSigners()
      await ballotContract.connect(accounts[0]).vote(0)
      const winningProposal = await ballotContract.connect(accounts[0]).winningProposal()
      expect(winningProposal).to.eq(0)
    })
  })

  describe('when someone interacts with the winnerName function before any votes are cast', async () => {
    it('should return name of proposal 0', async () => {
      const accounts = await ethers.getSigners()
      const winnerName = await ballotContract.connect(accounts[0]).winnerName()
      const proposal0 = await ballotContract.proposals(0)
      expect(winnerName).to.eq(proposal0.name)
    })
  })

  describe('when someone interacts with the winnerName function after one vote is cast for the first proposal', async () => {
    it('should return name of proposal 0', async () => {
      const accounts = await ethers.getSigners()
      await ballotContract.connect(accounts[0]).vote(0)
      const winnerName = await ballotContract.connect(accounts[0]).winnerName()
      const proposal0 = await ballotContract.proposals(0)
      expect(winnerName).to.eq(proposal0.name)
    })
  })

  describe('when someone interacts with the winningProposal function and winnerName after 5 random votes are cast for the proposals', async () => {
    it('should return the name of the winner proposal', async () => {
      const accounts = await ethers.getSigners()
      // Give voting rights
      await ballotContract.connect(accounts[0]).giveRightToVote(accounts[1].address)
      await ballotContract.connect(accounts[0]).giveRightToVote(accounts[2].address)
      await ballotContract.connect(accounts[0]).giveRightToVote(accounts[3].address)
      await ballotContract.connect(accounts[0]).giveRightToVote(accounts[4].address)
      // Randomly vote five times
      await ballotContract.connect(accounts[0]).vote(Math.floor(Math.random() * 3))
      await ballotContract.connect(accounts[1]).vote(Math.floor(Math.random() * 3))
      await ballotContract.connect(accounts[2]).vote(Math.floor(Math.random() * 3))
      await ballotContract.connect(accounts[3]).vote(Math.floor(Math.random() * 3))
      await ballotContract.connect(accounts[4]).vote(Math.floor(Math.random() * 3))
      // Get winningProposal
      const winningProposal = await ballotContract.connect(accounts[0]).winningProposal()
      const winningProposalName = (await ballotContract.proposals(winningProposal)).name
      // Get winnerName
      const winnerName = await ballotContract.connect(accounts[0]).winnerName()
      // Test winnerName is the winning proposal
      expect(winningProposalName).to.equal(winnerName)
    })
  })
})
