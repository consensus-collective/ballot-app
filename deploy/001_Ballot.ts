import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { ethers } from 'ethers'
import _ from 'lodash'
import log from '../utils/log'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()
  const contractName = 'Ballot'

  log.info(`Deployer: ${deployer}, Network: ${hre.network.name}`)
  log.info(`Deploying ${contractName} contract...`)

  const proposals = _.range(10).map((i) => {
    return ethers.encodeBytes32String('Proposal' + i)
  })

  const result = await deploy('Ballot', {
    from: deployer,
    args: [proposals],
    log: true,
    skipIfAlreadyDeployed: true,
  })

  log.info(`Deployed ${contractName} address: ${result.address}`)
}

export default func
func.tags = ['Ballot']
