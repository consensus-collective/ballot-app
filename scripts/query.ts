import { HardhatRuntimeEnvironment } from 'hardhat/types'

interface Argument {
  contract: string
}

export async function getWinningProposal(args: Argument, hre: HardhatRuntimeEnvironment) {
  const contractAddress = args.contract
  const contract = await hre.ethers.getContractAt('Ballot', contractAddress)
  const winningProposal = await contract.winningProposal().then((idx) => contract.proposals(idx))

  if (winningProposal.voteCount <= 0n) {
    return undefined
  }

  return {
    winner: hre.ethers.decodeBytes32String(winningProposal.name),
    count: winningProposal.voteCount,
  }
}

// Print table of proposal and voting status
// Only support Ballot2
export async function getProposals(contractAddress: string, hre: HardhatRuntimeEnvironment) {
  const contract = await hre.ethers.getContractAt('Ballot2', contractAddress)
  const proposalLength = await contract.proposalCount()

  const proposalDict = []
  for (let i = 0; i < proposalLength; ++i) {
    const proposal = await contract.proposals(i)
    proposalDict.push({
      name: hre.ethers.decodeBytes32String(proposal.name),
      votes: proposal.voteCount.toString(),
    })
  }

  return proposalDict
}
