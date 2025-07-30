const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Token (ethers v6 style)', function () {
  let Token, token, owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    Token = await ethers.getContractFactory('Token');
    token = await Token.deploy();
  });

  it('Owner has MINTER_ROLE and can mint', async function () {
    const minterRole = await token.MINTER_ROLE();

    // Minting to addr1 by owner
    await expect(token.connect(owner).mintTo(addr1.address, 100))
      .to.emit(token, 'Transfer') // Ethers v6 events
      .withArgs(ethers.ZeroAddress, addr1.address, 100);

    expect(await token.balanceOf(addr1.address)).to.equal(100n);
  });

  it('Non-minter cannot mint', async function () {
    // addr1 tries to mint, should revert
    await expect(token.connect(addr1).mintTo(owner.address, 100)).to.be
      .reverted;
  });

  it('IToken interface functions exist', async function () {
    expect(token.mintTo).to.be.a('function');
    expect(token.burnFrom).to.be.a('function');
  });

  it('Only BURNER_ROLE can burnFrom', async function () {
    // Owner (BURNER_ROLE) mints tokens to addr1
    await token.connect(owner).mintTo(addr1.address, 500);

    // Owner (BURNER_ROLE) burns tokens from addr1
    await expect(token.connect(owner).burnFrom(addr1.address, 200))
      .to.emit(token, 'Transfer')
      .withArgs(addr1.address, ethers.ZeroAddress, 200);

    expect(await token.balanceOf(addr1.address)).to.equal(300n);

    // addr1 tries to burn, fails
    await expect(token.connect(addr1).burnFrom(addr1.address, 50)).to.be
      .reverted;
  });
});
