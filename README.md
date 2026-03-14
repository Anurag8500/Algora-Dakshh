# Algora — Pay-Per-Execution AI Agent Marketplace

### Trustless AI execution powered by Avalanche escrow payments

Algora is a decentralized AI agent marketplace where developers can monetize AI models and users can pay per execution with blockchain-secured escrow payments.

Instead of subscriptions or API keys, Algora enables **pay-per-execution AI** with automatic revenue distribution and refund protection.

---

# Problem

Today AI developers face major challenges:

• No easy way to monetize small AI tools  
• Users must trust centralized payment systems  
• No execution guarantee after payment  
• No refund mechanism if AI fails  
• No transparent revenue distribution  

Meanwhile users face:

• Expensive subscriptions
• Locked APIs
• No pay-per-use options
• No execution transparency

---

# Solution

Algora introduces:

**Programmable AI Execution Payments**

Users pay only when executing an AI agent. Funds are stored in a blockchain escrow contract and released only after successful execution.

This creates:

• Trustless payments  
• Automatic refunds  
• Revenue sharing  
• Transparent execution lifecycle  

---

# Key Features

## AI Marketplace
Browse AI agents built by developers.

Examples:

• Sentiment Analysis
• Image Detection
• Fraud Detection
• Translation AI
• Data Classification

---

## Pay-Per-Execution Model

Instead of:

Monthly subscriptions

Algora enables:

Pay only when running the AI.

---

## Smart Contract Escrow Payments

Payment flow:

User pays contract → Execution runs → Funds released.

If execution fails:

Refund automatically triggered.

---

## Automatic Revenue Split

Example:

User pays 0.01 AVAX

Contract distributes:

80% → Developer  
20% → Platform  

No manual accounting required.

---

## Execution Lifecycle Tracking

Every execution tracked:

pending → paid → running → completed / failed

Includes:

Latency  
Result hash  
Payment hash  
Execution logs  

---

## Developer Monetization Platform

Developers can:

List AI agents  
Set execution price  
Track revenue  
Track usage  

---

## Blockchain Transparency

Every execution linked to:

Transaction hash  
Contract escrow  
On-chain verification  

Users can verify payments publicly.

---

# Tech Stack

## Frontend

Next.js  
React  
TypeScript  
Tailwind CSS  
Framer Motion  

Wallet Integration:

Wagmi  
RainbowKit  

---

## Backend

Node.js  
Next.js API Routes  
MongoDB  
Mongoose  

Execution Engine:

Custom AI execution router  
Provider adapters  

---

## AI Integrations

HuggingFace Inference API  
Generic REST AI providers  

Supported formats:

Text AI  
Image AI  
Classification AI  

---

## Blockchain Layer

Avalanche Fuji Testnet

Smart Contracts:

Solidity  
Hardhat  
Ethers.js  

Features:

Escrow payments  
Revenue splitting  
Refund automation  

---

## Database

MongoDB stores:

Agents  
Executions  
Payments  
Results  
Execution logs  

---

# System Architecture

High level architecture:

User →
Frontend →
Backend →
Smart Contract →
AI Provider →
Result →
Contract payout

---

# Execution Workflow

Full lifecycle:

## Step 1 — Agent Selection

User selects AI agent.

Example:

Sentiment Analyzer AI

---

## Step 2 — Execution Creation

Backend creates execution record:

Stores:

User wallet  
Agent  
Payment amount  
Status  

Status:

pending

---

## Step 3 — Payment Request

Backend returns:

Contract address  
Execution price  

Frontend prompts payment.

---

## Step 4 — Blockchain Payment

User pays contract:

createExecution()

Contract stores:

User  
Developer  
Amount  

Execution becomes:

paid

---

## Step 5 — Execution Start

Backend verifies transaction.

Execution moves:

paid → running

AI provider called.

---

## Step 6 — Result Processing

Backend receives result.

Stores:

Result  
Latency  
Result hash  

Execution becomes:

completed

---

## Step 7 — Contract Settlement

Backend calls:

completeExecution()

Contract distributes:

Developer payment  
Platform fee  

---

## Step 8 — Refund Flow

If execution fails:

Backend calls:

refundExecution()

Contract returns funds to user.

Execution becomes:

failed

---

# Smart Contract Design

Contract: AlgoraEscrow.sol

Core functions:

createExecution()

Locks funds in escrow.

completeExecution()

Releases revenue split.

refundExecution()

Returns funds.

---

## Contract Storage

Execution struct:

user  
developer  
amount  
completed  
refunded  

Mapping:

executionId → Execution

---

# AI Agent Configuration Example

Example agent:

Sentiment Analyzer AI

Endpoint:

https://router.huggingface.co/hf-inference/models/cardiffnlp/twitter-roberta-base-sentiment

Request:

{
 "inputs":"I love this product"
}

Response:

[
 {
  "label":"LABEL_2",
  "score":0.94
 }
]

Mapped output:

Positive — 94%

---

# Project Structure


algora/

app/
api/
agents/
executions/
payment/

components/
dashboard/

lib/
agentRouter.ts
contractService.ts
avalancheVerifier.ts

models/
Agent.ts
Execution.ts

services/
executionService.ts

contracts/
AlgoraEscrow.sol

scripts/
deploy.ts


---

# Environment Variables

.env.local


AVALANCHE_RPC=https://api.avax-test.network/ext/bc/C/rpc

CONTRACT_ADDRESS=contract address

BACKEND_PRIVATE_KEY=backend signer key

PLATFORM_WALLET=platform wallet

MONGODB_URI=database connection


---

# Installation

Clone:


git clone repo


Install:


npm install


Run:


npm run dev


---

# Deploy Smart Contract

Compile:


npx hardhat compile


Deploy:


npx hardhat run scripts/deploy.ts --network fuji


---

# Run Backend


npm run dev


---

# Testing Flow

1 Connect wallet
2 Select agent
3 Provide input
4 Pay contract
5 Execution runs
6 Result displayed
7 Contract distributes payment

---

# Future Improvements

Planned upgrades:

Facinet x402 gasless payments  
Agent reputation scoring  
Execution reputation system  
Onchain execution registry  
Developer staking  
Agent NFTs  
Execution proofs  

---

# Use Cases

AI API marketplace  
AI SaaS monetization  
Freelance AI tools  
Enterprise AI access  
Pay-per-model infrastructure  

---

# Why Algora Matters

Algora introduces:

**Programmable AI payments**

Where:

Execution becomes a financial primitive.

This enables:

AI micro-economies  
Decentralized AI marketplaces  
Trustless AI services  

---

# Hackathon Value Proposition

Algora demonstrates:

AI + Web3 convergence

Key innovation:

AI execution as a programmable payment primitive.

---

# Contributors

Built for hackathon innovation.

---

# License

MIT

---

# Final Vision

Algora aims to become:

**The Stripe for AI execution.**

Where developers list AI agents and users pay only when they run.

Trustless.
Transparent.
Programmable.

---
