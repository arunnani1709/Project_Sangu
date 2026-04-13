import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const DischargePage = () => {
  const { ipNumber } = useParams();
  const navigate = useNavigate();
  const printRef = useRef();

  const [isEditing, setIsEditing] = useState(true);

  const [formData, setFormData] = useState({
    ipNumber: ipNumber,
    opNumber: "",
    njNumber: "",
    name: "",
    age: "",
    phone: "",
    admissionDate: "",
    dischargeDate: "",
    sex: "",
    consultant: "",
    complaints: "",
    clinicalFindings: "",
    investigations: "",
    diagnosis: "",
    treatment: "",
  });

  useEffect(() => {
    fetch(`${API_URL}/ipd-admissions/ip/${ipNumber}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setFormData({
            ipNumber: data.ipNumber || "",
            opNumber: data.opNumber || "",
            njNumber: data.clinicId || "",
            name: data.Patient?.name || "",
            age: data.Patient?.age || "",
            phone: data.Patient?.phone || "",
            admissionDate: data.admissionDate || "",
            dischargeDate: data.dischargeDate || "",
            consultant: data.Patient?.consultant || "",
            sex: data.Patient?.sex || "",
            complaints: data.Patient?.complaints || "",
            clinicalFindings: data.Patient?.clinicalFindings || "",
            investigations: data.Patient?.investigations || "",
            diagnosis: data.Patient?.diagnosis || "",
            treatment: data.Patient?.treatment || "",
          });

          setIsEditing(!data.dischargeDate);
        }
      })
      .catch((err) => console.error(err));
  }, [ipNumber]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveEdit = async () => {
    if (isEditing) {
      const res = await fetch(`${API_URL}/discharge`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Saved Successfully");
        setIsEditing(false);
      } else {
        alert("Failed to save");
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleDownloadPDF = () => {
    const element = printRef.current;

    const opt = {
      margin: 0,
      filename: `Discharge_${formData.ipNumber}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 3, useCORS: true, scrollY: 0 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div ref={printRef} className="pdf-container shadow">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-lg font-bold uppercase">
            Navajeevana Ayurveda & Physotherapy
          </h1>
          <p className="text-sm">Discharge Summary</p>
        </div>

        {/* Patient Info */}
        <div className="grid grid-cols-2 gap-2 text-sm border p-3 mb-5">
           <p><b>Name:</b> {formData.name}</p>
          <p><b>Age:</b> {formData.age}</p>
          <p><b>Sex:</b> {formData.sex}</p>
          <p><b>Phone:</b> {formData.phone}</p>
          <p><b>IP No:</b> {formData.ipNumber}</p>
          <p><b>OP No:</b> {formData.opNumber}</p>
          <p><b>NJ No:</b> {formData.njNumber}</p>
          <p><b>Admission:</b> {formData.admissionDate}</p>
          <p><b>Discharge:</b> {formData.dischargeDate}</p>
        </div>

        {/* Consultant */}
        <div className="mb-3">
          <label className="font-semibold">Consultant</label>
          <input
            disabled={!isEditing}
            value={formData.consultant}
            onChange={(e) => handleChange("consultant", e.target.value)}
            className="w-full border p-2 mt-1"
          />
        </div>

        {/* Sections */}
        {[
          ["Chief Complaints", "complaints"],
          ["Clinical Findings", "clinicalFindings"],
          ["Investigations", "investigations"],
          ["Final Diagnosis", "diagnosis"],
          ["Treatment Given", "treatment"],
        ].map(([label, key]) => (
          <div key={key} className="mb-3">
            <label className="font-semibold">{label}</label>
            <textarea
              rows="3"
              disabled={!isEditing}
              value={formData[key]}
              onChange={(e) => handleChange(key, e.target.value)}
              className="w-full border p-2 mt-1"
            />
          </div>
        ))}

        {/* Signature */}
        <div className="flex justify-between mt-12 text-sm">
          <p>Doctor Signature</p>
          <p>Patient Signature</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={handleDownloadPDF}
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          Download PDF
        </button>

        <button
          onClick={handleSaveEdit}
          className="bg-green-600 text-white px-5 py-2 rounded"
        >
          {isEditing ? "Save" : "Edit"}
        </button>

        <button
          onClick={() => navigate(-1)}
          className="bg-gray-600 text-white px-5 py-2 rounded"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default DischargePage;