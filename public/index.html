<!DOCTYPE html>
<html lang="lv">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Turbo Kredītu Pircējs</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 40px auto;
            padding: 20px;
            background: #0d1117;
            color: #e6edf3;
        }
        .container {
            background: #161b22;
            border: 1px solid #30363d;
            border-radius: 12px;
            padding: 30px;
        }
        h1 {
            color: #79c0ff;
            font-size: 24px;
        }
        .info {
            background: #0d1117;
            border: 1px solid #30363d;
            border-radius: 8px;
            padding: 12px;
            margin: 16px 0;
            word-break: break-all;
            font-family: monospace;
            font-size: 12px;
        }
        button {
            width: 100%;
            padding: 12px;
            background: linear-gradient(135deg, #238636 0%, #1a7f37 50%, #238636 100%);
            color: #fff;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
            margin-top: 12px;
        }
        button:disabled {
            background: #30363d;
            cursor: not-allowed;
        }
        input {
            width: 100%;
            padding: 12px;
            background: #0d1117;
            border: 1px solid #30363d;
            border-radius: 8px;
            color: #e6edf3;
            font-size: 16px;
            margin: 12px 0;
        }
        .status {
            margin-top: 20px;
            padding: 10px;
            border-radius: 8px;
            white-space: pre-wrap;
            word-break: break-all;
        }
        .success { color: #3fb950; }
        .error { color: #f85149; }
    </style>
</head>
<body>
    <div class="container">
        <h1>💰 Turbo Kredītu Pircējs</h1>
        <p>Iegādājies Turbo kredītus ar Base Sepolia ETH!</p>
        
        <button id="connectBtn">🔗 Savienot maku</button>
        
        <div id="walletInfo" class="info" style="display: none;"></div>
        
        <label>ETH summa:</label>
        <input type="number" id="ethAmount" value="0.005" step="0.001" min="0.001" />
        
        <button id="buyBtn" disabled>💰 Pirkt kredītus</button>
        
        <div id="status" class="status"></div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/ethers@6.13.4/dist/ethers.umd.min.js"></script>
    
    <script>
        let signer = null;
        let userAddress = null;
        let turboAddress = null;
        
        const connectBtn = document.getElementById('connectBtn');
        const buyBtn = document.getElementById('buyBtn');
        const walletInfo = document.getElementById('walletInfo');
        const ethAmount = document.getElementById('ethAmount');
        const statusEl = document.getElementById('status');
        
        function showStatus(message, type) {
            statusEl.textContent = message;
            statusEl.className = 'status ' + type;
        }
        
        connectBtn.addEventListener('click', async () => {
            try {
                if (!window.ethereum) {
                    throw new Error('Nav instalēts maks!');
                }
                
                showStatus('⏳ Savieno maku...', '');
                
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                userAddress = accounts[0];
                
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x14a34' }]
                });
                
                const provider = new ethers.BrowserProvider(window.ethereum);
                signer = await provider.getSigner();
                
                // Iegūst Turbo adresi
                const infoResponse = await fetch('/api/turbo-info');
                const infoData = await infoResponse.json();
                turboAddress = infoData.addresses['base-eth'];
                
                walletInfo.style.display = 'block';
                walletInfo.textContent = '✅ Maks: ' + userAddress + '\n✅ Turbo adrese: ' + turboAddress;
                
                buyBtn.disabled = false;
                connectBtn.textContent = '✅ Savienots';
                connectBtn.disabled = true;
                
                showStatus('✅ Gatavs! Ievadi ETH summu un spied "Pirkt kredītus"!', 'success');
                
            } catch (e) {
                showStatus('❌ ' + e.message, 'error');
            }
        });
        
        buyBtn.addEventListener('click', async () => {
            try {
                const amount = ethAmount.value;
                
                if (!amount || amount <= 0) {
                    throw new Error('Ievadi pareizu ETH summu!');
                }
                
                buyBtn.disabled = true;
                showStatus('⏳ Veic ETH pārskaitījumu... Apstiprini Phantom!', '');
                
                // Veic ETH pārskaitījumu
                const tx = await signer.sendTransaction({
                    to: turboAddress,
                    value: ethers.parseEther(amount)
                });
                
                showStatus('✅ ETH nosūtīts! TX: ' + tx.hash + '\n\n⏳ Gaida apstiprinājumu...', '');
                await tx.wait();
                
                showStatus('✅ ETH apstiprināts!\n\n⏳ Iesniedz funding transakciju...', '');
                
                // Iesniedz funding transakciju ar PAREIZO atslēgu
                const submitResponse = await fetch('/api/submit-funding', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ txId: tx.hash })
                });
                
                const submitData = await submitResponse.text();
                
                // Mēģina izparsēt JSON
                let parsedData;
                try {
                    parsedData = JSON.parse(submitData);
                } catch {
                    parsedData = { message: submitData };
                }
                
                if (parsedData.message === 'Transaction credited' && parsedData.creditedTransaction) {
                    showStatus(
                        '✅ KREDĪTI NOPIRKTI!\n\n' +
                        '💰 Winc kredīti: ' + parsedData.creditedTransaction.winstonCreditAmount + '\n' +
                        '💵 USD ekvivalents: $' + parsedData.creditedTransaction.usdEquivalent + '\n\n' +
                        'TX: ' + tx.hash,
                        'success'
                    );
                } else {
                    showStatus('⚠️ Atbilde: ' + submitData, '');
                }
                
            } catch (e) {
                showStatus('❌ ' + e.message, 'error');
            } finally {
                buyBtn.disabled = false;
            }
        });
    </script>
</body>
</html>
