import React, { useEffect, useState } from "react";

const AddPatient = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    age: "",
    sex: "",
    address: "",
    visitDate: "",
    clinicId: "",
  });

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const generateClinicId = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/patients");
        const data = await res.json();
        const count = data.length + 1;
        const newId = `NJ${String(count).padStart(5, "0")}`;
        setFormData((prev) => ({ ...prev, clinicId: newId }));
      } catch (err) {
        console.error("Failed to fetch patients:", err);
        setFormData((prev) => ({ ...prev, clinicId: "NJ00001" }));
      }
    };

    generateClinicId();
  }, [success]);

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
      const response = await fetch("http://localhost:3001/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: "",
          phone: "",
          age: "",
          sex: "",
          address: "",
          visitDate: "",
          clinicId: "",
        });
        setTimeout(() => {
          setSuccess(false);
        }, 2000);
      } else {
        alert("Failed to add patient.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    // Added pb-24 here to prevent footer overlap
    <div className="flex-1 flex justify-center items-start p-4 sm:p-10 bg-gray-50 min-h-screen pb-24">
      <div className="w-full max-w-xl bg-white p-6 sm:p-8 rounded-md shadow border border-gray-200">
        <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-6 text-center sm:text-left">
          Add New Patient
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

          {/* Phone Number */}
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

          {/* Age and Sex */}
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

          {/* Clinic ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Clinic Patient ID
            </label>
            <input
              type="text"
              name="clinicId"
              value={formData.clinicId}
              readOnly
              className="w-full bg-gray-100 border border-gray-300 rounded px-4 py-2 text-gray-700"
            />
          </div>

          {/* Submit Button */}
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
    </div>
  );
};

export default AddPatient;
