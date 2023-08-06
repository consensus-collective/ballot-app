import { task } from 'hardhat/config'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { giveRight } from '../scripts'
import { ethers } from 'ethers'
import log from '../utils/log'

task('giveRight', 'give voting right to a specific address')
  .addOptionalParam('contract', 'Ballet contract address')
  .addVariadicPositionalParam('voter', 'Voter address to give right')
  .setAction(async (taskArgs, hre: HardhatRuntimeEnvironment) => {
    let contractAddress = ''
    if (!taskArgs.contract) {
      const { deployments } = hre
      const deployment = await deployments.get('Ballot')
      contractAddress = deployment.address
    } else {
      contractAddress = taskArgs.contract
    }
    if (!contractAddress || !ethers.isAddress(contractAddress)) {
      log.error(`Invalid contract address`)
      return
    }

    for (const i of taskArgs.voter) {
      if (!ethers.isAddress(i)) {
        log.error(`${i} is not a valid address`)
        continue
      }

      const receipt = await giveRight(contractAddress, hre, i)

      // // log changes
      log.debug(`Granted voting right for ${i} \nBallot Contract: ${contractAddress} \ntxHash: ${receipt.hash}\n`)
    }
  })
