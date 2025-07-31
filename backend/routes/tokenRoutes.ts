import { Router } from 'express';
import { body } from 'express-validator';
import { authMiddleware } from '../middlewares/authMiddleware';
import { mintLimiter } from '../middlewares/rateLimiter';
import { validateRequest } from '../middlewares/validate';
import { TokenController } from '../controllers/tokenController';

const router = Router();

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
  (req, res) => TokenController.mint(req, res)
);

export default router;
