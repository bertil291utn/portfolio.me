// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./IERC20.sol";

contract Claimable {
    uint256 internal claimableAmount = 10 * 10e18;

    function claim(IERC20 _tokenAddress) external {
        require(
            _tokenAddress.balanceOf(msg.sender) <= 0,
            "Token already claimed"
        );
        require(msg.sender != address(0), "Invalid address");
        _tokenAddress.transfer(msg.sender, claimableAmount);
    }
}
