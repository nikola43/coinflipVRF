import { ethers, upgrades } from 'hardhat'
const colors = require('colors');
const test_util = require('./util');
import { Contract } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { getImplementationAddress } from '@openzeppelin/upgrades-core'
import { parseEther } from 'ethers/lib/utils';
import { expect } from 'chai';
describe("TykheLuckyOracle", async () => {

    let deployer: SignerWithAddress;
    let bob: SignerWithAddress;
    let alice: SignerWithAddress;
    let tykheLuckyOracle: Contract;
    let tykheLuckyOracleIpml: string;



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

    it("1.2 - TykheLuckyOracle", async () => {
        let contractName = 'TykheLuckyOracle'
        const args = [
            "0x6A2AAd07396B36Fe02a22b33cf443582f682c82f",
            "0x84b9B910527Ad5C03A9Ca831909E21e236EA7b06",
            "0xd4bb89654db74673a187bd804519e65e3f71a52bc55f11da7601a13dcf505314",
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

    it("1.3 - Transfer Link Tokens to contract", async () => {
        const linkToken = await test_util.connectBUSD()

        await linkToken.connect(deployer).transfer(tykheLuckyOracle?.address, parseEther("1"))
    })

    it("1.4 - Create VRF Subscription", async () => {
        await tykheLuckyOracle.createNewSubscription();
        expect(1).to.be.eq(1);
    });
});
