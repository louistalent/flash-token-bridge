// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./flash.sol";

contract DeployTokens {
    address[] tokens;

    constructor(string[] memory symbols, address owner) {
        for (uint256 i = 0; i < symbols.length; i++) {
            FlashToken token = new FlashToken(symbols[i], symbols[i], 18);
            token.mintTo(owner, 1e24);
            token.transferOwnership(owner);
            tokens.push(address(token));
        }
    }

    function getTokens() public view returns (address[] memory) {
        return tokens;
    }
}
