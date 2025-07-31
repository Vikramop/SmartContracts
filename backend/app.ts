import express from 'express';
import { AuthService } from './services/authService';
import { BlockchainService } from './services/blockchainService';
import { setupSwagger } from './swagger/swagger';
import { loggerMiddleware } from './middlewares/logger';
import tokenRoutes from './routes/tokenRoutes';

const app = express();

app.use(express.json());

// Instantiate services for DI
const authService = new AuthService();
const blockchainService = new BlockchainService();

// Inject services into req for modularity
app.use((req, _res, next) => {
  (req as any).authService = authService;
  (req as any).blockchainService = blockchainService;
  next();
});

app.use(loggerMiddleware);

app.use('/api/token', tokenRoutes);

setupSwagger(app);

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
  console.log(`Swagger docs available on http://localhost:${PORT}/docs`);
});
