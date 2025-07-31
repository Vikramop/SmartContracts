# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```

# Security Audit

**Contract:** Token.sol  
**Date:** 2024-07-30

## 1. Access Control

- [x] Only addresses with MINTER_ROLE can mint.
- [x] Only addresses with BURNER_ROLE can burn.
- [x] Only addresses with PAUSER_ROLE can pause/unpause contract.
- [x] All roles tested and restrictions verified with unit tests.

## 2. Pausability

- [x] Transfers, minting, burning are blocked when paused (if \_beforeTokenTransfer hook used).

## 3. No Reentrancy / External Calls

- [x] No vulnerable external contract interactions. All logic is internal/OpenZeppelin.

## 4. Gas Observations

- [x] batchTransfer is marked `// TODO: AI-OPTIMIZE` for future improvement.
- [x] No excessive state writes in hot paths.

## 5. OpenZeppelin Patterns

- [x] Only OZ contracts used for ERC20 core patterns.
- [x] No unsafe custom code.

## 6. Tests

- [x] All roles and interface functions tested (see test/Token.js).

## 7. Static Analysis

- [x] All critical and high warnings resolved in Remix static analysis.

---

**Reviewer:** Vikram
