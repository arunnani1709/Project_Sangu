import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DoctorNotes from "../IPD/DoctorNotes";

const IpPatient = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const patient = state?.patient;

  const [admissions, setAdmissions] = useState([]);
  const [nextIpNumber, setNextIpNumber] = useState(1);

  const handleAdmitToWard = () => {
    const ipNumber = "IP" + String(nextIpNumber).padStart(4, "0");
    const hardcodedDate = "2025-10-16"; // Hardcoded for now

    setAdmissions((prev) => [
      ...prev,
      {
        ipNumber,
        visitDate: hardcodedDate,
        isOpen: false,
        showCaseSheet: false,
      },
    ]);
    setNextIpNumber((prev) => prev + 1);
  };

  const toggleNote = (index) => {
    setAdmissions((prev) =>
      prev.map((admission, i) =>
        i === index
          ? {
              ...admission,
              isOpen: !admission.isOpen,
              // Close Case Sheet if notes are hidden
              showCaseSheet: !admission.isOpen ? admission.showCaseSheet : false,
            }
          : admission
      )
    );
  };

  const toggleCaseSheet = (index) => {
    setAdmissions((prev) =>
      prev.map((admission, i) =>
        i === index
          ? { ...admission, showCaseSheet: !admission.showCaseSheet }
          : admission
      )
    );
  };

  if (!patient) {
    return (
      <div className="p-8 text-center text-red-600">
        <p>No patient data found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 mx-auto w-full max-w-[1100px]">
      {/* Patient Details */}
      <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 mb-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-green-700 text-center">
          In-Patient (IP) Details
        </h2>
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-green-100 text-green-800">
            <tr>
              <th className="px-4 py-3 font-semibold">Clinic ID</th>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Phone</th>
              <th className="px-4 py-3 font-semibold">Age</th>
              <th className="px-4 py-3 font-semibold">Sex</th>
              <th className="px-4 py-3 font-semibold">Address</th>
              <th className="px-4 py-3 font-semibold">Visit Date</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{patient.clinicId}</td>
              <td className="px-4 py-2">{patient.name}</td>
              <td className="px-4 py-2">{patient.phone}</td>
              <td className="px-4 py-2">{patient.age}</td>
              <td className="px-4 py-2">{patient.sex}</td>
              <td className="px-4 py-2">{patient.address}</td>
              <td className="px-4 py-2">{patient.visitDate}</td>
            </tr>
          </tbody>
        </table>

       <div className="text-center mt-4 flex justify-center gap-4">
  <button
    onClick={handleAdmitToWard}
    className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-lg transition"
  >
    Admit to Ward
  </button>
  <button
    onClick={() => navigate(-1)}
    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition"
  >
    Go Back
  </button>
</div>

      </div>

      {/* Admissions Section */}
      {admissions.map((admission, index) => (
        <div
          key={index}
          className="bg-gray-50 rounded-2xl shadow-md p-6 md:p-8 mb-4"
        >
          <div className="flex justify-between items-center bg-green-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-700">
              IP Number: {admission.ipNumber} - Date: {admission.visitDate}
            </h3>

            <div className="flex gap-2">
              {/* Doctor Notes Toggle */}
              <button
                onClick={() => toggleNote(index)}
                className="text-white bg-green-700 px-3 py-1 rounded hover:bg-green-800"
              >
                {admission.isOpen ? "Hide" : "Open"}
              </button>

              {/* Case Sheet Toggle */}
              {admission.isOpen && (
                <button
                  onClick={() => toggleCaseSheet(index)}
                  className="text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
                >
                  {admission.showCaseSheet ? "Hide" : "Case Sheet"}
                </button>
              )}
            </div>
          </div>

          {admission.isOpen && (
            <div className="mt-4 space-y-4">
              {/* Doctor Notes */}
              <DoctorNotes clinicId={patient.clinicId} />

              {/* Case Sheet Section */}
              {admission.showCaseSheet && (
                <div className="p-4 bg-white rounded-lg shadow-inner border border-blue-200">
                  <h4 className="font-semibold text-blue-700 mb-2">
                    Case Sheet Details
                  </h4>
                  <form className="space-y-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Cheaf Complaints:
                      </label>
                      <input
                        type="text"
                        placeholder="Enter diagnosis"
                        className="mt-1 p-2 w-full border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Associate Complaints:
                      </label>
                      <textarea
                        placeholder="Enter treatment plan"
                        className="mt-1 p-2 w-full border rounded"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        History of Present Illness
                      </label>
                      <textarea
                        placeholder="Enter treatment plan"
                        className="mt-1 p-2 w-full border rounded"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Past History:
                      </label>
                      <textarea
                        placeholder="Enter treatment plan"
                        className="mt-1 p-2 w-full border rounded"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Medical History:
                      </label>
                      <textarea
                        placeholder="Enter treatment plan"
                        className="mt-1 p-2 w-full border rounded"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Menustral History:
                      </label>
                      <textarea
                        placeholder="Enter treatment plan"
                        className="mt-1 p-2 w-full border rounded"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                       Personal History:
                      </label>
                      <textarea
                        placeholder="Enter treatment plan"
                        className="mt-1 p-2 w-full border rounded"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        General Exemination:
                      </label>
                      <textarea
                        placeholder="Enter treatment plan"
                        className="mt-1 p-2 w-full border rounded"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Sergical Exemination:
                      </label>
                      <textarea
                        placeholder="Enter treatment plan"
                        className="mt-1 p-2 w-full border rounded"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                       Investigation:
                      </label>
                      <textarea
                        placeholder="Enter treatment plan"
                        className="mt-1 p-2 w-full border rounded"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Treatements:
                      </label>
                      <textarea
                        placeholder="Enter treatment plan"
                        className="mt-1 p-2 w-full border rounded"
                      ></textarea>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Save Case Sheet
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default IpPatient;
