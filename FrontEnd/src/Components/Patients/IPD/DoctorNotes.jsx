import React, { useEffect, useState } from "react";
import axios from "axios";

const DoctorNotes = ({ clinicId }) => {
  const [doctorNotes, setDoctorNotes] = useState([]);
  const [noteDate, setNoteDate] = useState("");
  const [openNoteId, setOpenNoteId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch existing notes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/notes/${clinicId}`);
        setDoctorNotes(res.data || []);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    if (clinicId) fetchNotes();
  }, [clinicId]);

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
      await axios.post("http://localhost:3001/api/notes", {
        clinicId,
        visitDate: note.visitDate,
        freshComplaints: note.freshComplaints,
        improvementsOrProgress: note.improvementsOrProgress,
        treatment: note.treatment,
        vitals: note.vitals,
        outcome: note.outcome,
      });

      setDoctorNotes((prev) =>
        prev.map((n) =>
          n.id === note.id ? { ...n, saved: true } : n
        )
      );

      alert("Doctor's Note saved successfully!");
    } catch (error) {
      console.error("Error saving note:", error);
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
