import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Swarnaprashana = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    age: "",
    sex: "",
    address: "",
    visitDate: "",
  });
  const [patients, setPatients] = useState([]);
  const [success, setSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Fetch all patients initially
  useEffect(() => {
    axios
      .get("/api/swarnaprashana/patients")
      .then((res) => setPatients(res.data))
      .catch((err) => console.error("Error fetching patients", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.sex) {
      alert("Please select the patient's sex.");
      return;
    }

    try {
      const res = await axios.post("/api/swarnaprashana/patients", formData);
      setPatients((prev) => [res.data, ...prev]);
      setFormData({
        name: "",
        phone: "",
        age: "",
        sex: "",
        address: "",
        visitDate: "",
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      console.error(err);
      alert("Error adding patient ❌");
    }
  };

  // Filter patients in real time
  // Filter patients in real time and sort by numeric uniqueId
const filteredPatients = patients
  .filter((p) =>
    [p.name, p.phone, p.uniqueId]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  )
  .sort((a, b) => {
    const numA = parseInt(a.uniqueId.replace(/\D/g, ""), 10); // extract digits
    const numB = parseInt(b.uniqueId.replace(/\D/g, ""), 10);
    return numA - numB; // ascending order
  });


  return (
    <div className="flex-1 flex flex-col items-center p-4 sm:p-10 bg-gray-50 min-h-screen pb-24">
      {/* Form Section */}
      <div className="w-full max-w-xl bg-white p-6 sm:p-8 rounded-md shadow border border-gray-200">
        <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-6 text-center sm:text-left">
          Add New Swarna Prashana
        </h2>

        {success && (
          <div className="mb-4 text-sm text-green-700 font-medium bg-green-100 p-3 rounded text-center">
            Patient added successfully.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Patient Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              required
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              required
              pattern="[0-9]{10}"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="10-digit phone number"
            />
          </div>

          {/* Age + Sex */}
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="w-full sm:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                required
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
              />
            </div>

            <div className="w-full sm:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sex
              </label>
              <div className="flex items-center gap-4 mt-2 flex-wrap">
                {["Male", "Female", "Other"].map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="sex"
                      value={option}
                      checked={formData.sex === option}
                      onChange={handleChange}
                      className="text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Place
            </label>
            <textarea
              name="address"
              value={formData.address}
              required
              onChange={handleChange}
              rows={2}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Visit Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Visit Date
            </label>
            <input
              type="date"
              name="visitDate"
              value={formData.visitDate}
              required
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full sm:w-auto bg-green-500 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded transition text-center"
            >
              Add Patient
            </button>
          </div>
        </form>
      </div>

      {/* Search Patients */}
      <div className="w-full max-w-xl mt-8 bg-white p-2 rounded-md shadow border border-gray-200">
        <h3 className="text-md font-semibold text-gray-800 mb-3">
          Search Patient
        </h3>
        <input
          type="text"
          placeholder="Search by Name, Phone, or ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Patients List */}
      {filteredPatients.length > 0 && (
        <div className="w-full max-w-5xl mt-8 bg-white p-6 rounded-md shadow border border-gray-200 overflow-x-auto">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Patients List
          </h3>
          <table className="w-full table-auto border-collapse border border-gray-300 text-sm sm:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Age</th>
                <th className="border p-2">Sex</th>
                <th className="border p-2">Place</th>
                <th className="border p-2">Visit Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((p, idx) => (
                <tr
                  key={idx}
                  onClick={() =>
                    navigate(`/patient/${p.uniqueId}`, { state: p })
                  }
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  <td className="border p-2 font-semibold text-green-600">
                    {p.uniqueId}
                  </td>
                  <td className="border p-2">{p.name}</td>
                  <td className="border p-2">{p.phone}</td>
                  <td className="border p-2">{p.age}</td>
                  <td className="border p-2">{p.sex}</td>
                  <td className="border p-2">{p.address}</td>
                  <td className="border p-2">{p.visitDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* No results */}
      {searchTerm && filteredPatients.length === 0 && (
        <div className="w-full max-w-xl mt-8 text-center text-red-500 font-medium">
          No patients found.
        </div>
      )}
    </div>
  );
};

export default Swarnaprashana;
