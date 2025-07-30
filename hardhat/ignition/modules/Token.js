// Simple role, interface, and permission sanity tests

async function main() {
  const [admin, alice, bob] = accounts;

  // Token contract instance assumed as 'Token'
  const token = await Token.new();

  // Test default admin role
  assert(
    (await token.hasRole(await token.DEFAULT_ADMIN_ROLE(), admin)) === true
  );

  // Mint to alice by admin (allowed)
  await token.mintTo(alice, 1000, { from: admin });
  assert((await token.balanceOf(alice)).toString() === '1000');

  // Mint to bob from unauthorized address (should fail)
  try {
    await token.mintTo(bob, 500, { from: bob });
    assert(false, 'Non-minter minted!');
  } catch (e) {
    assert(e.message.includes('AccessControl'));
  }

  // Burn from alice by BURNER_ROLE (admin)
  await token.burnFrom(alice, 500, { from: admin });
  assert((await token.balanceOf(alice)).toString() === '500');

  // Interface compliance: mintTo & burnFrom exist
  assert(typeof token.mintTo === 'function');
  assert(typeof token.burnFrom === 'function');

  // Negative: only PAUSER can pause
  await token.pause({ from: admin });
  try {
    await token.unpause({ from: bob });
    assert(false, 'Non-pauser unpaused!');
  } catch (e) {
    assert(e.message.includes('AccessControl'));
  }
}

main();
