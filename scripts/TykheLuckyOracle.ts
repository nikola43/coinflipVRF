const { ethers, upgrades } = require('hardhat')
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { Contract } from '@ethersproject/contracts';
import { formatEther } from 'ethers/lib/utils';
const { getImplementationAddress } = require('@openzeppelin/upgrades-core')
const colors = require('colors/safe');
import test_util from '../scripts/util'
async function main(): Promise<void> {

  let deployer: SignerWithAddress;
  let bob: SignerWithAddress;
  let alice: SignerWithAddress;

  let tykheLuckyOracle: Contract;
  let tykheLuckyOracleIpml: string;


  console.log("");
  const signers = await ethers.getSigners();
  if (signers[0] !== undefined) {
    deployer = signers[0];
    console.log(`${colors.cyan('Deployer Address')}: ${colors.yellow(deployer?.address)}`)
  }
  if (signers[1] !== undefined) {
    bob = signers[1];
    console.log(`${colors.cyan('Bob Address')}: ${colors.yellow(bob?.address)}`)
  }
  if (signers[2] !== undefined) {
    alice = signers[2];
    console.log(`${colors.cyan('Alice Address')}: ${colors.yellow(alice?.address)}`)
  }
  console.log("");

  if (signers[0] != undefined) {

    deployer = signers[0];
    bob = signers[1];
    alice = signers[2];

    const verify = true;

    let initialBalance = formatEther(await deployer.getBalance());
    console.log(colors.cyan('Deployer Address: ') + colors.yellow(deployer.address));
    console.log(colors.cyan('Account balance: ') + colors.yellow(initialBalance));
    console.log();

    let contractName = 'TykheLuckyOracle'
    const args = [
      "0x7a1BaC17Ccc5b313516C5E16fb24f7659aA5ebed",
      "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
      "0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f",
    ];
    let contractFactory = await ethers.getContractFactory(contractName)
    tykheLuckyOracle = await upgrades.deployProxy(contractFactory, args)
    await tykheLuckyOracle.deployed()
    tykheLuckyOracleIpml = await getImplementationAddress(
      ethers.provider,
      tykheLuckyOracle.address
    )

    console.log(`${colors.cyan(contractName + 'ProxyAddress: ')} ${colors.yellow(tykheLuckyOracle.address)}`)
    console.log(`${colors.cyan(contractName + 'ImplAddress: ')} ${colors.yellow(tykheLuckyOracleIpml)}`)
    console.log("");
    if (verify) {
      await test_util.verifyWithotDeploy(contractName, tykheLuckyOracle);
    }
  }
}

main()
  .then(async (r: any) => {
    console.log("");
    return r;
  })
  .catch((error) => {
    console.log(colors.red("ERROR :("));
    console.log(colors.red(error));
    return undefined;
  });
