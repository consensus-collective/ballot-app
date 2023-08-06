import { ethers } from 'ethers'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import log from '../utils/log'

export async function getDeployments(
  hre: HardhatRuntimeEnvironment,
  contractName: string,
): Promise<string | undefined> {
  const { deployments } = hre
  const deployment = await deployments.get(contractName)
  const deployedAddress = deployment.address

  if (!deployedAddress || !ethers.isAddress(deployedAddress)) {
    log.error(`deployment not found for: ${contractName}`)
    return undefined
  }

  return deployedAddress
}
