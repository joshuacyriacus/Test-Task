

import { useState } from "react";
import { ethers } from "ethers";

function WalletConnect({ onAccountChange }) {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      return alert("MetaMask not detected. Please install it.");
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const selectedAccount = accounts[0];

      setAccount(selectedAccount);
      if (onAccountChange) onAccountChange(selectedAccount);
    } catch (err) {
      console.error("Wallet connection failed:", err);
    }
  };

  return (
    <div className="mb-6">
      {!account ? (
        <button
          onClick={connectWallet}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Connect Wallet
        </button>
      ) : (
        <p className="text-green-600">Connected: {account.slice(0, 6)}...{account.slice(-4)}</p>
      )}
    </div>
  );
}

export default WalletConnect;
