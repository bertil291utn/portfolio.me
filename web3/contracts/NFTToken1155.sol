// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MultipleEdition is ERC1155, Ownable {
    constructor() ERC1155("") {}

    function ownerMint(
        uint256[] calldata ids,
        uint256[] calldata amounts,
        address claimableAddress
    ) public onlyOwner {
        _mintBatch(msg.sender, ids, amounts, "");
        setApprovalForAll(claimableAddress, true);
    }

    function setURI(string calldata newuri) public onlyOwner {
        _setURI(newuri);
    }
}
