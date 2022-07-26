const { ethers } = require('hardhat')
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { Contract } from '@ethersproject/contracts';
import { formatEther } from 'ethers/lib/utils';
const colors = require('colors/safe');
import test_util from '../test/util'
async function main(): Promise<void> {

  let deployer: SignerWithAddress;
  let bob: SignerWithAddress;
  let alice: SignerWithAddress;

  let tykheLuckyOracle: Contract;


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

    const verify = false;

    let initialBalance = formatEther(await deployer.getBalance());
    console.log(colors.cyan('Deployer Address: ') + colors.yellow(deployer.address));
    console.log(colors.cyan('Account balance: ') + colors.yellow(initialBalance));
    console.log();

    let contractName = 'TykheLuckyOracle'
    let contractFactory = await ethers.getContractFactory(contractName)
    tykheLuckyOracle = await contractFactory.deploy("0x6A2AAd07396B36Fe02a22b33cf443582f682c82f", "0x84b9B910527Ad5C03A9Ca831909E21e236EA7b06", "0xd4bb89654db74673a187bd804519e65e3f71a52bc55f11da7601a13dcf505314")
    await tykheLuckyOracle.deployed()


    console.log(`${colors.cyan(contractName + ' Address: ')} ${colors.yellow(tykheLuckyOracle.address)}`)
    console.log("");

    if (verify) {
      await test_util.updateABI(contractName)
      console.log('\nVerifing... ' + tykheLuckyOracle.address)
      await test_util.verify(tykheLuckyOracle.address)
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
