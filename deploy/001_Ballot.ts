import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { ethers } from 'ethers'
import _ from 'lodash'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  const proposals = _.range(10).map((i) => {
    return ethers.encodeBytes32String('Proposal' + i)
  })

  const result = await deploy('Ballot', {
    from: deployer,
    args: [proposals],
    log: true,
    skipIfAlreadyDeployed: true,
  })

  deployments.log(`Deployed Ballot: ${result.address}, Deployer: ${deployer}, network: ${hre.network.name}`)
}

export default func
func.tags = ['Ballot']
