// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./ITykheLuckyOracle.sol";

contract CoinFlip is Initializable {
    address private _owner;
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
        tykheLuckyOracle = ITykheLuckyOracle(_tykheLuckyOracleAddress);
    }

    function getSubscriptionDetails() external view {

    }
}
