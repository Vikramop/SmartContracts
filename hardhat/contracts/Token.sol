// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./IToken.sol";

contract Token is ERC20, ERC20Burnable, Pausable, AccessControl, IToken {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    constructor() ERC20("AIReadyToken", "AIR") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(BURNER_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function mintTo(
        address to,
        uint256 amount
    ) public override onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    function burnFrom(
        address account,
        uint256 amount
    ) public override(ERC20Burnable, IToken) onlyRole(BURNER_ROLE) {
        _burn(account, amount);
    }

    // Gas optimization candidate
    function batchTransfer(
        address[] calldata recipients,
        uint256[] calldata amounts
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(recipients.length == amounts.length, "arrays mismatch");
        for (uint256 i = 0; i < recipients.length; ++i) {
            transfer(recipients[i], amounts[i]);
            // TODO: AI-OPTIMIZE
        }
    }
}
