# AI-Ready DApp System

A modular, scalable, and AI-extensible web3 stack featuring:

- **Solidity smart contract** (OpenZeppelin, Hardhat, Etherscan-verified)
- **Node.js/Express TypeScript backend** (API documented with Swagger)
- **Next.js/React TypeScript frontend** (TailwindCSS, modular UI)
- **Dockerized DevOps & CI/CD**
- **DevSecOps**: JWT auth, rate limit, linting, environment secrets
- **AI-Readiness**: Well-typed, modular, DI-powered for codegen/future AI

---

---

## Prerequisites

- **Node.js** `>=18` (recommended LTS)
- **npm**
- **Docker** & **docker-compose** (optional, for containerized local dev)

---

## 1. Backend Setup

```
cd backend
npm install
npm start
```

- Express API runs on [http://localhost:3000](http://localhost:3000)
- Swagger Docs: [http://localhost:3000/docs](http://localhost:3000/docs)

---

## 2. Frontend Setup

```
cd ../frontend
npm install
npm run dev
```

---

## 3. CI/CD

- GitHub Actions pipeline auto-lints, tests, and builds containers.
- Example deployment to AWS ECR configured in [`.github/workflows/ci-cd.yml`](.github/workflows/ci-cd.yml)

---

## 4. AI-Readiness & Extendability

- Modular services (DI): easily replace auth, blockchain, or add new API endpoints
- OpenAPI (Swagger): auto-generate SDKs or new routes via AI/codegen tools
- Typed React components: easily clone and adapt for staking, NFTs, or other web3 modules

---

## 5. Security

- JWT-based authentication, role-based API access
- Rate limiting on sensitive endpoints
- Input validation and sanitizer (`express-validator`)
- CORS: Only frontend origin permitted by default
- All env/secrets in `.env` (excluded in `.gitignore`)

---

## System Modularization

- **Smart Contracts**: Modular interfaces (e.g., IToken.sol) allow AI to auto-generate extensions.
- **Backend API**:
  - Services are dependency-injected to allow AI to swap auth or blockchain layers.
  - Swagger/OpenAPI docs auto-generate SDKs and new endpoints.
- **Frontend**:
  - Reusable typed components (`WalletCard`, `TransactionList`) make it easy for AI to clone or create new UI modules.
- **Docker & CI/CD**:
  - Containerization enables auto-scaling microservice deployment.
  - CI/CD pipelines validate code correctness before deployment, AI can auto-tune based on tests.

## Extensible API Paths

- `/api/staking`: Planned future AI-generated staking endpoints from smart contract interfaces.
- `/api/notifications`: To be added by AI for user alerts.

## AI Cooperation Points

- API documentation to aid prompt-based code generation.
- Code comments tagged with `// TODO: AI-OPTIMIZE` guide AI refactoring.
- Secrets stored via `.env` to avoid hardcoded sensitive info.

---
