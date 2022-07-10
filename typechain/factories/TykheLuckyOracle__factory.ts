/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  TykheLuckyOracle,
  TykheLuckyOracleInterface,
} from "../TykheLuckyOracle";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "consumerAddress",
        type: "address",
      },
    ],
    name: "addConsumer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "askOracle",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receivingWallet",
        type: "address",
      },
    ],
    name: "cancelSubscription",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "createNewSubscription",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getLinkBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSubscriptionDetails",
    outputs: [
      {
        internalType: "uint96",
        name: "balance",
        type: "uint96",
      },
      {
        internalType: "uint64",
        name: "reqCount",
        type: "uint64",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "consumers",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_vrfCoordinator",
        type: "address",
      },
      {
        internalType: "address",
        name: "_link_token_contract",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "_keyHash",
        type: "bytes32",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "pendingRequestExists",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "consumerAddress",
        type: "address",
      },
    ],
    name: "removeConsumer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "requestRandomWords",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "s_randomWords",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "s_requestId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "s_subscriptionId",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "topUpSubscription",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50611141806100206000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c8062f714ce146100d45780630d5de6df146100e95780630e27e3df1461010a578063112940f91461011d57806350c5f975146101305780636133f985146101465780636d0c4e291461015957806386850e93146101615780638ac000211461017457806393d81d5814610194578063a3ced7b9146101a7578063e0c86289146101bf578063e89e106a146101c7578063ed6f0792146101d0578063f2fde38b146101e5578063f6eaffc8146101f8575b600080fd5b6100e76100e2366004610d24565b61020b565b005b6100f16102a5565b6040516101019493929190610d54565b60405180910390f35b6100e7610118366004610dd2565b610342565b6100e761012b366004610dd2565b6103d9565b61013861043b565b604051908152602001610101565b6100e7610154366004610df6565b6104ad565b6100e7610673565b6100e761016f366004610e37565b61082a565b600854610187906001600160401b031681565b6040516101019190610e50565b6100e76101a2366004610dd2565b6108fa565b6101af610a11565b6040519015158152602001610101565b6100e7610ad8565b61013860075481565b6101d8610bb2565b6040516101019190610e64565b6100e76101f3366004610dd2565b610c0a565b610138610206366004610e37565b610ceb565b600554600160501b90046001600160a01b0316331461022957600080fd5b60015460405163a9059cbb60e01b81526001600160a01b038381166004830152602482018590529091169063a9059cbb906044016020604051808303816000875af115801561027c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102a09190610ea8565b505050565b6000805460085460405163523e3b4b60e11b815283928392606092620100009092046001600160a01b03169163a47c7696916102ef916001600160401b0390911690600401610e50565b600060405180830381865afa15801561030c573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526103349190810190610f07565b935093509350935090919293565b600554600160501b90046001600160a01b0316331461036057600080fd5b600054600854604051639f87fad760e01b8152620100009092046001600160a01b031691639f87fad7916103a4916001600160401b0390911690859060040161100e565b600060405180830381600087803b1580156103be57600080fd5b505af11580156103d2573d6000803e3d6000fd5b5050505050565b600554600160501b90046001600160a01b031633146103f757600080fd5b600054600854604051631cd0704360e21b8152620100009092046001600160a01b031691637341c10c916103a4916001600160401b0390911690859060040161100e565b6001546040516370a0823160e01b81523060048201526000916001600160a01b0316906370a0823190602401602060405180830381865afa158015610484573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104a89190611030565b905090565b600054610100900460ff16158080156104cd5750600054600160ff909116105b806104e75750303b1580156104e7575060005460ff166001145b61054f5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084015b60405180910390fd5b6000805460ff191660011790558015610572576000805461ff0019166101001790555b60058054600160301b600160301b600160f01b031990911633600160501b0263ffffffff60301b1916171765ffffffffffff19166401000186a0179055600280546001600160a01b03199081166001600160a01b03878116918217909355600380548316938716938417905560048590556000805462010000600160b01b03191662010000830217905560018054909216909217905560088054600160401b600160e01b031916600160401b909202919091179055801561066d576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b50505050565b600554600160501b90046001600160a01b0316331461069157600080fd5b6008546001600160401b0316156106e95760405162461bcd60e51b815260206004820152601c60248201527b10481cdd589cd8dc9a5c1d1a5bdb88185b1c9958591e48195e1a5cdd60221b6044820152606401610546565b60408051600180825281830190925260009160208083019080368337019050509050308160008151811061071f5761071f611049565b60200260200101906001600160a01b031690816001600160a01b031681525050600060029054906101000a90046001600160a01b03166001600160a01b031663a21a23e46040518163ffffffff1660e01b81526004016020604051808303816000875af1158015610794573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107b8919061105f565b600880546001600160401b0319166001600160401b03929092169182179055600080548351620100009091046001600160a01b031692637341c10c92909185919061080557610805611049565b60200260200101516040518363ffffffff1660e01b81526004016103a492919061100e565b600554600160501b90046001600160a01b0316331461084857600080fd5b6001546000546008546040516001600160a01b0393841693634000aea09362010000900416918591610886916001600160401b031690602001610e50565b6040516020818303038152906040526040518463ffffffff1660e01b81526004016108b3939291906110a6565b6020604051808303816000875af11580156108d2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108f69190610ea8565b5050565b600554600160501b90046001600160a01b0316331461091857600080fd5b6008546001600160401b03166109885760405162461bcd60e51b815260206004820152602f60248201527f4120737562736372697074696f6e20646f6573206e6f7420657869737420666f60448201526e1c881d1a1a5cc818dbdb9d1c9858dd608a1b6064820152608401610546565b600054600854604051630d7ae1d360e41b8152620100009092046001600160a01b03169163d7ae1d30916109cc916001600160401b0390911690859060040161100e565b600060405180830381600087803b1580156109e657600080fd5b505af11580156109fa573d6000803e3d6000fd5b5050600880546001600160401b0319169055505050565b6000805460085460405183926201000090046001600160a01b031691610a45916001600160401b0390911690602401610e50565b60408051601f198184030181529181526020820180516001600160e01b0316633a0ab5f560e21b17905251610a7a91906110ef565b600060405180830381855afa9150503d8060008114610ab5576040519150601f19603f3d011682016040523d82523d6000602084013e610aba565b606091505b5091505080806020019051810190610ad29190610ea8565b91505090565b600554600160501b90046001600160a01b03163314610af657600080fd5b600054600480546008546005546040516305d3b1d360e41b8152938401929092526001600160401b03166024830152600160201b810461ffff16604483015263ffffffff8082166064840152600160301b909104166084820152620100009091046001600160a01b031690635d3b1d309060a4016020604051808303816000875af1158015610b89573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bad9190611030565b600755565b60606006805480602002602001604051908101604052809291908181526020018280548015610c0057602002820191906000526020600020905b815481526020019060010190808311610bec575b5050505050905090565b600554600160501b90046001600160a01b03163314610c2857600080fd5b6001600160a01b038116610c8d5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610546565b600580546001600160a01b03838116600160501b818102600160501b600160f01b031985161790945560405193909204169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b60068181548110610cfb57600080fd5b600091825260209091200154905081565b6001600160a01b0381168114610d2157600080fd5b50565b60008060408385031215610d3757600080fd5b823591506020830135610d4981610d0c565b809150509250929050565b6001600160601b03851681526001600160401b0384166020808301919091526001600160a01b038481166040840152608060608401819052845190840181905260009285810192909160a0860190855b81811015610dc2578551841683529484019491840191600101610da4565b50909a9950505050505050505050565b600060208284031215610de457600080fd5b8135610def81610d0c565b9392505050565b600080600060608486031215610e0b57600080fd5b8335610e1681610d0c565b92506020840135610e2681610d0c565b929592945050506040919091013590565b600060208284031215610e4957600080fd5b5035919050565b6001600160401b0391909116815260200190565b6020808252825182820181905260009190848201906040850190845b81811015610e9c57835183529284019291840191600101610e80565b50909695505050505050565b600060208284031215610eba57600080fd5b81518015158114610def57600080fd5b80516001600160401b0381168114610ee157600080fd5b919050565b8051610ee181610d0c565b634e487b7160e01b600052604160045260246000fd5b60008060008060808587031215610f1d57600080fd5b84516001600160601b0381168114610f3457600080fd5b93506020610f43868201610eca565b93506040860151610f5381610d0c565b60608701519093506001600160401b0380821115610f7057600080fd5b818801915088601f830112610f8457600080fd5b815181811115610f9657610f96610ef1565b8060051b604051601f19603f83011681018181108582111715610fbb57610fbb610ef1565b60405291825284820192508381018501918b831115610fd957600080fd5b938501935b82851015610ffe57610fef85610ee6565b84529385019392850192610fde565b989b979a50959850505050505050565b6001600160401b039290921682526001600160a01b0316602082015260400190565b60006020828403121561104257600080fd5b5051919050565b634e487b7160e01b600052603260045260246000fd5b60006020828403121561107157600080fd5b610def82610eca565b60005b8381101561109557818101518382015260200161107d565b8381111561066d5750506000910152565b60018060a01b038416815282602082015260606040820152600082518060608401526110d981608085016020870161107a565b601f01601f191691909101608001949350505050565b6000825161110181846020870161107a565b919091019291505056fea26469706673582212206a3b649899df5c61df6d4ef4c7835539e39a3ca7e643eb1eae5c0864048eac6b64736f6c634300080f0033";

export class TykheLuckyOracle__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TykheLuckyOracle> {
    return super.deploy(overrides || {}) as Promise<TykheLuckyOracle>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): TykheLuckyOracle {
    return super.attach(address) as TykheLuckyOracle;
  }
  connect(signer: Signer): TykheLuckyOracle__factory {
    return super.connect(signer) as TykheLuckyOracle__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TykheLuckyOracleInterface {
    return new utils.Interface(_abi) as TykheLuckyOracleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TykheLuckyOracle {
    return new Contract(address, _abi, signerOrProvider) as TykheLuckyOracle;
  }
}
