import React, { useEffect, useState } from 'react';

export default function PluginWidget({ tokenAddress }) {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    async function fetchInfo() {
      const v = await fetch('http://localhost:4000/api/verify-token', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ address: tokenAddress })
      }).then(r => r.json());
      setInfo(v);
    }
    fetchInfo();
  }, [tokenAddress]);

  if (!info) return <div>Loading…</div>;

  return (
    <div style={{border:'1px solid #ccc', padding:12, borderRadius:6}}>
      <h3>{info.name} ({info.symbol})</h3>
      <p>Decimals: {info.decimals}</p>
      <p>Total supply: {info.totalSupply}</p>
      <a href={info.explorerUrl} target="_blank" rel="noreferrer">OKX Explorer</a>
    </div>
  );
}
