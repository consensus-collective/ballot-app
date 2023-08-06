import { task } from 'hardhat/config'
import { accounts } from './accounts'
import { vote } from './vote'
import { winningProposal } from './winning-proposal'

task('accounts', 'Get account list').setAction(accounts)

task('vote', 'Give vote')
  .addParam('contract', 'Ballot contract address')
  .addParam('signer', 'Signer public address')
  .addParam('proposal', 'Proposal index')
  .setAction(vote)

task('winning-proposal', 'Give the name of the winner and total vote')
  .addParam('contract', 'Ballot contract address')
  .setAction(winningProposal)
