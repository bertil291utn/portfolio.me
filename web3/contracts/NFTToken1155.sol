// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

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

    function getUri(uint256 _tokenId) public view returns (string memory) {
        require(balanceOf(msg.sender, _tokenId) > 0, "NFT does not exist");
        return
            string(
                abi.encodePacked(uri(0), Strings.toString(_tokenId), ".json")
            );
    }

    function setURI(string calldata newuri) public onlyOwner {
        _setURI(newuri);
    }
}
