import { ethers, upgrades } from 'hardhat'
const colors = require('colors');
import { Contract } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { getImplementationAddress } from '@openzeppelin/upgrades-core'
import { parseEther, formatEther } from 'ethers/lib/utils';
import { expect } from 'chai';
const os = require('os')
const util = require('./util');

describe("MetaStocks Testing", async () => {

    let tykheLuckyOracle: Contract;
    let tykheLuckyOracleIpml: string;

    let deployer: SignerWithAddress;
    let bob: SignerWithAddress;
    let alice: SignerWithAddress;




    describe("1 - Deploy MetaStock Contracts", async () => {

        it("1.1 - Get Signer", async () => {
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
        });

        it("1.1 - Get Signer", async () => {

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
        });

    });
});