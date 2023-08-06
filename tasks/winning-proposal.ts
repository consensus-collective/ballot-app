import { HardhatRuntimeEnvironment } from 'hardhat/types'

interface Argument {
  contract: string
}

export async function winningProposal(args: Argument, hre: HardhatRuntimeEnvironment) {
  const contractAddress = args.contract
  const contract = await hre.ethers.getContractAt('Ballot', contractAddress)
  const winningProposal = await contract.winningProposal().then((idx) => contract.proposals(idx))

  if (winningProposal.voteCount <= 0n) {
    return console.log('Winner: none')
  }

  console.log('Winner:', hre.ethers.decodeBytes32String(winningProposal.name))
  console.log('Total Count:', winningProposal.voteCount.toString())
}
