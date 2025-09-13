import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SwarnaprashanaPatientDetails = () => {
  const [doctorNotes, setDoctorNotes] = useState([]);
  const [openNoteId, setOpenNoteId] = useState(null);
  const [noteDate, setNoteDate] = useState("");
  const navigate = useNavigate();

  const { patientId } = useParams();

  useEffect(() => {
    if (!patientId) return;

    const fetchNotes = async () => {
      try {
        const res = await axios.get(`/api/notes/patient/${patientId}`);
        const sorted = res.data.sort(
          (a, b) => new Date(b.visitDate) - new Date(a.visitDate)
        );

        const enriched = sorted.map((note, idx, arr) => {
          let daysSinceLastVisit = null;
          if (idx < arr.length - 1) {
            const prev = new Date(arr[idx + 1].visitDate);
            const curr = new Date(note.visitDate);
            daysSinceLastVisit = Math.ceil(
              (curr - prev) / (1000 * 60 * 60 * 24)
            );
          }
          return {
            ...note,
            id: note.id,
            saved: true,
            dbId: note.id,
            daysSinceLastVisit,
          };
        });
        setDoctorNotes(enriched);
      } catch (err) {
        console.error("Error fetching notes:", err.response?.data || err);
        toast.error("Failed to fetch notes ❌");
      }
    };

    fetchNotes();
  }, [patientId]);

  const handleAddNote = () => {
    if (!noteDate) {
      toast.warn("Please enter a date before adding a note ⚠️");
      return;
    }
    const newNote = {
      id: Date.now(),
      dbId: null,
      visitDate: noteDate,
      dose: "",
      complaints: "",
      saved: false,
    };
    setDoctorNotes((prev) => [...prev, newNote]);
    setNoteDate("");
    setOpenNoteId(newNote.id);
  };

  const handleChange = (id, field, value) => {
    setDoctorNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, [field.toLowerCase()]: value } : note
      )
    );
  };

  const handleSave = async (id) => {
    const noteToSave = doctorNotes.find((n) => n.id === id);
    if (!noteToSave) return;

    if (!patientId) {
      console.error("Cannot save note: patientId is missing ❌", {
      
        patientId,
      });
      toast.error("Cannot save note: patientId missing ❌");
      return;
    }

    try {
      let savedNote;
      if (noteToSave.dbId) {
        savedNote = await axios.put(`/api/notes/${noteToSave.dbId}`, {
          patientId,
          ...noteToSave,
        });
      } else {
        savedNote = await axios.post(`/api/notes`, {

          patientId,
          ...noteToSave,
        });
      }

      setDoctorNotes((prev) =>
        prev.map((n) =>
          n.id === id
            ? {
                ...savedNote.data,
                id: n.id,
                dbId: savedNote.data.id,
                saved: true,
              }
            : n
        )
      );
      toast.success("Note saved successfully ✅");
    } catch (err) {
      console.error("Error while saving note:", err.response?.data || err);
      toast.error("Error saving note ❌");
    }
  };

  const toggleDropdown = (id) => {
    setOpenNoteId(openNoteId === id ? null : id);
  };

  return (
    <div className="mt-12 px-6">
      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md shadow"
      >
        ⬅ Back
      </button>

      {/* Input Row */}
      <div className="mb-6 flex gap-4 items-center">
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-semibold text-gray-700">
            Select Date
          </label>
          <input
            type="date"
            value={noteDate}
            onChange={(e) => setNoteDate(e.target.value)}
            className="border rounded px-4 py-2"
          />
        </div>
        <div className="flex flex-col mt-5">
          <button
            onClick={handleAddNote}
            className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700"
          >
            Create
          </button>
        </div>
      </div>

      {/* Doctor Notes */}
      {doctorNotes.map((note) => (
        <div key={note.id} className="mb-6 border rounded-lg shadow bg-white">
          <div className="p-2 border-b flex items-center justify-between">
            <p className="font-semibold text-green-700">
              Doctor&apos;s Note - {note.visitDate}
            </p>
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
              {/* Dose */}
              <div>
                <label className="block text-sm font-semibold mb-1">Dose</label>
                <input
                  type="text"
                  value={note.dose || ""}
                  onChange={(e) => handleChange(note.id, "dose", e.target.value)}
                  disabled={note.saved}
                  className="w-full border rounded-md p-2"
                  placeholder="e.g. 1ml"
                />
              </div>

              {/* Complaints */}
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Complaints
                </label>
                <input
                  type="text"
                  value={note.complaints || ""}
                  onChange={(e) =>
                    handleChange(note.id, "complaints", e.target.value)
                  }
                  disabled={note.saved}
                  className="w-full border rounded-md p-2"
                  placeholder="e.g. Cold, Fever"
                />
              </div>

              {/* Save Button */}
              <div className="mt-4 flex items-center justify-between">
                {!note.saved && (
                  <button
                    onClick={() => handleSave(note.id)}
                    className="px-5 py-2 bg-black text-white rounded-full text-sm hover:bg-gray-900"
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SwarnaprashanaPatientDetails;
