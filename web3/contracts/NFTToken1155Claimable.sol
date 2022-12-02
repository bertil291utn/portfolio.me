// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

contract MultipleEditionClaimable {
    function mintUser(uint256 id, IERC1155 tokenAddress, address owner) public {
        tokenAddress.safeTransferFrom(owner, msg.sender, id, 1, "");
    }
}
