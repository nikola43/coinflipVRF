// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

interface ITykheLuckyOracle {
    function askOracle() external view returns (uint256[] memory);
}
