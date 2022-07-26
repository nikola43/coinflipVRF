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
    mapping(uint256 => Flip) public usersFlips;
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
        usersFlipsCounter = 0;
        tykheLuckyOracle = ITykheLuckyOracle(_tykheLuckyOracleAddress);
    }

    function getLastFlips() external view returns (Flip[] memory) {
        Flip[] memory flips = new Flip[](usersFlipsCounter);

        for (uint256 index = 0; index < usersFlipsCounter; index++) {
            flips[index] = usersFlips[index];
        }

        return flips;
    }

    function flipCoinHead(uint256 mode) external payable {
        uint256 requiredAmount = 50000000000000000; // 0.05 BNB
        if (mode == 0) {
            requiredAmount = 50000000000000000; // 0.1 BNB
        } else if (mode == 1) {
            requiredAmount = 100000000000000000; // 0.1 BNB
        } else if (mode == 2) {
            requiredAmount = 250000000000000000; // 0.25 BNB
        } else if (mode == 3) {
            requiredAmount = 500000000000000000; // 0.5 BNB
        } else if (mode == 4) {
            requiredAmount = 1000000000000000000; // 1 BNB
        } else if (mode == 5) {
            requiredAmount = 2000000000000000000; // 2 BNB
        } else {
            revert("invalid mode");
        }

        require(msg.value >= requiredAmount, "Low amount");

        uint256 flipResult = tykheLuckyOracle.askOracle()[0];
        bool win = flipResult % 2 == 0;
        Flip memory flip = Flip(msg.sender, block.timestamp, flipResult, win);

        usersFlipsCounter += 1;
        usersFlips[usersFlipsCounter] = flip;

        if (win) {
            payable(msg.sender).transfer(msg.value * 2);
        }
    }

    function flipCoinTail(uint256 mode) external payable {
        uint256 requiredAmount = 50000000000000000; // 0.05 BNB
        if (mode == 0) {
            requiredAmount = 50000000000000000; // 0.1 BNB
        } else if (mode == 1) {
            requiredAmount = 100000000000000000; // 0.1 BNB
        } else if (mode == 2) {
            requiredAmount = 250000000000000000; // 0.25 BNB
        } else if (mode == 3) {
            requiredAmount = 500000000000000000; // 0.5 BNB
        } else if (mode == 4) {
            requiredAmount = 1000000000000000000; // 1 BNB
        } else if (mode == 5) {
            requiredAmount = 2000000000000000000; // 2 BNB
        } else {
            revert("invalid mode");
        }

        require(msg.value >= requiredAmount, "Low amount");

        uint256 flipResult = tykheLuckyOracle.askOracle()[0];
        bool win = flipResult % 2 != 0;
        Flip memory flip = Flip(msg.sender, block.timestamp, flipResult, win);

        usersFlipsCounter += 1;
        usersFlips[usersFlipsCounter] = flip;

        if (win) {
            payable(msg.sender).transfer(msg.value * 2);
        }
    }
}
