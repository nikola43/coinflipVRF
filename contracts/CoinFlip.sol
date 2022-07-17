// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./ITykheLuckyOracle.sol";

struct Flip {
    address user;
    uint256 timestamp;
    uint256 flipNumber;
    bool flipResult;
}

contract CoinFlip is Initializable {
    address private _owner;
    uint256 private flipPrice;
    mapping(address => Flip) public usersFlips;
    uint256 private usersFlipsCounter;
    ITykheLuckyOracle tykheLuckyOracle;

    modifier onlyOwner() {
        require(msg.sender == _owner);
        _;
    }

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    function initialize(address _tykheLuckyOracleAddress) public initializer {
        _owner = msg.sender;
        flipPrice = 10000000000000000; // 0.01
        usersFlipsCounter = 0;
        tykheLuckyOracle = ITykheLuckyOracle(_tykheLuckyOracleAddress);
    }

    function getFlipPrice() external view returns (uint256) {
        return flipPrice;
    }

    function getFlipResult() external view returns (bool) {
        return usersFlips[msg.sender].flipResult;
    }

    function flipCoin() external payable {
        require(msg.value >= flipPrice, "Low amount");

        //uint256 flipResult = tykheLuckyOracle.askOracle()[0];
        /*
                Flip memory flip = Flip(
            msg.sender,
            block.timestamp,
            flipResult,
            flipResult % 2 == 0
        );*/
        Flip memory flip = Flip(
            msg.sender,
            block.timestamp,
            1212,
            true
        );

        usersFlips[msg.sender] = flip;
    }
}
