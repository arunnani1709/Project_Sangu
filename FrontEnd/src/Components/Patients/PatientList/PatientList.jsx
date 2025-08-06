import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const dummyPatients = [
      {
        clinicId: "NJ00001",
        name: "John Doe",
        phone: "9876543210",
        address: "123 Green St, Springfield",
        visitDate: "2025-08-01",
      },
      {
        clinicId: "NJ00002",
        name: "Jane Smith",
        phone: "9123456789",
        address: "456 Oak Ave, Riverdale",
        visitDate: "2025-08-03",
      },
      {
        clinicId: "NJ00003",
        name: "Ali Khan",
        phone: "9988776655",
        address: "789 Maple Rd, Metropolis",
        visitDate: "2025-08-05",
      },
      {
        clinicId: "NJ00004",
        name: "Meera Patel",
        phone: "9112233445",
        address: "321 Birch Blvd, Gotham",
        visitDate: "2025-08-06",
      },
    ];

    setPatients(dummyPatients);
    setFilteredPatients(dummyPatients);
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(e.target.value);

    const searchValue = value.trim().toLowerCase();

    const filtered = patients.filter(
      (p) =>
        (p.name && p.name.toLowerCase().includes(searchValue)) ||
        (p.clinicId && p.clinicId.toLowerCase().includes(searchValue)) ||
        (p.phone && p.phone.toString().includes(searchValue))
    );

    setFilteredPatients(filtered);
  };

  const handleRowClick = (patient) => {
    navigate(`/patients/${patient.clinicId}`, { state: { patient } });
  };

  return (
    <div className="flex-1 p-4 sm:p-8">
      <h2 className="text-2xl font-bold text-black mb-6">Patient List</h2>

      <input
        type="text"
        placeholder="Search by name, clinic ID or phone..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full max-w-md px-4 py-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 mb-6"
      />

      {filteredPatients.length === 0 ? (
        <p className="text-gray-500">No patients found.</p>
      ) : (
        <>
          {/* Desktop View */}
          <div className="hidden sm:block overflow-auto rounded-md shadow border bg-white">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Clinic ID</th>
                  <th className="px-4 py-3 text-left font-semibold">Name</th>
                  <th className="px-4 py-3 text-left font-semibold">Phone</th>
                  <th className="px-4 py-3 text-left font-semibold">Address</th>
                  <th className="px-4 py-3 text-left font-semibold">Visit Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPatients.map((patient) => (
                  <tr
                    key={patient.clinicId}
                    onClick={() => handleRowClick(patient)}
                    className="cursor-pointer hover:bg-green-200 transition"
                  >
                    <td className="px-4 py-2">{patient.clinicId}</td>
                    <td className="px-4 py-2">{patient.name}</td>
                    <td className="px-4 py-2">{patient.phone}</td>
                    <td className="px-4 py-2">{patient.address}</td>
                    <td className="px-4 py-2">{patient.visitDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
{/* Mobile View */}
<div className="sm:hidden space-y-4 overflow-y-auto max-h-[80vh]">
  {filteredPatients.map((patient) => {
    const isExpanded = expandedId === patient.clinicId;

    return (
      <div
        key={patient.clinicId}
        className={`border rounded-md shadow-sm px-4 py-3 transition bg-white ${
          isExpanded ? "bg-green-100" : ""
        }`}
        onClick={() => {
          // If expanded, navigate when clicking anywhere except clinicId
          if (isExpanded) {
            handleRowClick(patient);
          }
        }}
      >
        <div
          className="font-semibold text-green-800 text-lg cursor-pointer"
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering parent click
            if (isExpanded) {
              setExpandedId(null); // Close if open
            } else {
              setExpandedId(patient.clinicId); // Open if closed
            }
          }}
        >
          {patient.clinicId}
        </div>

        <div className="text-green-700 font-medium">{patient.name}</div>

        <div
          className={`mt-2 text-sm text-gray-700 space-y-1 expandable-content ${
            isExpanded ? "expanded" : ""
          }`}
        >
          <div>
            <strong>Phone:</strong> {patient.phone}
          </div>
          <div>
            <strong>Address:</strong> {patient.address}
          </div>
          <div>
            <strong>Visit Date:</strong> {patient.visitDate}
          </div>
          <div className="text-xs text-gray-400">(Tap clinic ID to expand/collapse)</div>
        </div>
      </div>
    );
  })}
</div>
        </>
      )}
    </div>
  );
};

export default PatientList;
