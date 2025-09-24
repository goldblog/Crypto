require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { ethers } = require('ethers');

const app = express();
app.use(express.json());

const OKX_API_BASE = 'https://www.okx.com/api/v5';
const provider = new ethers.providers.JsonRpcProvider(process.env.POLYGON_RPC);

app.post('/api/verify-token', async (req, res) => {
  try {
    const { address } = req.body;
    if (!address) return res.status(400).json({ error: 'address required' });

    const abi = [
      'function name() view returns (string)',
      'function symbol() view returns (string)',
      'function decimals() view returns (uint8)',
      'function totalSupply() view returns (uint256)'
    ];
    const token = new ethers.Contract(address, abi, provider);

    const [name, symbol, decimals, totalSupply] = await Promise.all([
      token.name(), token.symbol(), token.decimals(), token.totalSupply()
    ]);

    res.json({
      verifiedOnchain: true,
      name, symbol,
      decimals: Number(decimals),
      totalSupply: totalSupply.toString(),
      explorerUrl: `https://web3.okx.com/explorer/polygon/token/${address}`
    });
  } catch (err) {
    res.status(500).json({ error: 'verification-failed', details: err.message });
  }
});

app.get('/api/price/:instId', async (req, res) => {
  try {
    const instId = req.params.instId;
    const url = `${OKX_API_BASE}/market/ticker?instId=${encodeURIComponent(instId)}`;
    const r = await axios.get(url);
    res.json(r.data);
  } catch (e) {
    res.status(500).json({ error: 'price-fetch-error', details: e.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
