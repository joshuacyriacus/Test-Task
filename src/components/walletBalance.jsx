import { useState } from "react";
import { ethers } from "ethers";

function WalletBalance() {
  const [balance, setBalance] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) return alert("⚠️ MetaMask not detected!");

    try {
      setIsConnecting(true);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);

      // Fetch balance
      const balanceWei = await provider.getBalance(accounts[0]);
      const balanceEth = ethers.formatEther(balanceWei);
      setBalance(parseFloat(balanceEth).toFixed(4));
    } catch (error) {
      console.error("❌ Error connecting wallet:", error);
      alert("❌ Failed to connect wallet");
    } finally {
      setIsConnecting(false);
    }
  };

  // Helper to shorten address (0x123...4567)
  const formatAddress = (addr) =>
    addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "";

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 p-4 bg-white rounded-xl shadow-md ring-1 ring-green-500">
      {/* Wallet info */}
      {account && (
        <div className="flex flex-col sm:flex-row items-center gap-2 text-sm font-medium text-gray-700">
          <span className="bg-green-50 text-green-700 px-3 py-1 rounded-lg">
            {balance} ETH
          </span>
          <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-lg">
            {formatAddress(account)}
          </span>
        </div>
      )}

      {/* Connect button */}
      <button
        onClick={connectWallet}
        disabled={isConnecting}
        className={`px-4 py-2 w-full sm:w-auto rounded-lg font-semibold transition ${
          account
            ? "bg-green-700 text-white cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700 text-white"
        }`}
      >
        {isConnecting
          ? "Connecting..."
          : account
          ? "Connected ✅"
          : "Connect Wallet"}
      </button>
    </div>
  );
}

export default WalletBalance;
