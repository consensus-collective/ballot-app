import { task } from 'hardhat/config'
import { vote } from '../scripts/vote'
import { getProposals, winningProposal } from '../scripts/query'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { readFile } from '../utils/file'
import { ethers } from 'ethers'
import { giveRights } from '../scripts'
import { getDeployments } from '../scripts/utils'
import log from '../utils/log'

task('vote', 'Give vote')
  .addParam('contract', 'Ballot contract address')
  .addParam('signer', 'Signer public address')
  .addParam('proposal', 'Proposal index')
  .setAction(vote)

task('winning-proposal', 'Give the name of the winner and total vote')
  .addParam('contract', 'Ballot contract address')
  .setAction(winningProposal)

task('votingStatus', 'print voting status')
  .addOptionalParam('contract', 'Ballet contract address')
  .setAction(async (taskArgs, hre: HardhatRuntimeEnvironment) => {
    const contractAddress = taskArgs.contract ?? (await getDeployments(hre, taskArgs.name ?? 'Ballot2'))

    if (!contractAddress || !ethers.isAddress(contractAddress)) {
      log.error(`Invalid contract address`)
      return
    }
    await getProposals(contractAddress, hre)
  })

task('giveRight', 'give voting right to a specific address')
  .addOptionalParam('contract', 'Ballet contract address')
  .addOptionalParam('path', 'json file path')
  .addOptionalParam('name', 'custom contract name')
  .addOptionalVariadicPositionalParam('voter', 'Voter address to give right')
  .setAction(async (taskArgs, hre: HardhatRuntimeEnvironment) => {
    // if --contract is not input, get it from deployments
    const contractAddress = taskArgs.contract ?? (await getDeployments(hre, taskArgs.name ?? 'Ballot'))

    if (!contractAddress || !ethers.isAddress(contractAddress)) {
      log.error(`Invalid contract address`)
      return
    }

    let addressToGrant: string[] = []
    // Loop from input array
    if (taskArgs.voter) {
      addressToGrant = taskArgs.voter
    }
    // Loop from JSON file
    else if (taskArgs.path) {
      const addressJson = await readFile(taskArgs.path)

      if (!addressJson) {
        console.log('Invalid JSON.')
        return undefined
      }
      const addressList: string[] = []

      JSON.parse(addressJson).map((address: string) => {
        if (ethers.isAddress(address)) {
          addressList.push(address)
        }
      })
      addressToGrant = addressList
    }
    // not found
    else {
      log.error('File path or address not found')
      return
    }
    const receipt = await giveRights(contractAddress, hre, addressToGrant)

    log.debug(`Granted voting right for ${addressToGrant} \ntxHash: ${receipt.hash}`)
  })
