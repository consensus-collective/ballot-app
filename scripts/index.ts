import { HardhatRuntimeEnvironment } from 'hardhat/types'

export async function giveRight(contractAddress: string, hre: HardhatRuntimeEnvironment, voter: string) {
  const [signer] = await hre.ethers.getSigners()
  const contract = await hre.ethers.getContractAt('Ballot', contractAddress, signer)

  const txn = await contract.giveRightToVote(hre.ethers.getAddress(voter))
  await txn.wait()

  return txn
}
