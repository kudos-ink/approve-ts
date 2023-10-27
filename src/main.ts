import * as core from '@actions/core'
import { Abi, ContractPromise } from '@polkadot/api-contract'
import { ApiPromise, WsProvider, Keyring } from '@polkadot/api'
import { cryptoWaitReady } from '@polkadot/util-crypto'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const wsProviderUrl: string = core.getInput('ws-provider-url')
    const mnemonicPhrase: string = core.getInput('mnemonic-phrase')
    const contractAddress: string = core.getInput('contract-address')
    const contractAbi: string = core.getInput('contract-abi')
    const contributionId: number = +core.getInput('contribution-id')
    const contributorIdentity: number = +core.getInput('contributor-identity')

    await cryptoWaitReady()
    // Create a keyring instance
    const keyring = new Keyring({ type: 'sr25519' })

    // Add an account, straight mnemonic
    const account = keyring.addFromMnemonic(mnemonicPhrase)
    // fix
    const gasLimit = 3000n * 1000000n
    const storageDepositLimit = null

    // Construct API provider
    const wsProvider = new WsProvider(wsProviderUrl)
    const api = await ApiPromise.create({ provider: wsProvider })
    await api.isReady

    const abi = new Abi(
      JSON.parse(contractAbi),
      api.registry.getChainProperties()
    )

    const contract = new ContractPromise(api, abi, contractAddress)

    await contract.tx
      .approve(
        { storageDepositLimit, gasLimit },
        contributionId,
        contributorIdentity
      )
      .signAndSend(account, result => {
        if (result.status.isFinalized) {
          core.setOutput('hash', result.txHash.toHuman())
        }
      })
  } catch (error) {
    // Fail the workflow run if an error occurs
    console.log(error)
    if (error instanceof Error) core.setFailed(error.message)
  }
}
