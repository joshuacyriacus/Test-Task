import { useState } from "react";
import { ethers } from "ethers";

function WalletBalance() {
  const [balance, setBalance] = useState(null);
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (!window.ethereum) return alert("MetaMask not detected");

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);

      // Fetch balance
      const balanceWei = await provider.getBalance(accounts[0]);
      const balanceEth = ethers.formatEther(balanceWei);
      setBalance(parseFloat(balanceEth).toFixed(4));
    } catch (error) {
      console.error("Error connecting wallet:", error);
      alert("Failed to connect wallet");
    }
  };

  // Helper to shorten address (0x123...4567)
  const formatAddress = (addr) =>
    addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "";

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
      {account && (
        <div className="flex flex-col sm:flex-row items-center gap-2 text-sm font-medium text-gray-700">
          <span className="bg-gray-100 px-3 py-1 rounded-lg">
            {balance} ETH
          </span>
          <span className="bg-gray-200 px-3 py-1 rounded-lg">
            {formatAddress(account)}
          </span>
        </div>
      )}
      <button
        onClick={connectWallet}
        className="px-4 py-2 w-full sm:w-auto bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
      >
        {account ? "Connected" : "Connect Wallet"}
      </button>
    </div>
  );
}

export default WalletBalance;
