import React, { useState } from "react";
import jsPDF from "jspdf";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const MedicalCertificate = () => {
  const [form, setForm] = useState({
    doctorName: "",
    designation: "",
    office: "",
    applicantName: "",
    age: "",
    disease: "",
    fromDate: "",
    toDate: "",
    restDays: "",
    restFromDate: "",
    restToDate: "",
    place: "",
    Signature: "",
    date: "", // Issue Date
    registrationNo: "",
    referenceNo: "", // Reference No
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addHeaderFooter = (doc) => {
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);

      // Header
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      doc.text("Dr.Patil's Navajeevana ayurveda chikitsa kendra", 105, 20, {
        align: "center",
      });

      doc.setFontSize(10);
      doc.text("Veerapura ,Raichur", 105, 26, { align: "center" });
      doc.text(
        "Contact: +91 9535261996 | healthyayurveda.patil@gmail.com",
        105,
        32,
        { align: "center" }
      );
      doc.line(20, 36, 190, 36); // horizontal line

      // Footer
      doc.setFontSize(10);
      doc.setTextColor(0, 102, 0);
      doc.text("Dr.Patil's Navajeevana Chikitsa Kendra", 105, 270, {
        align: "center",
      });

      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);
      doc.text(" Veerapura,Raichur", 105, 275, {
        align: "center",
      });
      doc.setTextColor(0, 0, 255);
      doc.text(
        "Mob: +91 9535261996 | Email: healthyayurveda.patil@gmail.com",
        105,
        280,
        { align: "center" }
      );
    }
  };

  const handleDownloadAndUpload = async () => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const marginLeft = 25;
    const usableWidth = pageWidth - marginLeft * 2;

    // Draw full-page border
    doc.setLineWidth(0.5);
    doc.rect(10, 10, 190, 277); // A4 page with 10mm margins

    // Add header & footer
    addHeaderFooter(doc);

    let y = 45; // Just below the horizontal line

    // Reference No and Issue Date (below header)
    doc.setFontSize(11);
    doc.setFont("times", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text(`Reference No: ${form.referenceNo || "_________"}`, 20, y);
    doc.text(`Issue Date: ${form.date || "_________"}`, 190, y, {
      align: "right",
    });

    y += 10;

    // Title
    doc.setFont("times", "bold");
    doc.setFontSize(16);
    doc.text("MEDICAL CERTIFICATE", pageWidth / 2, y, { align: "center" });
    y += 15;

    // Body
    doc.setFont("times", "normal");
    doc.setFontSize(14);

    const paragraph = `
This is to certify that patient Mr./Ms. ${form.applicantName}, aged about ${form.age} years, was diagnosed as ${form.disease}, and was under my treatment from ${form.fromDate} to ${form.toDate}. He/She required rest for ${form.restDays} days from ${form.restFromDate} to ${form.restToDate}, so concerned authorities do need full.
    `;

    const lines = doc.splitTextToSize(paragraph.trim(), usableWidth);
    lines.forEach((line) => {
      doc.text(line, marginLeft, y);
      y += 10;
    });

    y += 20;
    doc.text(`Thanking you`, pageWidth / 2, y, { align: "center" });

    y += 20;
    doc.text(`Signature & Seal`, pageWidth - marginLeft - 80, y);
    y += 10;
    doc.text(
      `Registration No: ${form.registrationNo}`,
      pageWidth - marginLeft - 80,
      y
    );

    const pdfBlob = doc.output("blob");
    const formData = new FormData();
    formData.append(
      "certificate",
      pdfBlob,
      `Medical_Certificate_${form.applicantName}.pdf`
    );

    try {
      await axios.post("/api/certificate", formData);
      toast.success("✅ Certificate saved !");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("❌ Failed to upload certificate");
    }

    doc.save(`Medical_Certificate_${form.applicantName}.pdf`);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-10 pb-24 shadow-lg border border-gray-300 rounded-lg text-[16px] leading-relaxed font-serif text-justify space-y-10">
      <h2 className="text-3xl font-semibold text-center underline underline-offset-4 mb-10 tracking-wide text-gray-800">
        MEDICAL CERTIFICATE
      </h2>

      {/* Reference No and Issue Date Inputs */}
      <div className="flex justify-between mb-8">
        <div className="space-x-2">
          <label className="text-gray-700 font-medium">Reference No:</label>
          <input
            name="referenceNo"
            value={form.referenceNo}
            onChange={handleChange}
            className="border-b border-gray-500 focus:border-blue-600 px-2 outline-none transition duration-150"
          />
        </div>

        <div className="space-x-2">
          <label className="text-gray-700 font-medium">Issue Date:</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="border-b border-gray-500 focus:border-blue-600 px-2 outline-none transition duration-150"
          />
        </div>
      </div>

      <div className="space-y-8">
        <p className="space-y-4">
          <span>This is to certify that patient Mr./Ms.</span>
          <input
            name="applicantName"
            value={form.applicantName}
            onChange={handleChange}
            className="border-b border-gray-500 focus:border-blue-600 px-2 w-1/3 outline-none transition duration-150"
          />
          <span>, aged about</span>
          <input
            name="age"
            value={form.age}
            onChange={handleChange}
            className="border-b border-gray-500 focus:border-blue-600 px-2 w-20 outline-none transition duration-150"
          />
          <span>years, was diagnosed as</span>
          <input
            name="disease"
            value={form.disease}
            onChange={handleChange}
            className="border-b border-gray-500 focus:border-blue-600 px-2 w-1/3 outline-none transition duration-150"
          />
          <span>and was under my treatment from</span>
          <input
            type="date"
            name="fromDate"
            value={form.fromDate}
            onChange={handleChange}
            className="border-b border-gray-500 focus:border-blue-600 px-2 outline-none transition duration-150"
          />
          <span>to</span>
          <input
            type="date"
            name="toDate"
            value={form.toDate}
            onChange={handleChange}
            className="border-b border-gray-500 focus:border-blue-600 px-2 outline-none transition duration-150"
          />
          <span>. He/She required rest for</span>
          <input
            name="restDays"
            value={form.restDays}
            onChange={handleChange}
            className="border-b border-gray-500 focus:border-blue-600 px-2 w-20 outline-none transition duration-150"
          />
          <span>days from</span>
          <input
            type="date"
            name="restFromDate"
            value={form.restFromDate}
            onChange={handleChange}
            className="border-b border-gray-500 focus:border-blue-600 px-2 outline-none transition duration-150"
          />
          <span>to</span>
          <input
            type="date"
            name="restToDate"
            value={form.restToDate}
            onChange={handleChange}
            className="border-b border-gray-500 focus:border-blue-600 px-2 outline-none transition duration-150"
          />
          <span>, so concerned authorities do need full.</span>
        </p>

        <p className="text-center mt-6 text-gray-700 font-medium">
          Thanking You
        </p>

        <div className="flex justify-between items-end px-6 mt-10">
          <div></div>
          <div className="text-right space-y-3">
            <p className="text-gray-700 font-medium">Signature & Seal</p>
            <p className="text-gray-600 text-sm">
              Registration No:{" "}
              <input
                name="registrationNo"
                value={form.registrationNo}
                onChange={handleChange}
                className="border-b border-gray-500 focus:border-blue-600 px-2 outline-none transition duration-150"
              />
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-6 mt-12">
        <button
          onClick={handleDownloadAndUpload}
          className="bg-green-700 text-white px-8 py-3 rounded-md hover:bg-green-800 transition duration-200 text-lg tracking-wide"
        >
          Download & Upload PDF
        </button>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default MedicalCertificate;
