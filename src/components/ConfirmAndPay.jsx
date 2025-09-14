import { useState } from "react";
import { X } from "lucide-react";

function ConfirmAndPay({ isOpen, onClose }) {
  const [amount, setAmount] = useState("0.001");
  const [toAddress, setToAddress] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred background */}
      <div
        className="absolute inset-0 bg-transparent  backdrop-blur-lg"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative z-10 bg-white p-6 rounded-2xl shadow-lg w-96">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={22} />
        </button>

        <h2 className="text-lg font-bold mb-4">Confirm & Pay</h2>

        {/* Amount input */}
        <div className="mb-3">
          <label className="block text-sm mb-1">Amount (ETH)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        {/* Address input */}
        <div className="mb-4">
          <label className="block text-sm mb-1">To Address</label>
          <input
            type="text"
            value={toAddress}
            onChange={(e) => setToAddress(e.target.value)}
            placeholder="0x..."
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              alert(
                `Sending ${amount} ETH to ${toAddress || "test address"}...`
              );
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmAndPay;
