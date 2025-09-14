import { MapPin, Home } from "lucide-react";
import { ethers } from "ethers";

function PropertyCard({ title, price, location }) {
  // Handle transaction (send 0.001 ETH to test address)
  const handleBuy = async () => {
    if (!window.ethereum) {
      alert(" MetaMask not detected! Please install it.");
      return;
    }

    try {
      // Request wallet connection
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Create provider & signer
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Define transaction ( replace with the real test address if provided)
      const tx = {
        to: "0x000000000000000000000000000000000000dead", // test-task address
        value: ethers.parseEther("0.001"), // 0.001 ETH
      };

      // Send transaction
      const transactionResponse = await signer.sendTransaction(tx);
      console.log(" Transaction sent:", transactionResponse);

      alert(
        ` Transaction submitted!\n\nHash: ${transactionResponse.hash}\n\nCheck MetaMask for details.`
      );
    } catch (err) {
      console.error(" Transaction failed:", err);
      alert(" Transaction failed: " + (err.message || "Unknown error"));
    }
  };

  return (
    <div className="p-4 rounded-lg ring-2 ring-green-500 shadow-xl flex flex-col transition-transform transform hover:scale-105 duration-200">

      {/* Title + Location */}
      <h2 className="text-xl font-bold flex items-center gap-2 truncate">
        <Home size={20} className="text-green-600" /> {title}
      </h2>

      <div className="flex items-center text-gray-600 mt-2 font-medium">
        <MapPin size={18} className="mr-1 text-red-500" />
        <span className="truncate">{location}</span>
      </div>

      {/* Price */}
      <p className="text-green-600 text-lg font-semibold mt-1">
        ${price?.toLocaleString() ?? "N/A"}
      </p>

      {/* Buy button */}
      <button
        onClick={handleBuy}
        className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 font-semibold transition-colors"
      >
        Buy Property
      </button>
    </div>
  );
}

export default PropertyCard;
