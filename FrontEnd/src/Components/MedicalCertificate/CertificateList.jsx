import React, { useEffect, useState } from "react";

const CertificateList = () => {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    // Dummy data for testing without backend
    const dummyCertificates = [
      {
        id: 1,
        filename: "React_Developer_Certificate.pdf",
        uploadTime: new Date("2025-08-01T10:30:00"),
        url: "/certificates/React_Developer_Certificate.pdf"
      },
      {
        id: 2,
        filename: "NodeJS_Backend_Certificate.pdf",
        uploadTime: new Date("2025-08-05T15:45:00"),
        url: "/certificates/NodeJS_Backend_Certificate.pdf"
      },
      {
        id: 3,
        filename: "Fullstack_Engineering_Certificate.pdf",
        uploadTime: new Date("2025-08-10T09:15:00"),
        url: "/certificates/Fullstack_Engineering_Certificate.pdf"
      }
    ];

    // Simulate API delay
    setTimeout(() => {
      setCertificates(dummyCertificates);
    }, 500);
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
                      href={cert.url}
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
