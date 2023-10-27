/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * These should be run as if the action was called from a workflow.
 * Specifically, the inputs listed in `action.yml` should be set as environment
 * variables following the pattern `INPUT_<INPUT_NAME>`.
 */

import * as core from '@actions/core'
import * as main from '../src/main'

const abi = {
  source: {
    hash: '0xcd18dea9aaca2c87777048e8dc8da966f3da8c020582dd7f78f0f5ce0d2dd66e',
    language: 'ink! 4.3.0',
    compiler: 'rustc 1.73.0',
    build_info: {
      build_mode: 'Debug',
      cargo_contract_version: '3.2.0',
      rust_toolchain: 'stable-x86_64-unknown-linux-gnu',
      wasm_opt_settings: {
        keep_debug_symbols: false,
        optimization_passes: 'Z'
      }
    }
  },
  contract: {
    name: 'asset_reward',
    version: '0.1.0',
    authors: ['[your_name] <[your_email]>']
  },
  spec: {
    constructors: [
      {
        args: [
          {
            label: 'workflow',
            type: {
              displayName: ['HashValue'],
              type: 1
            }
          },
          {
            label: 'reward',
            type: {
              displayName: ['Balance'],
              type: 3
            }
          }
        ],
        default: false,
        docs: [
          'Constructor that initializes an asset reward for a given workflow'
        ],
        label: 'new',
        payable: false,
        returnType: {
          displayName: ['ink_primitives', 'ConstructorResult'],
          type: 6
        },
        selector: '0x9bae9d5e'
      }
    ],
    docs: [],
    environment: {
      accountId: {
        displayName: ['AccountId'],
        type: 0
      },
      balance: {
        displayName: ['Balance'],
        type: 3
      },
      blockNumber: {
        displayName: ['BlockNumber'],
        type: 21
      },
      chainExtension: {
        displayName: ['ChainExtension'],
        type: 22
      },
      hash: {
        displayName: ['Hash'],
        type: 20
      },
      maxEventTopics: 4,
      timestamp: {
        displayName: ['Timestamp'],
        type: 4
      }
    },
    events: [],
    lang_error: {
      displayName: ['ink', 'LangError'],
      type: 8
    },
    messages: [
      {
        args: [
          {
            label: 'account',
            type: {
              displayName: ['AccountId'],
              type: 0
            }
          },
          {
            label: 'identity',
            type: {
              displayName: ['HashValue'],
              type: 1
            }
          }
        ],
        default: false,
        docs: [
          ' Register an aspiring contributor.',
          '',
          ' Constraint(s):',
          ' 1. The `identity` id should not already be registered.',
          '',
          ' A `Registered` event is emitted.'
        ],
        label: 'register_identity',
        mutates: true,
        payable: false,
        returnType: {
          displayName: ['ink', 'MessageResult'],
          type: 9
        },
        selector: '0x87ebe7fb'
      },
      {
        args: [
          {
            label: 'contribution_id',
            type: {
              displayName: ['u64'],
              type: 4
            }
          },
          {
            label: 'contributor_identity',
            type: {
              displayName: ['HashValue'],
              type: 1
            }
          }
        ],
        default: false,
        docs: [
          ' Approve contribution. This is triggered by a workflow run.',
          '',
          ' Constraint(s):',
          ' 1. The `contribution_id` should not already be approved.',
          ' 2. The `contributor_identity` must be registered.',
          '',
          ' An `Approval` event is emitted.'
        ],
        label: 'approve',
        mutates: true,
        payable: false,
        returnType: {
          displayName: ['ink', 'MessageResult'],
          type: 9
        },
        selector: '0x681266a0'
      },
      {
        args: [
          {
            label: 'contribution_id',
            type: {
              displayName: ['u64'],
              type: 4
            }
          }
        ],
        default: false,
        docs: [
          ' Claim reward for a contributor.',
          '',
          ' Constraint(s):',
          ' 1. The `contribution_id` must be mapped to an existing approved contribution in `contributions`.',
          ' 2. The caller has to be the contributor of the approved contribution.',
          ' 3. The claim must be available (marked as false in the claims mapping).',
          '',
          ' A `Claim` event is emitted.'
        ],
        label: 'claim',
        mutates: false,
        payable: false,
        returnType: {
          displayName: ['ink', 'MessageResult'],
          type: 13
        },
        selector: '0xb388803f'
      },
      {
        args: [],
        default: false,
        docs: [' Simply returns the current workflow.'],
        label: 'get_reward',
        mutates: false,
        payable: false,
        returnType: {
          displayName: ['ink', 'MessageResult'],
          type: 15
        },
        selector: '0xd759b94d'
      },
      {
        args: [],
        default: false,
        docs: [],
        label: 'Ownable::renounce_ownership',
        mutates: true,
        payable: false,
        returnType: {
          displayName: ['ink', 'MessageResult'],
          type: 16
        },
        selector: '0x5e228753'
      },
      {
        args: [
          {
            label: 'new_owner',
            type: {
              displayName: ['ownable_external', 'TransferOwnershipInput1'],
              type: 18
            }
          }
        ],
        default: false,
        docs: [],
        label: 'Ownable::transfer_ownership',
        mutates: true,
        payable: false,
        returnType: {
          displayName: ['ink', 'MessageResult'],
          type: 16
        },
        selector: '0x11f43efd'
      },
      {
        args: [],
        default: false,
        docs: [],
        label: 'Ownable::owner',
        mutates: false,
        payable: false,
        returnType: {
          displayName: ['ink', 'MessageResult'],
          type: 19
        },
        selector: '0x4fa43c8c'
      }
    ]
  },
  storage: {
    root: {
      layout: {
        struct: {
          fields: [
            {
              layout: {
                struct: {
                  fields: [
                    {
                      layout: {
                        root: {
                          layout: {
                            enum: {
                              dispatchKey: '0x6f713913',
                              name: 'Option',
                              variants: {
                                '0': {
                                  fields: [],
                                  name: 'None'
                                },
                                '1': {
                                  fields: [
                                    {
                                      layout: {
                                        leaf: {
                                          key: '0x6f713913',
                                          ty: 0
                                        }
                                      },
                                      name: '0'
                                    }
                                  ],
                                  name: 'Some'
                                }
                              }
                            }
                          },
                          root_key: '0x6f713913'
                        }
                      },
                      name: 'owner'
                    }
                  ],
                  name: 'Data'
                }
              },
              name: 'ownable'
            },
            {
              layout: {
                array: {
                  layout: {
                    leaf: {
                      key: '0x00000000',
                      ty: 2
                    }
                  },
                  len: 32,
                  offset: '0x00000000'
                }
              },
              name: 'workflow'
            },
            {
              layout: {
                leaf: {
                  key: '0x00000000',
                  ty: 3
                }
              },
              name: 'reward'
            },
            {
              layout: {
                root: {
                  layout: {
                    struct: {
                      fields: [
                        {
                          layout: {
                            leaf: {
                              key: '0xd8e894c8',
                              ty: 4
                            }
                          },
                          name: 'id'
                        },
                        {
                          layout: {
                            leaf: {
                              key: '0xd8e894c8',
                              ty: 0
                            }
                          },
                          name: 'contributor'
                        },
                        {
                          layout: {
                            leaf: {
                              key: '0xd8e894c8',
                              ty: 5
                            }
                          },
                          name: 'is_claimed'
                        }
                      ],
                      name: 'Contribution'
                    }
                  },
                  root_key: '0xd8e894c8'
                }
              },
              name: 'contributions'
            },
            {
              layout: {
                root: {
                  layout: {
                    leaf: {
                      key: '0xc4b5f2ba',
                      ty: 0
                    }
                  },
                  root_key: '0xc4b5f2ba'
                }
              },
              name: 'identities'
            }
          ],
          name: 'AssetReward'
        }
      },
      root_key: '0x00000000'
    }
  },
  types: [
    {
      id: 0,
      type: {
        def: {
          composite: {
            fields: [
              {
                type: 1,
                typeName: '[u8; 32]'
              }
            ]
          }
        },
        path: ['ink_primitives', 'types', 'AccountId']
      }
    },
    {
      id: 1,
      type: {
        def: {
          array: {
            len: 32,
            type: 2
          }
        }
      }
    },
    {
      id: 2,
      type: {
        def: {
          primitive: 'u8'
        }
      }
    },
    {
      id: 3,
      type: {
        def: {
          primitive: 'u128'
        }
      }
    },
    {
      id: 4,
      type: {
        def: {
          primitive: 'u64'
        }
      }
    },
    {
      id: 5,
      type: {
        def: {
          primitive: 'bool'
        }
      }
    },
    {
      id: 6,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 7
                  }
                ],
                index: 0,
                name: 'Ok'
              },
              {
                fields: [
                  {
                    type: 8
                  }
                ],
                index: 1,
                name: 'Err'
              }
            ]
          }
        },
        params: [
          {
            name: 'T',
            type: 7
          },
          {
            name: 'E',
            type: 8
          }
        ],
        path: ['Result']
      }
    },
    {
      id: 7,
      type: {
        def: {
          tuple: []
        }
      }
    },
    {
      id: 8,
      type: {
        def: {
          variant: {
            variants: [
              {
                index: 1,
                name: 'CouldNotReadInput'
              }
            ]
          }
        },
        path: ['ink_primitives', 'LangError']
      }
    },
    {
      id: 9,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 10
                  }
                ],
                index: 0,
                name: 'Ok'
              },
              {
                fields: [
                  {
                    type: 8
                  }
                ],
                index: 1,
                name: 'Err'
              }
            ]
          }
        },
        params: [
          {
            name: 'T',
            type: 10
          },
          {
            name: 'E',
            type: 8
          }
        ],
        path: ['Result']
      }
    },
    {
      id: 10,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 7
                  }
                ],
                index: 0,
                name: 'Ok'
              },
              {
                fields: [
                  {
                    type: 11
                  }
                ],
                index: 1,
                name: 'Err'
              }
            ]
          }
        },
        params: [
          {
            name: 'T',
            type: 7
          },
          {
            name: 'E',
            type: 11
          }
        ],
        path: ['Result']
      }
    },
    {
      id: 11,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 12,
                    typeName: 'OwnableError'
                  }
                ],
                index: 0,
                name: 'OwnableError'
              },
              {
                index: 1,
                name: 'IdentityAlreadyRegistered'
              },
              {
                index: 2,
                name: 'ContributionAlreadyApproved'
              },
              {
                index: 3,
                name: 'RunIdAlreadyUsed'
              },
              {
                index: 4,
                name: 'UnknownContributor'
              },
              {
                index: 5,
                name: 'UnknownContribution'
              },
              {
                index: 6,
                name: 'PaymentFailed'
              },
              {
                index: 7,
                name: 'CallerIsNotWorkflowOwner'
              },
              {
                index: 8,
                name: 'CallerIsNotContributor'
              },
              {
                index: 9,
                name: 'AlreadyClaimed'
              },
              {
                index: 10,
                name: 'InvalidSigner'
              }
            ]
          }
        },
        path: ['asset_reward', 'asset_reward', 'Error']
      }
    },
    {
      id: 12,
      type: {
        def: {
          variant: {
            variants: [
              {
                index: 0,
                name: 'CallerIsNotOwner'
              },
              {
                index: 1,
                name: 'NewOwnerIsNotSet'
              }
            ]
          }
        },
        path: [
          'openbrush_contracts',
          'traits',
          'errors',
          'ownable',
          'OwnableError'
        ]
      }
    },
    {
      id: 13,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 14
                  }
                ],
                index: 0,
                name: 'Ok'
              },
              {
                fields: [
                  {
                    type: 8
                  }
                ],
                index: 1,
                name: 'Err'
              }
            ]
          }
        },
        params: [
          {
            name: 'T',
            type: 14
          },
          {
            name: 'E',
            type: 8
          }
        ],
        path: ['Result']
      }
    },
    {
      id: 14,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 5
                  }
                ],
                index: 0,
                name: 'Ok'
              },
              {
                fields: [
                  {
                    type: 11
                  }
                ],
                index: 1,
                name: 'Err'
              }
            ]
          }
        },
        params: [
          {
            name: 'T',
            type: 5
          },
          {
            name: 'E',
            type: 11
          }
        ],
        path: ['Result']
      }
    },
    {
      id: 15,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 3
                  }
                ],
                index: 0,
                name: 'Ok'
              },
              {
                fields: [
                  {
                    type: 8
                  }
                ],
                index: 1,
                name: 'Err'
              }
            ]
          }
        },
        params: [
          {
            name: 'T',
            type: 3
          },
          {
            name: 'E',
            type: 8
          }
        ],
        path: ['Result']
      }
    },
    {
      id: 16,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 17
                  }
                ],
                index: 0,
                name: 'Ok'
              },
              {
                fields: [
                  {
                    type: 8
                  }
                ],
                index: 1,
                name: 'Err'
              }
            ]
          }
        },
        params: [
          {
            name: 'T',
            type: 17
          },
          {
            name: 'E',
            type: 8
          }
        ],
        path: ['Result']
      }
    },
    {
      id: 17,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 7
                  }
                ],
                index: 0,
                name: 'Ok'
              },
              {
                fields: [
                  {
                    type: 12
                  }
                ],
                index: 1,
                name: 'Err'
              }
            ]
          }
        },
        params: [
          {
            name: 'T',
            type: 7
          },
          {
            name: 'E',
            type: 12
          }
        ],
        path: ['Result']
      }
    },
    {
      id: 18,
      type: {
        def: {
          variant: {
            variants: [
              {
                index: 0,
                name: 'None'
              },
              {
                fields: [
                  {
                    type: 0
                  }
                ],
                index: 1,
                name: 'Some'
              }
            ]
          }
        },
        params: [
          {
            name: 'T',
            type: 0
          }
        ],
        path: ['Option']
      }
    },
    {
      id: 19,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 18
                  }
                ],
                index: 0,
                name: 'Ok'
              },
              {
                fields: [
                  {
                    type: 8
                  }
                ],
                index: 1,
                name: 'Err'
              }
            ]
          }
        },
        params: [
          {
            name: 'T',
            type: 18
          },
          {
            name: 'E',
            type: 8
          }
        ],
        path: ['Result']
      }
    },
    {
      id: 20,
      type: {
        def: {
          composite: {
            fields: [
              {
                type: 1,
                typeName: '[u8; 32]'
              }
            ]
          }
        },
        path: ['ink_primitives', 'types', 'Hash']
      }
    },
    {
      id: 21,
      type: {
        def: {
          primitive: 'u32'
        }
      }
    },
    {
      id: 22,
      type: {
        def: {
          variant: {}
        },
        path: ['ink_env', 'types', 'NoChainExtension']
      }
    }
  ],
  version: '4'
}
// Mock the GitHub Actions core library
const getInputMock = jest.spyOn(core, 'getInput')
const setFailedMock = jest.spyOn(core, 'setFailed')

// Mock the action's main function
const runMock = jest.spyOn(main, 'run')

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('registers a work', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'ws-provider-url':
          return 'wss://ws.test.azero.dev'
        case 'mnemonic-phrase':
          return 'entire material egg meadow latin bargain dutch coral blood melt acoustic thought'
        case 'contract-address':
          return '5D5x653PxChSTBczHzjveBvda85oPG4CwZYYkq2qAujeEP49'
        case 'contract-abi':
          return JSON.stringify(abi)
        case 'contribution-id':
          return '1'
        case 'contributor-identity':
          return '0'
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()
    expect(setFailedMock).toHaveBeenCalledTimes(0)
  })
})
