import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const PrescriptionTemplate = () => {
  const location = useLocation();
  const { note, patient: passedPatient } = location.state || {};
  const [patient, setPatient] = useState(passedPatient || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Fetch patient by clinicId and visitDate
  useEffect(() => {
    if (!note?.clinicId || !note?.visitDate) return;

    setLoading(true);
    setError(null);

    axios
      .get(`/api/patients/${note.clinicId}?visitDate=${note.visitDate}`)
      .then((res) => {
        setPatient(res.data);
      })
      .catch((err) => {
        console.error("Error fetching patient:", err);
        setError("Failed to load patient data.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [note]);

  const handleDownload = () => {
    if (!note || !patient) return;

    const doc = new jsPDF();
    const topMargin = 42;
    const bottomMargin = 30;

    const addHeaderFooter = (doc) => {
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0);
        doc.text("Sri Devi Ayurveda Clinic", 105, 20, { align: "center" });
        doc.setFontSize(10);
        doc.text(
          "Doreswamy Complex, Opp Kiran Nursing Home, Huliyar Road, Hiriyur",
          105,
          26,
          { align: "center" }
        );
        doc.text(
          "Contact: +91-8971859788 | shivunagaraj44@gmail.com",
          105,
          32,
          { align: "center" }
        );
        doc.line(20, 36, 190, 36);

        doc.setFontSize(10);
        doc.setTextColor(0, 102, 0);
        doc.text("Sri Devi Ayurveda Clinic", 105, 275, { align: "center" });
        doc.setFontSize(9);
        doc.setTextColor(0, 0, 0);
        doc.text(
          "Doreswamy Complex, Opp Kiran Nursing Home, Huliyar Road, Hiriyur",
          105,
          281,
          { align: "center" }
        );
        doc.setTextColor(0, 0, 255);
        doc.text(
          "Mob: 8971859788 | Email: shivunagaraj44@gmail.com",
          105,
          287,
          { align: "center" }
        );
      }
    };

    // ✅ Patient Info Table
    autoTable(doc, {
      startY: topMargin,
      theme: "grid",
      styles: { fontSize: 10, halign: "center" },
      headStyles: {
        fillColor: [204, 255, 229],
        textColor: [0, 80, 0],
        fontStyle: "bold",
      },
      head: [["Clinic ID", "Name", "Phone", "Age", "Sex", "Place", "Visit Date"]],
      body: [[
        patient.clinicId || "-",
        patient.name || "-",
        patient.phone || "-",
        patient.age || "-",
        patient.sex || "-",
        patient.address || "-",
        note.visitDate || "-",
      ]],
      margin: { top: topMargin, bottom: bottomMargin, left: 20, right: 20 },
    });

    let y = doc.lastAutoTable.finalY + 10;

    // ✅ Department & Consultant Table
    autoTable(doc, {
      startY: y,
      theme: "grid",
      styles: { fontSize: 10, halign: "left" },
      headStyles: {
        fillColor: [255, 255, 204],
        textColor: [0, 51, 102],
        fontStyle: "bold",
      },
      head: [["Department", "Consultant"]],
      body: [[note.department || "-", note.consultant || "-"]],
      margin: { top: 0, bottom: 0, left: 20, right: 20 },
    });

    y = doc.lastAutoTable.finalY + 10;

    // ✅ NEW: BP and temperature Weight Table
  if (
  (note.weight && note.weight.trim() !== "") ||
  (note.bp && note.bp.trim() !== "") ||
  (note.temperature && note.temperature.toString().trim() !== "")
) {
  autoTable(doc, {
    startY: y,
    theme: "grid",
    styles: { fontSize: 10, halign: "left" },
    headStyles: {
      fillColor: [255, 255, 204],
      textColor: [0, 51, 102],
      fontStyle: "bold",
    },
    head: [["Weight (kg)", "Temperature (°F)", "BP (mmHg)"]],
    body: [[
      note.weight || "-",
      note.temperature || "-",
      note.bp || "-"
    ]],
    margin: { top: 0, bottom: 0, left: 20, right: 20 },
  });

  y = doc.lastAutoTable.finalY + 10;
}


    // ✅ Clinical Info Table (conditionally render treatment row)
    const clinicalRows = [
      ["Complaint", note.complaint || "-"],
      ["Diagnosis", note.diagnosis || "-"],
      ["Tests", note.tests || "-"],
    ];

    if (note.treatmentOrProcedure && note.treatmentOrProcedure.trim() !== "") {
      clinicalRows.push(["Treatment / Procedure", note.treatmentOrProcedure]);
    }

    autoTable(doc, {
      startY: y,
      theme: "grid",
      styles: {
        fontSize: 10,
        cellPadding: 3,
        valign: "top",
      },
      columnStyles: {
        0: { cellWidth: 45 },
        1: { cellWidth: 105 },
      },
      head: [["Consultation", "Clinical Encounter"]],
      body: clinicalRows,
      margin: { top: topMargin, bottom: bottomMargin, left: 30, right: 30 },
    });

    y = doc.lastAutoTable.finalY + 10;

    // ✅ Medicines Table
    if (note.medicines?.length) {
      autoTable(doc, {
        startY: y,
        theme: "grid",
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
        styles: { fontSize: 10 },
        head: [["#", "Medicine Name", "Morning", "Afternoon", "Night", "Days", "Qty", "Unit"]],
        body: note.medicines.map((med, i) => [
          i + 1,
          med.name,
          med.dose1 || "-",
          med.dose2 || "-",
          med.dose3 || "-",
          med.days || "-",
          med.totalAmount || "-",
          med.unit || "-",
        ]),
        margin: { top: topMargin, bottom: bottomMargin, left: 20, right: 20 },
      });
    }

    addHeaderFooter(doc);
    doc.save(`Prescription_${patient.name}_${patient.clinicId}_${note.visitDate}.pdf`);
  };

  if (!note) {
    return <div className="p-6 text-center text-red-500">No note data available</div>;
  }

  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">Download Prescription</h2>
      <button
        onClick={handleDownload}
        disabled={!patient || !note.visitDate}
        className={`px-4 py-2 rounded ${
          patient && note.visitDate
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-gray-400 text-white cursor-not-allowed"
        }`}
      >
        Download PDF
      </button>

      {loading && <p className="mt-2 text-sm text-blue-600">Loading patient data...</p>}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default PrescriptionTemplate;
