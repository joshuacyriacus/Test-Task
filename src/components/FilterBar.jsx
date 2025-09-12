
function FilterBar({ location, setLocation, sortOrder, setSortOrder }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full">
      {/* Location filter */}
      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="border p-2 ring-1 ring-green-500 rounded-xl text-base sm:text-lg flex-1"
      >
        <option value="">All Locations</option>
        <option value="Lagos">Lagos</option>
        <option value="Abuja">Abuja</option>
        <option value="Port Harcourt">Port Harcourt</option>
      </select>

      {/* Price sort */}
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="border p-2 ring-1 ring-green-500 rounded-xl text-base sm:text-lg flex-1"
      >
        <option value="asc">Price: Low → High</option>
        <option value="desc">Price: High → Low</option>
      </select>
    </div>
  );
}

export default FilterBar;
