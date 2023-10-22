/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * These should be run as if the action was called from a workflow.
 * Specifically, the inputs listed in `action.yml` should be set as environment
 * variables following the pattern `INPUT_<INPUT_NAME>`.
 */

import * as core from '@actions/core'
import * as main from '../src/main'

// Mock the GitHub Actions core library
const debugMock = jest.spyOn(core, 'debug')
const getInputMock = jest.spyOn(core, 'getInput')
const setFailedMock = jest.spyOn(core, 'setFailed')
const setOutputMock = jest.spyOn(core, 'setOutput')

// Mock the action's main function
const runMock = jest.spyOn(main, 'run')


describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('sets the time output', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'exported-account':
          return '../account.json'
        case 'ws-provider-url':
          return 'wss://ws.test.azero.dev'
        case 'contract-address':
          return '5Dbd7MmrTujdR7t1BS4Yxnj5sDxxLDLPqStGVmfZdfRQPgM9'
        case 'contract-abi':
          return '../abi.json'
        case 'github-id':
          return 'leapalazzolo'
        case 'workflow-id':
          return '1'
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()

    // Verify that all of the core library functions were called correctly
    // expect(debugMock).toHaveBeenNthCalledWith(1, 'Waiting 500 milliseconds ...')
  })

  // it('sets a failed status', async () => {
  //   // Set the action's inputs as return values from core.getInput()
  //   getInputMock.mockImplementation((name: string): string => {
  //     switch (name) {
  //       case 'exported-account':
  //         return '../account.json'
  //       case 'ws-provider-url':
  //         return 'wss://ws.test.azero.dev'
  //       case 'contract-address':
  //         return 'aaa'
  //       case 'contract-abi':
  //         return '../abi.json'
  //       case 'github-id':
  //         return 'leapalazzolo'
  //       case 'workflow-id':
  //         return '1'
  //       default:
  //         return ''
  //     }
  //   })

  //   await main.run()
  //   expect(runMock).toHaveReturned()

  //   // Verify that all of the core library functions were called correctly
  //   expect(setFailedMock).toHaveBeenNthCalledWith(
  //     1,
  //     'milliseconds not a number'
  //   )
  // })
})
