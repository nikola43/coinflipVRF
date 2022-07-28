/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { CoinFlip, CoinFlipInterface } from "../CoinFlip";

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
        internalType: "bool",
        name: "bet",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "mode",
        type: "uint256",
      },
    ],
    name: "flipCoin",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "mode",
        type: "uint256",
      },
    ],
    name: "flipCoinHead",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "mode",
        type: "uint256",
      },
    ],
    name: "flipCoinTail",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getLastFlips",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "flipNumber",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "flipResult",
            type: "bool",
          },
        ],
        internalType: "struct Flip[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tykheLuckyOracleAddress",
        type: "address",
      },
    ],
    name: "initialize",
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
    name: "usersFlips",
    outputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "flipNumber",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "flipResult",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610c92806100206000396000f3fe6080604052600436106100555760003560e01c80630c9975971461005a578063a0f0a1e31461006f578063b97229b9146100f2578063c4d66de814610114578063c990e12614610134578063e9d4a96b14610147575b600080fd5b61006d6100683660046109de565b61015a565b005b34801561007b57600080fd5b506100c161008a366004610a0f565b600160208190526000918252604090912080549181015460028201546003909201546001600160a01b039093169290919060ff1684565b604080516001600160a01b039095168552602085019390935291830152151560608201526080015b60405180910390f35b3480156100fe57600080fd5b506101076103e4565b6040516100e99190610a28565b34801561012057600080fd5b5061006d61012f366004610a97565b6104ea565b61006d610142366004610a0f565b61062b565b61006d610155366004610a0f565b61085a565b66b1a2bc2ec500006000829003610179575066b1a2bc2ec50000610228565b81600103610190575067016345785d8a0000610228565b816002036101a757506703782dace9d90000610228565b816003036101be57506706f05b59d3b20000610228565b816004036101d55750670de0b6b3a7640000610228565b816005036101ec5750671bc16d674ec80000610228565b60405162461bcd60e51b815260206004820152600c60248201526b696e76616c6964206d6f646560a01b60448201526064015b60405180910390fd5b803410156102485760405162461bcd60e51b815260040161021f90610ac7565b600354604080516376b783c960e11b815290516000926001600160a01b03169163ed6f079291600480830192869291908290030181865afa158015610291573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526102b99190810190610b01565b6000815181106102cb576102cb610bbe565b60200260200101519050600084156102f0576102e8600283610bd4565b159050610300565b6102fb600283610bd4565b151590505b6040805160808101825233815242602082015290810183905281151560608201526002805460019190600090610337908490610c0c565b909155505060028054600090815260016020818152604092839020855181546001600160a01b0319166001600160a01b039091161781559085015191810191909155908301519181019190915560608201516003909101805460ff191691151591909117905581156103dc57336108fc6103b2346002610c24565b6040518115909202916000818181858888f193505050501580156103da573d6000803e3d6000fd5b505b505050505050565b606060006002546001600160401b0381111561040257610402610aeb565b60405190808252806020026020018201604052801561045457816020015b6040805160808101825260008082526020808301829052928201819052606082015282526000199092019101816104205790505b50905060005b6002548110156104e457600081815260016020818152604092839020835160808101855281546001600160a01b03168152928101549183019190915260028101549282019290925260039091015460ff161515606082015282518390839081106104c6576104c6610bbe565b602002602001018190525080806104dc90610c43565b91505061045a565b50919050565b600054610100900460ff161580801561050a5750600054600160ff909116105b806105245750303b158015610524575060005460ff166001145b6105875760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b606482015260840161021f565b6000805460ff1916600117905580156105aa576000805461ff0019166101001790555b6000805462010000600160b01b031916336201000002178155600255600380546001600160a01b0319166001600160a01b0384161790558015610627576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b5050565b66b1a2bc2ec50000600082900361064a575066b1a2bc2ec500006106b9565b81600103610661575067016345785d8a00006106b9565b8160020361067857506703782dace9d900006106b9565b8160030361068f57506706f05b59d3b200006106b9565b816004036106a65750670de0b6b3a76400006106b9565b816005036101ec5750671bc16d674ec800005b803410156106d95760405162461bcd60e51b815260040161021f90610ac7565b600354604080516376b783c960e11b815290516000926001600160a01b03169163ed6f079291600480830192869291908290030181865afa158015610722573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261074a9190810190610b01565b60008151811061075c5761075c610bbe565b6020026020010151905060006002826107759190610bd4565b6040805160808101825233815242602082015290810184905290151560608201819052600280549193506001916000906107b0908490610c0c565b909155505060028054600090815260016020818152604092839020855181546001600160a01b0319166001600160a01b039091161781559085015191810191909155908301519181019190915560608201516003909101805460ff1916911515919091179055811561085357336108fc61082b346002610c24565b6040518115909202916000818181858888f193505050501580156103dc573d6000803e3d6000fd5b5050505050565b66b1a2bc2ec500006000829003610879575066b1a2bc2ec500006108e8565b81600103610890575067016345785d8a00006108e8565b816002036108a757506703782dace9d900006108e8565b816003036108be57506706f05b59d3b200006108e8565b816004036108d55750670de0b6b3a76400006108e8565b816005036101ec5750671bc16d674ec800005b803410156109085760405162461bcd60e51b815260040161021f90610ac7565b600354604080516376b783c960e11b815290516000926001600160a01b03169163ed6f079291600480830192869291908290030181865afa158015610951573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526109799190810190610b01565b60008151811061098b5761098b610bbe565b6020026020010151905060006002826109a49190610bd4565b60408051608081018252338152426020820152908101849052901560608201819052600280549193506001916000906107b0908490610c0c565b600080604083850312156109f157600080fd5b82358015158114610a0157600080fd5b946020939093013593505050565b600060208284031215610a2157600080fd5b5035919050565b602080825282518282018190526000919060409081850190868401855b82811015610a8a57815180516001600160a01b031685528681015187860152858101518686015260609081015115159085015260809093019290850190600101610a45565b5091979650505050505050565b600060208284031215610aa957600080fd5b81356001600160a01b0381168114610ac057600080fd5b9392505050565b6020808252600a9082015269131bddc8185b5bdd5b9d60b21b604082015260600190565b634e487b7160e01b600052604160045260246000fd5b60006020808385031215610b1457600080fd5b82516001600160401b0380821115610b2b57600080fd5b818501915085601f830112610b3f57600080fd5b815181811115610b5157610b51610aeb565b8060051b604051601f19603f83011681018181108582111715610b7657610b76610aeb565b604052918252848201925083810185019188831115610b9457600080fd5b938501935b82851015610bb257845184529385019392850192610b99565b98975050505050505050565b634e487b7160e01b600052603260045260246000fd5b600082610bf157634e487b7160e01b600052601260045260246000fd5b500690565b634e487b7160e01b600052601160045260246000fd5b60008219821115610c1f57610c1f610bf6565b500190565b6000816000190483118215151615610c3e57610c3e610bf6565b500290565b600060018201610c5557610c55610bf6565b506001019056fea26469706673582212209aa0c33e85d55a76d71bddd6eee74750268fbd080bd5d6867b8ef3432e98104464736f6c634300080f0033";

export class CoinFlip__factory extends ContractFactory {
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
  ): Promise<CoinFlip> {
    return super.deploy(overrides || {}) as Promise<CoinFlip>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): CoinFlip {
    return super.attach(address) as CoinFlip;
  }
  connect(signer: Signer): CoinFlip__factory {
    return super.connect(signer) as CoinFlip__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CoinFlipInterface {
    return new utils.Interface(_abi) as CoinFlipInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CoinFlip {
    return new Contract(address, _abi, signerOrProvider) as CoinFlip;
  }
}
