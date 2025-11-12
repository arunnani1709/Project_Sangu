// OpdDoctorNotes.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddInduviualPatientMedicine from "../Indivusalpatent medicin/AddInduviualPatientMedicine";

const getBackendType = (unit, selectedType) => {
  if (selectedType === "Ghrita" || selectedType === "Kashaya") return selectedType;
  if (["NasalDrop", "Thaila", "Soap", "Shampoo", "Linements"].includes(selectedType)) {
    return selectedType;
  }
  if (unit === "ml") return "Kashaya";
  return selectedType || "Tablet";
};

const fetchPatient = async (clinicId, visitDate) => {
  const res = await axios.get(`/api/patients/${clinicId}?visitDate=${visitDate}`);
  return res.data;
};

const getFrontendUnit = (type) => (type === "Kashaya" ? "ml" : "No");

const OpdDoctorNotes = ({ clinicId }) => {
  const navigate = useNavigate();

  const [doctorNotes, setDoctorNotes] = useState([]);
  const [openNoteId, setOpenNoteId] = useState(null);
  const [noteDate, setNoteDate] = useState("");
  const [originalMedicines, setOriginalMedicines] = useState({}); // Track original medicines for each note

  const [shortForm, setShortForm] = useState("");
  const [dose1, setDose1] = useState("");
  const [dose2, setDose2] = useState("");
  const [dose3, setDose3] = useState("");
  const [doseTime, setDoseTime] = useState("B/F");
  const [days, setDays] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [bottleCount, setBottleCount] = useState("");
  const [unit, setUnit] = useState("No");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [fullForm, setFullForm] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const hideTimeTypes = ["Taila", "Linements", "NasalDrop", "Soap", "Paste", "Shampoo"];
  const hideDaysTypes = ["Soap", "Paste", "Shampoo"];

  // Load medicine list
  useEffect(() => {
    axios
      .get("/api/medicines")
      .then((res) => setMedicines(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Load existing notes
  useEffect(() => {
    if (!clinicId) return;
    axios
      .get(`/api/opd-notes/patient/${clinicId}`)
      .then((res) => {
        const sorted = res.data.sort(
          (a, b) => new Date(b.visitDate) - new Date(a.visitDate)
        );
        const enriched = sorted.map((note, idx, arr) => {
          let daysSinceLastVisit = null;
          if (idx < arr.length - 1) {
            const prev = new Date(arr[idx + 1].visitDate);
            const curr = new Date(note.visitDate);
            daysSinceLastVisit = Math.ceil((curr - prev) / (1000 * 60 * 60 * 24));
          }
          
          // Parse the notes JSON string to extract individual fields
          let parsedNotes = {};
          try {
            parsedNotes = note.notes ? JSON.parse(note.notes) : {};
          } catch (e) {
            console.error("Error parsing notes:", e);
          }
          
          return {
            ...note,
            ...parsedNotes, // Spread the parsed note fields (complaint, diagnosis, etc.)
            id: note.id,
            dbId: note.id,
            saved: true,
            daysSinceLastVisit,
            medicines: (note.medicines || []).map((med) => ({
              ...med,
              selectedType: med.selectedType || med.type,
            })),
          };
        });
        setDoctorNotes(enriched);
      })
      .catch((err) => console.error(err));
  }, [clinicId]);

  // Filter suggestions
  const filteredMedicines = medicines
    .filter((med) => med.code.toLowerCase().startsWith(shortForm.toLowerCase()))
    .map((med) => `${med.code} - ${med.name}`);

  // Create a map from code to medicine object (for suggestion lookup)
  const medicineMap = Object.fromEntries(medicines.map((m) => [m.code, m]));

  const handleAddNote = () => {
    if (!noteDate) {
      alert("Please enter a date before adding a note.");
      return;
    }
    const newNote = {
      id: Date.now(),
      dbId: null,
      visitDate: noteDate,
      complaint: "",
      diagnosis: "",
      tests: "",
      treatmentOrProcedure: "",
      medicines: [],
      saved: false,
      daysSinceLastVisit: null,
      department: "",
      consultant: "",
      weight: "",
      bp: "",
    };
    setDoctorNotes((prev) => [...prev, newNote]);
    setNoteDate("");
    setOpenNoteId(newNote.id);
  };

  const handleChange = (id, field, value) => {
    setDoctorNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, [field]: value } : note))
    );
  };

  const handleSave = async (id) => {
    const note = doctorNotes.find((n) => n.id === id);
    if (!note) return;

    try {
      // Prepare payload for backend
      const payload = {
        patientId: clinicId,
        visitDate: note.visitDate,
        notes: JSON.stringify({
          complaint: note.complaint,
          diagnosis: note.diagnosis,
          tests: note.tests,
          treatmentOrProcedure: note.treatmentOrProcedure,
          department: note.department,
          consultant: note.consultant,
          weight: note.weight,
          temperature: note.temperature,
          bp: note.bp,
        }),
        medicines: note.medicines,
      };

      let savedNoteRes;
      const isEditing = note.dbId; // Check if this is an edit (has dbId) or new note
      
      if (isEditing) {
        // Update existing note
        savedNoteRes = await axios.put(`/api/opd-notes/${note.dbId}`, payload);
        
        // When editing, only deduct NEW medicines that were added
        const originalMeds = originalMedicines[note.id] || [];
        const newMedicines = note.medicines.filter(med => {
          // Check if this medicine was in the original list
          return !originalMeds.some(origMed => 
            origMed.code === med.code && 
            origMed.type === med.type &&
            origMed.totalAmount === med.totalAmount &&
            origMed.bottleCount === med.bottleCount
          );
        });
        
        // Only deduct the newly added medicines
        if (newMedicines.length > 0) {
          for (const med of newMedicines) {
            const backendType = med.type || getBackendType(med.unit, med.selectedType);
            
            const deductPayload =
              backendType === "Kashaya" || backendType === "Ghrita"
                ? { bottleCount: Number(med.bottleCount) || 0 }
                : { quantity: Number(med.totalAmount) || 0 };

            const validQty =
              (deductPayload.quantity && deductPayload.quantity > 0) ||
              (deductPayload.bottleCount && deductPayload.bottleCount > 0);

            if (validQty) {
              try {
                await axios.put(`/api/medicines/${med.code}/${backendType}/deduct`, deductPayload);
              } catch (deductErr) {
                console.error(`Error deducting ${med.name}:`, deductErr);
              }
            }
          }
        }
      } else {
        // Create new note
        savedNoteRes = await axios.post("/api/opd-notes", payload);
        
        // Deduct medicine inventory for all medicines in new note
        if (note.medicines.length > 0) {
          for (const med of note.medicines) {
            const backendType = med.type || getBackendType(med.unit, med.selectedType);
            
            const deductPayload =
              backendType === "Kashaya" || backendType === "Ghrita"
                ? { bottleCount: Number(med.bottleCount) || 0 }
                : { quantity: Number(med.totalAmount) || 0 };

            const validQty =
              (deductPayload.quantity && deductPayload.quantity > 0) ||
              (deductPayload.bottleCount && deductPayload.bottleCount > 0);

            if (validQty) {
              try {
                await axios.put(`/api/medicines/${med.code}/${backendType}/deduct`, deductPayload);
              } catch (deductErr) {
                console.error(`Error deducting ${med.name}:`, deductErr);
              }
            }
          }
        }
      }

      // Mark the note as saved and set its dbId
      const newDbId = savedNoteRes.data.id;
      setDoctorNotes((prev) =>
        prev.map((n) =>
          n.id === id
            ? { ...n, saved: true, dbId: newDbId }
            : n
        )
      );
      
      alert(isEditing 
        ? "Doctor's note updated successfully!" 
        : "Doctor's note saved and medicine quantities updated successfully!");
    } catch (err) {
      console.error("Error saving note:", err);
      alert("Failed to save doctor's note.");
    }
  };

  const handleMedicineAdd = (
    noteId,
    code,
    d1,
    d2,
    d3,
    time,
    days,
    totalAmt,
    unit,
    bottleCount
  ) => {
    if (!selectedType) {
      alert("Please select a medicine type.");
      return;
    }
    const backendType = getBackendType(unit, selectedType);
    const actualCode = code.split(" - ")[0];

    const med = medicines.find(
      (m) =>
        m.code.trim().toLowerCase() === actualCode.trim().toLowerCase() &&
        m.type.trim().toLowerCase() === backendType.trim().toLowerCase()
    );
    if (!med) {
      return alert(`Selected medicine (${actualCode} - ${backendType}) not found.`);
    }

    const newMed = {
      code: med.code,
      name: med.name,
      dose1: d1,
      dose2: d2,
      dose3: d3,
      time,
      days,
      totalAmount: totalAmt,
      unit,
      bottleCount,
      type: backendType,
      selectedType,
    };

    // Add to frontend note’s medicines (no API call here)
    setDoctorNotes((prev) =>
      prev.map((note) =>
        note.id === noteId
          ? { ...note, medicines: [...note.medicines, newMed] }
          : note
      )
    );
  };

  const handleSuggestionClick = (code) => {
    const matched = medicines.find((m) => `${m.code} - ${m.name}` === code);
    if (matched) {
      setShortForm(code);
      setUnit(getFrontendUnit(matched.type));
      setFullForm(matched.name);
      setSelectedType(matched.type);
    } else {
      setShortForm(code);
    }
    setShowSuggestions(false);
  };

  const updateDays = (value) => {
    setDays(value);
    const manualTypes = ["Taila", "Linements", "NasalDrop", "Powder", "Leha", "Paste"];

    const total =
      (Number(dose1 || 0) + Number(dose2 || 0) + Number(dose3 || 0)) * Number(value || 0);

    if (!manualTypes.includes(selectedType)) {
      setTotalAmount(total > 0 ? total : "");
    }

    if (unit === "ml" && !manualTypes.includes(selectedType)) {
      const mlPerBottle =
        selectedType === "Ghrita"
          ? 150
          : selectedType === "Kashaya"
          ? 210
          : 1;
      setBottleCount(Math.ceil(total / mlPerBottle));
    } else {
      setBottleCount("");
    }
  };

  const toggleDropdown = (id) => {
    setOpenNoteId(openNoteId === id ? null : id);
  };

  return (
    <div className="mt-10">
      <div className="mb-4 flex gap-4 items-center">
        <input
          type="date"
          value={noteDate}
          onChange={(e) => setNoteDate(e.target.value)}
          className="border rounded px-4 py-2"
        />
        <button
          onClick={handleAddNote}
          className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700"
        >
          Doctor's Note
        </button>
      </div>

      {doctorNotes.map((note) => (
        <div key={note.id} className="mb-6 border rounded-lg shadow bg-white">
          <div className="p-2 border-b flex items-center justify-between">
            <p className="font-semibold text-green-700">Doctor's Note - {note.visitDate}</p>
            {note.daysSinceLastVisit !== null && (
              <p className="text-sm text-gray-600">
                Last visited {note.daysSinceLastVisit} day(s) ago
              </p>
            )}
            <button
              onClick={() => toggleDropdown(note.id)}
              className="text-green-700 text-xl font-bold hover:bg-green-100 w-8 h-8 rounded-full"
            >
              {openNoteId === note.id ? "−" : "+"}
            </button>
          </div>

          {openNoteId === note.id && (
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Doctors Department</label>
                  <input
                    type="text"
                    value={note.department}
                    onChange={(e) => handleChange(note.id, "department", e.target.value)}
                    disabled={note.saved}
                    className="w-full border rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Consultant Doctor</label>
                  <input
                    type="text"
                    value={note.consultant}
                    onChange={(e) => {
                      const input = e.target.value;
                      const cleanName = input.replace(/^Dr\.?\s*/i, "");
                      handleChange(note.id, "consultant", `Dr. ${cleanName}`);
                    }}
                    disabled={note.saved}
                    className="w-full border rounded-md p-2"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    value={note.weight || ""}
                    onChange={(e) => handleChange(note.id, "weight", e.target.value)}
                    disabled={note.saved}
                    className="w-full border rounded-md p-2"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold mb-1">Temperature (°F)</label>
                  <input
                    type="number"
                    value={note.temperature || ""}
                    onChange={(e) => handleChange(note.id, "temperature", e.target.value)}
                    disabled={note.saved}
                    className="w-full border rounded-md p-2"
                    placeholder="e.g. 98.6"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold mb-1">BP (mmHg)</label>
                  <input
                    type="text"
                    value={note.bp || ""}
                    onChange={(e) => handleChange(note.id, "bp", e.target.value)}
                    disabled={note.saved}
                    className="w-full border rounded-md p-2"
                    placeholder="e.g. 120/80"
                  />
                </div>
              </div>

              {["complaint", "diagnosis", "tests", "treatmentOrProcedure"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-semibold mb-1 capitalize">
                    {field}
                  </label>
                  <textarea
                    value={note[field]}
                    onChange={(e) => handleChange(note.id, field, e.target.value)}
                    className="w-full border rounded-md p-2 min-h-[150px]"
                    disabled={note.saved}
                  />
                </div>
              ))}

              {!note.saved && (
                <AddInduviualPatientMedicine
                  shortForm={shortForm}
                  setShortForm={setShortForm}
                  showSuggestions={showSuggestions}
                  setShowSuggestions={setShowSuggestions}
                  filteredMedicines={filteredMedicines}
                  medicineMap={medicineMap}
                  handleSuggestionClick={handleSuggestionClick}
                  unit={unit}
                  setUnit={setUnit}
                  dose1={dose1}
                  setDose1={setDose1}
                  dose2={dose2}
                  setDose2={setDose2}
                  dose3={dose3}
                  setDose3={setDose3}
                  days={days}
                  updateDays={updateDays}
                  totalAmount={totalAmount}
                  setTotalAmount={setTotalAmount}
                  bottleCount={bottleCount}
                  doseTime={doseTime}
                  setDoseTime={setDoseTime}
                  selectedType={selectedType}
                  setSelectedType={setSelectedType}
                  handleAddMedicine={() => {
                    if (!totalAmount) {
                      return alert("Please enter valid doses and days.");
                    }
                    handleMedicineAdd(
                      note.id,
                      shortForm.toUpperCase(),
                      dose1,
                      dose2,
                      dose3,
                      doseTime,
                      days,
                      totalAmount,
                      unit,
                      bottleCount
                    );
                    // Reset local fields
                    setShortForm("");
                    setDose1("");
                    setDose2("");
                    setDose3("");
                    setDays("");
                    setTotalAmount("");
                    setUnit("No");
                    setDoseTime("B/F");
                    setBottleCount("");
                    setFullForm("");
                    setSelectedType("");
                  }}
                />
              )}

              {fullForm && (
                <p className="text-sm text-gray-700 mt-1 ml-1">
                  <span className="font-semibold">Full Name:</span> {fullForm}
                </p>
              )}

             {note.medicines.length > 0 && (
<div className="mt-4 space-y-2">
  <h4 className="font-medium text-sm">Prescribed Medicines</h4>

  {/* Scrollable wrapper (enables horizontal scroll on mobile) */}
  <div className="w-full overflow-x-auto">
    {/* Use vertical stacking for medicine cards */}
    <div className="flex flex-col gap-4 min-w-max">
      {note.medicines.map((med, idx) => (
        <div
          key={idx}
          className="flex flex-wrap md:flex-nowrap items-center gap-6 bg-white p-3 rounded shadow-sm text-base border min-w-[600px]"
        >
          {/* Medicine Name */}
          <div className="w-28 text-center">
            <div className="text-xs text-gray-500">Medicine</div>
            <div className="font-medium">{med.name}</div>
          </div>

          {/* Doses */}
          {!["Soap", "Paste", "Shampoo"].includes(med.selectedType || med.type) && (
            <>
              <div className="w-16 text-center">
                <div className="text-xs text-gray-500">Morn</div>
                <div>{med.dose1}</div>
              </div>
              <div className="w-16 text-center">
                <div className="text-xs text-gray-500">Aft</div>
                <div>{med.dose2}</div>
              </div>
              <div className="w-16 text-center">
                <div className="text-xs text-gray-500">Eve</div>
                <div>{med.dose3}</div>
              </div>
            </>
          )}

          {/* Time */}
          {!hideTimeTypes.includes(med.selectedType || med.type) && (
            <div className="w-28 text-center">
              <div className="text-xs text-gray-500">Time</div>
              <div>
                {{
                  "B/F": "Before Food",
                  "A/F": "After Food",
                  "I/B/F": "In Between Food",
                }[med.time] || med.time}
              </div>
            </div>
          )}

          {/* Days */}
          {!hideDaysTypes.includes(med.selectedType || med.type) && (
            <div className="w-20 text-center">
              <div className="text-xs text-gray-500">Days</div>
              <div>{med.days}</div>
            </div>
          )}

          {/* Total */}
          <div className="w-28 text-center">
            <div className="text-xs text-gray-500">Total</div>
            <div>
              {med.totalAmount} {med.unit}
            </div>
          </div>

          {/* Bottle */}
          <div className="w-28 text-center">
            <div className="text-xs text-gray-500">Bottle</div>
            <div>
              {med.unit === "ml" ? `${med.bottleCount} bottle` : "-"}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>


)}


              <div className="mt-4 flex items-center justify-between">
                {!note.saved ? (
                  <button
                    onClick={() => handleSave(note.id)}
                    className="px-5 py-2 bg-black text-white rounded-full text-sm hover:bg-gray-900"
                  >
                    Save
                  </button>
                ) : (
                  <>
                    <p className="text-sm text-green-600 font-medium">Saved ✅</p>
                    <div className="flex gap-4">
                      <button
                        onClick={async () => {
                          const patientData = await fetchPatient(clinicId, note.visitDate);
                          navigate("/download-prescription", {
                            state: { note, patient: patientData },
                          });
                        }}
                        className="px-5 py-2 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700"
                      >
                        Download
                      </button>
                      <button
                        onClick={() => {
                          // Save the original medicines before editing
                          setOriginalMedicines((prev) => ({
                            ...prev,
                            [note.id]: JSON.parse(JSON.stringify(note.medicines)) // Deep copy
                          }));
                          // Enable editing mode
                          setDoctorNotes((prev) =>
                            prev.map((n) =>
                              n.id === note.id ? { ...n, saved: false, dbId: n.dbId } : n
                            )
                          );
                        }}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-full text-sm hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OpdDoctorNotes;
