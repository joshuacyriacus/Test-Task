import { useState } from "react";
import { MapPin, Home } from "lucide-react";
import ConfirmAndPay from "./ConfirmAndPay";

function PropertyCard({ title, price, location, image }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="p-4 rounded-lg ring-2 ring-green-500 shadow-xl flex flex-col transition-transform transform hover:scale-105 duration-200">
        {/* Property Image */}
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover rounded-lg mb-3"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
            No Image Available
          </div>
        )}

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
          onClick={() => setOpen(true)}
          className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 font-semibold transition-colors"
        >
          Buy Property
        </button>
      </div>

      {/* Global Modal */}
      <ConfirmAndPay isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default PropertyCard;
