// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

contract MultipleEditionClaimable {
    //TODO: make payable mintUser when auser buys a nft token when erc 1155 is not free anymore
    //take in mind when is free how to disable require (msg.value>0) condition

    function mintUser(uint256 id, IERC1155 tokenAddress, address owner) public {
        tokenAddress.safeTransferFrom(owner, msg.sender, id, 1, "");
    }
}
