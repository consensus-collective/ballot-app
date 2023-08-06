import { HardhatRuntimeEnvironment } from 'hardhat/types'

export async function accounts(args: object, hre: HardhatRuntimeEnvironment) {
  const accounts = await hre.ethers.getSigners()
  for (const account of accounts) {
    console.log(account.address)
  }
}
