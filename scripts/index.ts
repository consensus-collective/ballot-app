import { HardhatRuntimeEnvironment } from 'hardhat/types'

export async function giveRight(contractAddress: string, hre: HardhatRuntimeEnvironment, voter: string) {
  const [signer] = await hre.ethers.getSigners()
  const contract = await hre.ethers.getContractAt('Ballot', contractAddress, signer)

  const txn = await contract.giveRightToVote(hre.ethers.getAddress(voter))
  await txn.wait()

  return txn
}

export async function giveRights(contractAddress: string, hre: HardhatRuntimeEnvironment, voters: string[]) {
  const [signer] = await hre.ethers.getSigners()
  const contract = await hre.ethers.getContractAt('Ballot2', contractAddress, signer)
  const voterAddress = voters.map((voter) => hre.ethers.getAddress(voter))

  const txn = await contract.giveRightToVotes(voterAddress)
  await txn.wait()

  return txn
}
