import { ethers } from 'hardhat'
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers'
import { Ballot2 } from '../typechain-types'
import chai from 'chai'
import _ from 'lodash'
import { ContractFactory } from 'ethers'

const { expect } = chai

describe('Ballot2', function () {
  let owner: SignerWithAddress
  let users: SignerWithAddress[]
  let ballotContract: Ballot2
  let proposals: string[]

  beforeEach(async function () {
    // Get Factories
    const [first, ...rest] = await ethers.getSigners()
    owner = first
    users = rest

    proposals = _.range(10).map((i) => {
      return ethers.encodeBytes32String('Proposal' + i)
    })

    const ballotFactory = (await ethers.getContractFactory('Ballot2')) as ContractFactory
    ballotContract = (await ballotFactory.connect(owner).deploy(proposals)) as Ballot2

    await ballotContract.waitForDeployment()
  })

  describe('[deploy]', function () {
    it('shd return correct chairperson', async function () {
      expect(await ballotContract.chairperson()).to.equal(owner.address)
    })
    it('shd store proposals correctly', async function () {
      // check them one-by-one in a for loop
      for (const { idx, proposal } of proposals.map((proposal, idx) => ({ idx, proposal }))) {
        expect((await ballotContract.proposals(idx))[0]).to.equal(proposal)
      }
    })
  })

  describe('[event]', function () {
    it('shd emit GiveVoteRight', async function () {
      // give voting right to user0
      const receipt = await ballotContract.giveRightToVote(users[0])

      await expect(receipt).to.emit(ballotContract, 'GiveVoteRight').withArgs(users[0].address)
    })

    it('shd emit Vote', async function () {
      // give voting right to user0
      await ballotContract.giveRightToVote(users[0])
      const proposalId = BigInt(5)

      const receipt = await ballotContract.connect(users[0]).vote(proposalId)
      await expect(receipt).to.emit(ballotContract, 'Vote').withArgs(users[0].address, proposalId)
    })

    it('shd emit Delegate', async function () {
      // give voting right to user0
      await ballotContract.giveRightToVote(users[0])
      await ballotContract.giveRightToVote(users[1])
      const proposalId = BigInt(5)

      await ballotContract.connect(users[0]).vote(proposalId)

      // user1 is delegating to user0
      const receipt = await ballotContract.connect(users[1]).delegate(users[0].address)

      // sender: user1, to: user0
      await expect(receipt).to.emit(ballotContract, 'Delegate').withArgs(users[1].address, users[0].address)
    })
  })
})
