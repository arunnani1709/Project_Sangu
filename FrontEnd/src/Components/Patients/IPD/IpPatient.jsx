import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import DoctorNotes from "../IPD/DoctorNotes";

const IpPatient = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const patient = state?.patient;

  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [caseSheetData, setCaseSheetData] = useState({}); // Store case sheet data by admission index
  const [savedCaseSheets, setSavedCaseSheets] = useState({}); // Track which case sheets are saved

  // Fetch existing admissions for this patient
  useEffect(() => {
    if (!patient?.clinicId) return;
    
    const fetchAdmissions = async () => {
      try {
        const response = await axios.get(`/api/ipd-admissions/patient/${patient.clinicId}`);
        const formattedAdmissions = response.data.map(adm => ({
          id: adm.id,
          ipNumber: adm.ipNumber,
          visitDate: adm.admissionDate,
          isOpen: false,
          showCaseSheet: false,
          status: adm.status,
          ward: adm.ward,
          bedNumber: adm.bedNumber,
          dischargeDate: adm.dischargeDate,
        }));
        setAdmissions(formattedAdmissions);

        // Fetch case sheets for each admission
        const caseSheets = {};
        const savedStatus = {};
        for (const adm of formattedAdmissions) {
          try {
            const caseSheetRes = await axios.get(`/api/ipd-case-sheets/admission/${adm.id}`);
            caseSheets[adm.id] = caseSheetRes.data;
            savedStatus[adm.id] = true; // Mark as saved if data exists
          } catch (err) {
            // Case sheet doesn't exist yet, that's okay
            caseSheets[adm.id] = {
              chiefComplaints: "",
              associateComplaints: "",
              historyOfPresentIllness: "",
              pastHistory: "",
              medicalSurgicalHistory: "",
              menstrualHistory: "",
              personalHistory: "",
              generalSpecialExamination: "",
              investigation: "",
              treatments: "",
            };
            savedStatus[adm.id] = false; // Mark as not saved
          }
        }
        setCaseSheetData(caseSheets);
        setSavedCaseSheets(savedStatus);
      } catch (err) {
        console.error("Error fetching admissions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmissions();
  }, [patient]);

  const handleAdmitToWard = async () => {
    if (!patient?.clinicId) {
      alert("Patient information is missing.");
      return;
    }

    const admissionDate = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD

    try {
      const response = await axios.post("/api/ipd-admissions", {
        clinicId: patient.clinicId,
        admissionDate,
        ward: null,
        bedNumber: null,
        notes: null,
      });

      const newAdmission = response.data.admission;
      
      // Add to state
      setAdmissions((prev) => [
        {
          id: newAdmission.id,
          ipNumber: newAdmission.ipNumber,
          visitDate: newAdmission.admissionDate,
          isOpen: false,
          showCaseSheet: false,
          status: newAdmission.status,
          ward: newAdmission.ward,
          bedNumber: newAdmission.bedNumber,
          dischargeDate: newAdmission.dischargeDate,
        },
        ...prev,
      ]);

      alert(`Patient admitted successfully!\nIP Number: ${newAdmission.ipNumber}\nClinic ID (NJ): ${newAdmission.clinicId}\nOP Number: ${newAdmission.opNumber}`);
    } catch (err) {
      console.error("Error admitting patient:", err);
      alert("Failed to admit patient. Please try again.");
    }
  };

  const toggleNote = (index) => {
    setAdmissions((prev) =>
      prev.map((admission, i) =>
        i === index
          ? {
              ...admission,
              isOpen: !admission.isOpen,
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

  const handleCaseSheetChange = (admissionId, field, value) => {
    setCaseSheetData((prev) => ({
      ...prev,
      [admissionId]: {
        ...(prev[admissionId] || {}),
        [field]: value,
      },
    }));
  };

  const handleSaveCaseSheet = async (e, admission) => {
    e.preventDefault();
    
    const data = caseSheetData[admission.id] || {};

    try {
      const payload = {
        admissionId: admission.id,
        ipNumber: admission.ipNumber,
        chiefComplaints: data.chiefComplaints || "",
        associateComplaints: data.associateComplaints || "",
        historyOfPresentIllness: data.historyOfPresentIllness || "",
        pastHistory: data.pastHistory || "",
        medicalSurgicalHistory: data.medicalSurgicalHistory || "",
        menstrualHistory: data.menstrualHistory || "",
        personalHistory: data.personalHistory || "",
        generalSpecialExamination: data.generalSpecialExamination || "",
        investigation: data.investigation || "",
        treatments: data.treatments || "",
      };

      const response = await axios.post("/api/ipd-case-sheets", payload);
      
      // Mark this case sheet as saved
      setSavedCaseSheets((prev) => ({
        ...prev,
        [admission.id]: true,
      }));
      
      alert(`Case sheet saved successfully for IP Number: ${admission.ipNumber}`);
      console.log("Case sheet saved:", response.data);
    } catch (err) {
      console.error("Error saving case sheet:", err);
      alert("Failed to save case sheet. Please try again.");
    }
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

  if (loading) {
    return (
      <div className="p-8 text-center">
        <p>Loading admissions...</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 mx-auto w-full max-w-[1100px]">
      {/* ================= Patient Details ================= */}
      <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 mb-10 overflow-x-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-green-700 text-center">
          In-Patient (IP) Details
        </h2>

        <div className="w-full overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-green-100 text-green-800">
              <tr>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Clinic ID</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Name</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Phone</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Age</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Sex</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Address</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Visit Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 break-words">{patient.clinicId}</td>
                <td className="px-4 py-2 break-words">{patient.name}</td>
                <td className="px-4 py-2 break-words">{patient.phone}</td>
                <td className="px-4 py-2 break-words">{patient.age}</td>
                <td className="px-4 py-2 break-words">{patient.sex}</td>
                <td className="px-4 py-2 break-words">{patient.address}</td>
                <td className="px-4 py-2 break-words">{patient.visitDate}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <button
            onClick={handleAdmitToWard}
            className="px-5 py-2 bg-green-700 hover:bg-green-800 text-white rounded-lg transition"
          >
            Admit to Ward
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition"
          >
            Go Back
          </button>
        </div>
      </div>

      {/* ================= Admissions Section ================= */}
      {admissions.map((admission, index) => (
        <div
          key={index}
          className="bg-gray-50 rounded-2xl shadow-md p-6 md:p-8 mb-4 overflow-x-auto"
        >
          <div className="flex flex-wrap justify-between items-center bg-green-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-700">
              IP Number: {admission.ipNumber} - Date: {admission.visitDate}
            </h3>

            <div className="flex gap-2 mt-2 sm:mt-0">
              <button
                onClick={() => toggleNote(index)}
                className="text-white bg-green-700 px-3 py-1 rounded hover:bg-green-800 transition"
              >
                {admission.isOpen ? "Hide" : "Open"}
              </button>

              {admission.isOpen && (
                <button
                  onClick={() => toggleCaseSheet(index)}
                  className="text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 transition"
                >
                  {admission.showCaseSheet ? "Hide" : "Case Sheet"}
                </button>
              )}
            </div>
          </div>

          {/* ================= Doctor Notes Section ================= */}
          {admission.isOpen && (
            <div className="mt-4 space-y-4">
              <div className="w-full overflow-x-auto">
                <div className="min-w-[320px] max-w-full">
                  <DoctorNotes 
                    clinicId={patient.clinicId} 
                    ipNumber={admission.ipNumber}
                    admissionId={admission.id}
                  />
                </div>
              </div>

              {/* ================= Case Sheet Section ================= */}
              {admission.showCaseSheet && (
                <div className="p-4 bg-white rounded-lg shadow-inner border border-blue-200 overflow-x-auto">
                  <h4 className="font-semibold text-blue-700 mb-2">
                    Case Sheet Details - IP Number: {admission.ipNumber}
                  </h4>
                  <form 
                    className="space-y-2 min-w-[300px]"
                    onSubmit={(e) => handleSaveCaseSheet(e, admission)}
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Chief Complaints:
                      </label>
                      <textarea
                        value={caseSheetData[admission.id]?.chiefComplaints || ""}
                        onChange={(e) => handleCaseSheetChange(admission.id, "chiefComplaints", e.target.value)}
                        placeholder="Enter chief complaints"
                        className="mt-1 p-2 w-full border rounded"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Associate Complaints:
                      </label>
                      <textarea
                        value={caseSheetData[admission.id]?.associateComplaints || ""}
                        onChange={(e) => handleCaseSheetChange(admission.id, "associateComplaints", e.target.value)}
                        placeholder="Enter associate complaints"
                        className="mt-1 p-2 w-full border rounded"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        History of Present Illness:
                      </label>
                      <textarea
                        value={caseSheetData[admission.id]?.historyOfPresentIllness || ""}
                        onChange={(e) => handleCaseSheetChange(admission.id, "historyOfPresentIllness", e.target.value)}
                        placeholder="Enter history of present illness"
                        className="mt-1 p-2 w-full border rounded"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Past History:
                      </label>
                      <textarea
                        value={caseSheetData[admission.id]?.pastHistory || ""}
                        onChange={(e) => handleCaseSheetChange(admission.id, "pastHistory", e.target.value)}
                        placeholder="Enter past history"
                        className="mt-1 p-2 w-full border rounded"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Medical / Surgical History:
                      </label>
                      <textarea
                        value={caseSheetData[admission.id]?.medicalSurgicalHistory || ""}
                        onChange={(e) => handleCaseSheetChange(admission.id, "medicalSurgicalHistory", e.target.value)}
                        placeholder="Enter medical / surgical history"
                        className="mt-1 p-2 w-full border rounded"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Menstrual History:
                      </label>
                      <textarea
                        value={caseSheetData[admission.id]?.menstrualHistory || ""}
                        onChange={(e) => handleCaseSheetChange(admission.id, "menstrualHistory", e.target.value)}
                        placeholder="Enter menstrual history"
                        className="mt-1 p-2 w-full border rounded"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Personal History:
                      </label>
                      <textarea
                        value={caseSheetData[admission.id]?.personalHistory || ""}
                        onChange={(e) => handleCaseSheetChange(admission.id, "personalHistory", e.target.value)}
                        placeholder="Enter personal history"
                        className="mt-1 p-2 w-full border rounded"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        General / Special Examination:
                      </label>
                      <textarea
                        value={caseSheetData[admission.id]?.generalSpecialExamination || ""}
                        onChange={(e) => handleCaseSheetChange(admission.id, "generalSpecialExamination", e.target.value)}
                        placeholder="Enter general / special examination"
                        className="mt-1 p-2 w-full border rounded"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Investigation:
                      </label>
                      <textarea
                        value={caseSheetData[admission.id]?.investigation || ""}
                        onChange={(e) => handleCaseSheetChange(admission.id, "investigation", e.target.value)}
                        placeholder="Enter investigation"
                        className="mt-1 p-2 w-full border rounded"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Treatments:
                      </label>
                      <textarea
                        value={caseSheetData[admission.id]?.treatments || ""}
                        onChange={(e) => handleCaseSheetChange(admission.id, "treatments", e.target.value)}
                        placeholder="Enter treatments"
                        className="mt-1 p-2 w-full border rounded"
                      ></textarea>
                    </div>

                    <div className="pt-3 flex gap-3">
                      <button
                        type="submit"
                        disabled={savedCaseSheets[admission.id]}
                        className={`px-4 py-2 text-white rounded ${
                          savedCaseSheets[admission.id]
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                      >
                        {savedCaseSheets[admission.id] ? "Saved Case Sheet ✓" : "Save Case Sheet"}
                      </button>
                      
                      {savedCaseSheets[admission.id] && (
                        <button
                          type="button"
                          onClick={() => {
                            setSavedCaseSheets((prev) => ({
                              ...prev,
                              [admission.id]: false,
                            }));
                          }}
                          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        >
                          Edit Case Sheet
                        </button>
                      )}
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
