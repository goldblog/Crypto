# Crypto Plugin App

This app verifies cryptocurrency tokens on-chain and fetches live market prices from OKX.

## Features
- Verify ERC-20 token contract on Polygon
- Fetch live price data from OKX API
- Simple plugin UI (React)
- Dockerized setup with backend + frontend

## Run locally

```bash
git clone https://github.com/yourname/crypto-plugin-app.git
cd crypto-plugin-app
docker-compose up --build
```

Backend runs on `http://localhost:4000`  
Frontend runs on `http://localhost:3000`

## Example usage

Verify a token:
```bash
curl -X POST http://localhost:4000/api/verify-token   -H "Content-Type: application/json"   -d '{"address":"0x25a2db8659707766b3452ab38bCeA593C7E6B559"}'
```

Fetch price (replace with valid instId):
```bash
curl "http://localhost:4000/api/price/POL-USDT"
```

## Environment variables
Copy `.env.example` → `.env` in backend and set:
- `POLYGON_RPC` – Polygon RPC URL
- `OKX_API_KEY`, `OKX_API_SECRET`, `OKX_PASSPHRASE` – (only required for private OKX API actions)
