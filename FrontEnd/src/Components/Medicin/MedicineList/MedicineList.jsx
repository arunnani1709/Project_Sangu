import React, { useEffect, useState } from 'react';
import axios from 'axios';

const lowStockThresholds = {
  Tablet: 100,
  Kashaya: 5,
  Ghrita: 2,
  Taila: 2,
  Leha: 2,
  Capsule: 40,
  Linements: 5,
  Powder: 100,
  NasalDrop: 5,
  Soap: 5,
  Paste: 2,
  Shampoo: 5,
};

const unitLabels = {
  Tablet: 'No',
  Powder: 'grams',
  Kashaya: 'No',
  Ghrita: 'No',
  Taila: 'No',
  Leha: 'No',
  Capsule: 'No',
  Linements: 'No',
  NasalDrop: 'No',
  Soap: 'No',
  Paste: 'No',
  Shampoo: 'No',
};

const MedicineList = () => {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const res = await axios.get('/api/medicines');
        let data = res.data;

        if (Array.isArray(data)) {
          setMedicines(data);
        } else if (Array.isArray(data.medicines)) {
          setMedicines(data.medicines);
        } else {
          console.warn("Unexpected API response, using dummy data");
          setMedicines([
            { id: 1, name: "Paracetamol", code: "MED001", quantity: 120, type: "Tablet" },
            { id: 2, name: "Ibuprofen", code: "MED002", quantity: 80, type: "Tablet" },
            { id: 3, name: "Kashaya Special", code: "MED003", quantity: 3, type: "Kashaya" },
          ]);
        }
      } catch (error) {
        console.error('Error fetching medicines:', error);
        setMedicines([
          { id: 1, name: "Paracetamol", code: "MED001", quantity: 120, type: "Tablet" },
          { id: 2, name: "Ibuprofen", code: "MED002", quantity: 80, type: "Tablet" },
          { id: 3, name: "Kashaya Special", code: "MED003", quantity: 3, type: "Kashaya" },
        ]);
      }
    };

    fetchMedicines();
  }, []);

  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    const filtered = medicines
      .filter((med) => {
        const matchesSearch =
          med.name.toLowerCase().startsWith(lowerSearch) ||
          med.code.toLowerCase().startsWith(lowerSearch);

        const threshold = lowStockThresholds[med.type];
        const isLow = threshold ? med.quantity < threshold && med.quantity > 0 : false;
        const isOut = med.quantity === 0;

        if (activeFilter === 'low') return matchesSearch && isLow;
        if (activeFilter === 'out') return matchesSearch && isOut;
        return matchesSearch;
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    setFilteredMedicines(filtered);
  }, [search, medicines, activeFilter]);

  const handleFilterChange = (filter) => setActiveFilter(filter);
  const handleDelete = (id) => {
    setMedicines((prev) => prev.filter((med) => med.id !== id));
  };

  const getHeading = () => {
    switch (activeFilter) {
      case 'low': return 'Getting Out of Stock';
      case 'out': return 'Out of Stock';
      default: return 'All Medicines';
    }
  };

  const getRowClass = (med) => {
    const threshold = lowStockThresholds[med.type];
    if (med.quantity === 0) return 'bg-red-100';
    if (threshold && med.quantity < threshold) return 'bg-yellow-100';
    return 'hover:bg-green-50';
  };

  return (
    <div className="flex-1 px-4 sm:px-10 py-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-4 text-center">
        {getHeading()}
      </h2>

      {/* Search Input */}
      <div className="mb-4 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search by starting letters (name/code)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6">
        {[
          { key: 'all', label: 'All Medicines', active: 'bg-green-700 text-white', inactive: 'bg-white border border-green-500 text-green-700' },
          { key: 'low', label: 'Getting Out of Stock', active: 'bg-yellow-500 text-white', inactive: 'bg-white border border-yellow-400 text-yellow-600' },
          { key: 'out', label: 'Out of Stock', active: 'bg-red-600 text-white', inactive: 'bg-white border border-red-500 text-red-600' },
        ].map(({ key, label, active, inactive }) => (
          <button
            key={key}
            onClick={() => handleFilterChange(key)}
            className={`px-3 py-1 sm:px-4 sm:py-2 rounded text-sm sm:text-base ${activeFilter === key ? active : inactive}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Responsive Table */}
      {/* Responsive Table */}
<div className="bg-white rounded-lg shadow overflow-hidden border">
  <div className="overflow-x-auto w-full">
    <table className="min-w-full table-auto text-sm sm:text-base text-left">
      <thead className="bg-green-100 text-green-800">
        <tr>
          <th className="px-3 sm:px-6 py-3 border-b">#</th>
          <th className="px-3 sm:px-6 py-3 border-b whitespace-nowrap">Name</th>
          <th className="px-3 sm:px-6 py-3 border-b whitespace-nowrap">Code</th>
          <th className="px-3 sm:px-6 py-3 border-b whitespace-nowrap">Quantity</th>
          <th className="px-3 sm:px-6 py-3 border-b whitespace-nowrap">Type</th>
          <th className="px-3 sm:px-6 py-3 border-b text-center whitespace-nowrap">Action</th>
        </tr>
      </thead>
      <tbody>
        {filteredMedicines.length > 0 ? (
          filteredMedicines.map((med, index) => (
            <tr key={med.id || med.code} className={`border-b ${getRowClass(med)}`}>
              <td className="px-3 sm:px-6 py-2">{index + 1}</td>
              <td className="px-3 sm:px-6 py-2 break-words">{med.name}</td>
              <td className="px-3 sm:px-6 py-2">{med.code}</td>
              <td className="px-3 sm:px-6 py-2">
                {med.quantity} {unitLabels[med.type] || 'units'}
              </td>
              <td className="px-3 sm:px-6 py-2">{med.type}</td>
              <td className="px-3 sm:px-6 py-2 text-center">
                <button
                  onClick={() => handleDelete(med.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs sm:text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="px-3 sm:px-6 py-4 text-center text-gray-500">
              No medicines found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

    </div>
  );
};

export default MedicineList;
