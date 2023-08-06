import { Addressable } from 'ethers'
import { HardhatRuntimeEnvironment } from 'hardhat/types'

interface Argument {
  signer: string
  contract: Addressable
  proposal: number
}

export async function vote(args: Argument, hre: HardhatRuntimeEnvironment) {
  const signer = await hre.ethers.getSigner(args.signer)
  const contractAddress = args.contract
  const proposalIndex = BigInt(args.proposal)

  const contract = await hre.ethers.getContractAt('Ballot2', contractAddress, signer)
  const proposal = await contract.proposals(proposalIndex)

  console.log('Account', signer.address, 'is giving vote to', hre.ethers.decodeBytes32String(proposal.name))
  console.log('Voting...')

  const response = await contract.vote(proposalIndex)
  const tx = await response.wait(1)

  if (tx) {
    console.log({
      name: 'vote',
      hash: tx.hash,
      block: tx.blockNumber,
      from: tx.from,
      to: tx.to,
      explorerURL: hre.network.config.chainId === 31337 ? '' : `https://${hre.network.name}.etherscan.io/tx/${tx.hash}`,
    })
  }

  console.log('Successfully voted...')
}
