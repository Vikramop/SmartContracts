import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { authMiddleware } from '../middlewares/authMiddleware';
import { mintLimiter } from '../middlewares/rateLimiter';
import { validateRequest } from '../middlewares/validate';
import { TokenController } from '../controllers/tokenController';

const router = Router();
const tokenController = new TokenController();

/**
 * @swagger
 * /mint:
 *   post:
 *     summary: Mint new tokens to a user
 *     tags:
 *       - Token
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               to:
 *                 type: string
 *                 description: Receiver wallet address
 *               amount:
 *                 type: integer
 *                 description: Number of tokens to mint
 *             required:
 *               - to
 *               - amount
 *     responses:
 *       200:
 *         description: Mint successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       429:
 *         description: Too many requests
 */
router.post(
  '/mint',
  authMiddleware('admin'),
  mintLimiter,
  body('to').isString().notEmpty(),
  body('amount').isInt({ min: 1 }),
  validateRequest,
  (req: Request, res: Response) => tokenController.mint(req, res)
);

// Dummy endpoints for balance/transactions/userinfo for FE testing:

router.get('/balance', (req: Request, res: Response) => {
  res.json({
    balance: 1500,
    symbol: 'AIR',
  });
});

router.get('/transactions', (req: Request, res: Response) => {
  res.json([
    {
      id: '1',
      from: '0x0000000000000000000000000000000000000000',
      to: '0xabcDEF123456...',
      amount: 1000,
      timestamp: new Date().toISOString(),
      type: 'mint',
    },
    {
      id: '2',
      from: '0xabcDEF123456...',
      to: '0xReceiver456...',
      amount: 200,
      timestamp: new Date().toISOString(),
      type: 'transfer',
    },
  ]);
});

router.get('/userinfo', (req: Request, res: Response) => {
  res.json({
    address: '0xabcDEF123456...',
    roles: ['admin', 'minter'], // Remove "admin" to test user UI
  });
});

export default router;
