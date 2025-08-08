import React, { useEffect, useState } from "react";
import axios from "axios";

const CertificateList = () => {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/upload/certificates")
      .then((res) => setCertificates(res.data))
      .catch((err) => console.error("Failed to fetch:", err));
  }, []);

  return (

        <div className="w-4/5 mx-auto p-6 bg-white shadow rounded-lg">
          <h2 className="text-xl font-bold mb-6 text-center">
            Uploaded Certificates
          </h2>

          {certificates.length === 0 ? (
            <p className="text-gray-600 text-center">
              No certificates uploaded yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-4 py-2 text-left">#</th>
                    <th className="border px-4 py-2 text-left">Filename</th>
                    <th className="border px-4 py-2 text-left">Upload Time</th>
                    <th className="border px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {certificates.map((cert, index) => (
                    <tr key={cert.id || index}>
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">{cert.filename}</td>
                      <td className="border px-4 py-2">
                        {new Date(cert.uploadTime).toLocaleString()}
                      </td>
                      <td className="border px-4 py-2">
                        <a
                          href={`http://localhost:3001${cert.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View PDF
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
  );
};

export default CertificateList;
