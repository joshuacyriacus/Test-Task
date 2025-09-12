import { MapPin, Home } from "lucide-react";
import { ethers } from "ethers";

function PropertyCard({ title, price, location, image }) {
  // Handle transaction (simulate buying property)
  const handleBuy = async () => {
    if (!window.ethereum) {
      alert("MetaMask not detected!");
      return;
    }

    try {
      // Request wallet connection
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Create provider & signer
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Define transaction (dummy address for testing)
      const tx = {
        to: "0x6c262B87e9C51ADD21993A54F9eb18B532863982",
        value: ethers.parseEther("0.001"), // 0.001 ETH
      };

      // Send transaction
      const transactionResponse = await signer.sendTransaction(tx);
      console.log("Transaction sent:", transactionResponse);

      alert("Transaction submitted! Check MetaMask.");
    } catch (err) {
      console.error("Transaction failed:", err);
      alert("Transaction failed: " + err.message);
    }
  };

  return (
    <div className="p-4 rounded-lg ring-2 ring-green-500 shadow-xl">
      {/* Property Image */}
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover rounded-lg mb-3"
        />
      )}

      {/* Title + Location */}
      <h2 className="text-xl font-bold flex items-center gap-2">
        <Home size={20} className="text-green-600" /> {title}
      </h2>

      <div className="flex items-center text-gray-600 mt-2 font-semibold">
        <MapPin size={18} className="mr-1 text-red-500" />
        {location}
      </div>

      {/* Price */}
      <p className="text-green-500 text-lg font-semibold mt-1">
        ${price.toLocaleString()}
      </p>

      {/* Buy button */}
      <button
        onClick={handleBuy}
        className="mt-3 w-full px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 font-semibold"
      >
        Buy Property
      </button>
    </div>
  );
}

export default PropertyCard;
