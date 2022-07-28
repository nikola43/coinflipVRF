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
  let coinFlip: Contract;

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

    let contractName = 'CoinFlip'
    let contractFactory = await ethers.getContractFactory(contractName)
    coinFlip = await contractFactory.deploy()
    await coinFlip.deployed()


    console.log(`${colors.cyan(contractName + ' Address: ')} ${colors.yellow(coinFlip.address)}`)

    console.log("");
    await test_util.updateABI(contractName)

    if (verify) {
      console.log('\nVerifing... ' + coinFlip.address)
      await test_util.verifyNormal(contractName, coinFlip.address);
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
