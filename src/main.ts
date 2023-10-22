import * as core from '@actions/core'
import { ContractPromise } from '@polkadot/api-contract'
import { ApiPromise, WsProvider } from '@polkadot/api';
import { Keyring } from '@polkadot/api';

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const wsProviderUrl: string = core.getInput('ws-provider-url')
    const exportedAccount: string = core.getInput('exported-account')
    const contractAddress: string = core.getInput('contract-address')
    let contractAbi: string = core.getInput('contract-abi')
    const githubId: string = core.getInput('github-id')
    const workflowId: string = core.getInput('workflow-id')
    

    console.log("ok")
    // Create a keyring instance
    const keyring = new Keyring({ type: 'sr25519' });

    // Some mnemonic phrase
    // const PHRASE = 'entire material egg meadow latin bargain dutch coral blood melt acoustic thought';

    // Add an account, straight mnemonic
    const accountJson = require(exportedAccount);
    const account = keyring.addFromJson(accountJson);
    
    console.log("account ok")
    // fix
    const gasLimit = 3000n * 1000000n;
    const storageDepositLimit = null;

    // Construct API provider
    const wsProvider = new WsProvider(wsProviderUrl);
    const api = await ApiPromise.create({ provider: wsProvider });
    const abi = require(contractAbi);
    // get contract
    console.log(contractAddress)
    const contract = new ContractPromise(api, abi, contractAddress)
    console.log("contract ok")

    // const { gasRequired, storageDeposit, result } = await contract.query.submit_proof_of_work(
    //   account.address, // check
    //   options,
    //   githubId, workflowId
    // );

    // // call contrat
    await contract.tx
    //.submit_proof_of_work({ storageDepositLimit, gasLimit }, githubId, workflowId)
    .flip({ storageDepositLimit, gasLimit })
    .signAndSend(account, result => {
      if (result.status.isInBlock) {
        console.log('in a block');
      } else if (result.status.isFinalized) {
        console.log('finalized');
      }
    });
    core.debug(new Date().toTimeString())

    // Set outputs for other workflow steps to use
    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
