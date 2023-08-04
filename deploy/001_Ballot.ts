import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { ethers } from 'ethers'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  // const proposals = [ethers.toUtf8Bytes('Proposal1'), ethers.toUtf8Bytes('Proposal2')]
  const result = await deploy('Ballot', {
    from: deployer,
    args: [
      [
        ethers.encodeBytes32String('Proposal1'),
        ethers.encodeBytes32String('Proposal2'),
        ethers.encodeBytes32String('Proposal3'),
        ethers.encodeBytes32String('Proposal4'),
        ethers.encodeBytes32String('Proposal5'),
        ethers.encodeBytes32String('Proposal6'),
        ethers.encodeBytes32String('Proposal7'),
        ethers.encodeBytes32String('Proposal8'),
      ],
    ],
    log: true,
    skipIfAlreadyDeployed: true,
  })

  deployments.log(`Deployed Ballot: ${result.address}, Deployer: ${deployer}, network: ${hre.network.name}`)
}

export default func
func.tags = ['Ballot']
