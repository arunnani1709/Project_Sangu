import React, { useEffect, useState } from "react";
import axios from "axios";

const DoctorNotes = ({ clinicId, ipNumber, admissionId }) => {
  const [doctorNotes, setDoctorNotes] = useState([]);
  const [noteDate, setNoteDate] = useState("");
  const [openNoteId, setOpenNoteId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch existing notes for this admission
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        if (!admissionId) return;
        const res = await axios.get(`/api/ipd-doctor-notes/admission/${admissionId}`);
        const formattedNotes = res.data.map((note) => ({
          ...note,
          saved: true, // Mark existing notes as saved
        }));
        setDoctorNotes(formattedNotes || []);
      } catch (error) {
        console.error("Error fetching IPD doctor notes:", error);
      }
    };
    if (clinicId && admissionId) fetchNotes();
  }, [clinicId, admissionId]);

  // Add new Doctor Note
  const handleAddNote = () => {
    if (!noteDate) {
      alert("Please select a date before creating a Doctor's Note.");
      return;
    }

    const existing = doctorNotes.find((n) => n.visitDate === noteDate);
    if (existing) {
      alert(`A Doctor's Note for ${noteDate} already exists.`);
      return;
    }

    const newNote = {
      id: Date.now(),
      visitDate: noteDate,
      freshComplaints: "",
      improvementsOrProgress: "",
      treatment: "",
      vitals: "",
      outcome: "",
      saved: false,
    };

    setDoctorNotes((prev) => [...prev, newNote]);
    setNoteDate("");
    setOpenNoteId(newNote.id);
  };

  // Save note to backend
  const handleSaveNote = async (note) => {
    try {
      setLoading(true);

      if (note.saved && note.id) {
        // Update existing note
        await axios.put(`/api/ipd-doctor-notes/${note.id}`, {
          visitDate: note.visitDate,
          freshComplaints: note.freshComplaints,
          improvementsOrProgress: note.improvementsOrProgress,
          treatment: note.treatment,
          vitals: note.vitals,
          outcome: note.outcome,
        });
      } else {
        // Create new note
        const response = await axios.post("/api/ipd-doctor-notes", {
          admissionId,
          ipNumber,
          clinicId,
          visitDate: note.visitDate,
          freshComplaints: note.freshComplaints,
          improvementsOrProgress: note.improvementsOrProgress,
          treatment: note.treatment,
          vitals: note.vitals,
          outcome: note.outcome,
        });

        // Update the note with the backend ID
        setDoctorNotes((prev) =>
          prev.map((n) =>
            n.id === note.id ? { ...response.data.note, saved: true, id: response.data.note.id } : n
          )
        );
        alert("IPD Doctor's Note saved successfully!");
        setLoading(false);
        return;
      }

      setDoctorNotes((prev) =>
        prev.map((n) =>
          n.id === note.id ? { ...n, saved: true } : n
        )
      );

      alert("IPD Doctor's Note saved successfully!");
    } catch (error) {
      console.error("Error saving IPD doctor note:", error);
      alert("Failed to save doctor's note.");
    } finally {
      setLoading(false);
    }
  };

  // Handle field changes
  const handleFieldChange = (noteId, field, value) => {
    setDoctorNotes((prev) =>
      prev.map((note) =>
        note.id === noteId ? { ...note, [field]: value } : note
      )
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
        Doctor’s Notes
      </h2>

      {/* Add New Note */}
      <div className="flex items-center space-x-4 mb-6">
        <input
          type="date"
          value={noteDate}
          onChange={(e) => setNoteDate(e.target.value)}
          className="border px-3 py-2 rounded-md"
        />
        <button
          onClick={handleAddNote}
          className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition"
        >
          Doctor’s Note
        </button>
      </div>

      {/* List of Notes */}
      {doctorNotes.length === 0 ? (
        <p className="text-gray-600 text-center">No doctor's notes yet.</p>
      ) : (
        <div className="space-y-4">
          {doctorNotes.map((note) => (
            <div
              key={note.id}
              className="border rounded-lg p-4 bg-gray-50 shadow-sm"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-green-700">
                  Visit Date: {note.visitDate}
                </h3>
                <button
                  onClick={() =>
                    setOpenNoteId(openNoteId === note.id ? null : note.id)
                  }
                  className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
                >
                  {openNoteId === note.id ? "Hide" : "Open"}
                </button>
              </div>

              {openNoteId === note.id && (
                <div className="mt-4 space-y-3">
                  {[
                    { label: "Fresh Complaints", field: "freshComplaints" },
                    { label: "Improvements / Progress", field: "improvementsOrProgress" },
                    { label: "Treatment", field: "treatment" },
                    { label: "Vitals", field: "vitals" },
                    { label: "Outcome", field: "outcome" },
                  ].map(({ label, field }) => (
                    <div key={field}>
                      <label className="block font-semibold text-sm mb-1">{label}</label>
                      <textarea
                        value={note[field]}
                        onChange={(e) => handleFieldChange(note.id, field, e.target.value)}
                        className="w-full border rounded p-2"
                      />
                    </div>
                  ))}

                  <button
                    onClick={() => handleSaveNote(note)}
                    disabled={loading}
                    className="mt-3 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
                  >
                    {loading ? "Saving..." : "Save Note"}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorNotes;
