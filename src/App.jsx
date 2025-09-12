import { useEffect, useState } from "react";
import PropertyCard from "./components/PropertyCard.jsx";
import FilterBar from "./components/FilterBar.jsx";
import WalletBalance from "./components/walletBalance.jsx";

function App() {
  const [properties, setProperties] = useState([]);
  const [location, setLocation] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/properties.json");
        const data = await res.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchData();
  }, []);

  // Filter + Sort
  let filtered = properties.filter((p) =>
    location ? p.location === location : true
  );
  filtered = filtered.sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );

  return (
    <div className="p-4 sm:p-6 lg:p-10">
      {/* Header with wallet connect on right */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-green-600 text-center sm:text-left">
          Property Listings
        </h1>
        <WalletBalance />
      </div>

      {/* Filters */}
      <div className="mb-6">
        <FilterBar
          location={location}
          setLocation={setLocation}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((p) => (
          <PropertyCard
            key={p.id}
            title={p.title}
            price={p.price}
            location={p.location}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
