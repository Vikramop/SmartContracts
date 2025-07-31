export class BlockchainService {
  async mintToken(
    to: string,
    amount: number
  ): Promise<{ success: boolean; to: string; amount: number }> {
    // Placeholder: connect to blockchain for mint logic
    return { success: true, to, amount };
  }
}
