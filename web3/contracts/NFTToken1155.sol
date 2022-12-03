// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract MultipleEdition is ERC1155, ERC1155Supply, Ownable {
    string private _uri;

    //"https://gateway.pinata.cloud/ipfs/QmaUh13Q6PXUxD6xwS449dfWcXaS9hmL5wZQGVS68iGoT2/";

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
        _uri = newuri;
    }

    function uri(
        uint256 _tokenId
    ) public view override returns (string memory) {
        bytes memory uriBytes = bytes(_uri);
        if (balanceOf(msg.sender, _tokenId) == 0 || uriBytes.length == 0)
            return "";
        return
            string(abi.encodePacked(_uri, Strings.toString(_tokenId), ".json"));
    }

    //overrides
    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override(ERC1155, ERC1155Supply) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
