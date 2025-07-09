import React, { useState, useEffect } from "react";
import html2pdf from "html2pdf.js";
import { Link, useParams } from "react-router-dom";

const OPDSlipPreview = () => {
  const { pid } = useParams();
  const [slipData, setSlipData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pid) return;

    const fetchSlip = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/opd/slip/${pid}`
        );
        const data = await res.json();
        if (!res.ok || !data || Object.keys(data).length === 0) {
          throw new Error(data.message || "No slip data found");
        }
        setSlipData(data);
      } catch (error) {
        alert("Error loading OPD slip.");
        console.error("Slip fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSlip();
  }, [pid]);

  const downloadPDF = () => {
    const element = document.getElementById("opd-slip-preview");
    const opd = {
      margin: 0,
      filename: `OPD_Slip_${pid}_${new Date().toLocaleDateString("en-IN")}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(opd).from(element).save();
  };

  if (loading) return <div>Loading OPD Slip...</div>;
  if (!slipData)
    return <div className="p-10 text-center">Loading OPD Slip...</div>;

  return (
    <div className="p-3 bg-gray-100 min-h-screen">
      <div
        id="opd-slip-preview"
        className="bg-white px-6 py-2 mx-auto max-w-[800px] rounded shadow border-gray-300 print:shadow-none print:border-none print:rounded-none print:h-[11.69in] flex flex-col"
        style={{ minHeight: "1100px" }}
      >
        {/* Header */}
        <div className="text-center mb-3">
          <h1 className="text-xl font-bold text-indigo-800 leading-tight">
            {/* CityCare Multispeciality Hospital */}
            City Hospital
          </h1>
          <p className="text-sm text-gray-600 leading-snug">
            Dabwali Road, Sirsa, Haryana
            <br />
            Phone: +91-9999999999 | Email: info@citycare.com
          </p>
        </div>

        {/* Patient Info */}
        <div className="border-y border-gray-300 py-2 mb-2">
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-800">
            <p>
              <strong>PID:</strong> {slipData.pid}
            </p>
            <p>
              <strong>Name:</strong> {slipData.name}
            </p>
            <p>
              <strong>Age:</strong> {slipData.age}
            </p>
            <p>
              <strong>Gender:</strong> {slipData.gender}
            </p>
            <p>
              <strong>Mobile:</strong> {slipData.mobile_no}
            </p>
            <p>
              <strong>Department:</strong> {slipData.department}
            </p>
            <p>
              <strong>Doctor:</strong> {slipData.doctor}
            </p>
            <p>
              <strong>Fee:</strong> {slipData.fee}rs
            </p>
            <p>
              <strong>Diagnose:</strong> {slipData.diagnosis}
            </p>
          </div>
        </div>

        {/* Doctor's Notes Section */}
        <div className="flex-1 relative pt-1 mb-2">
          <p className="text-gray-500 italic text-sm mb-2">
            Doctor's Prescription Area
          </p>

          {/* Doctor's Signature at bottom-right */}
          <div className="absolute bottom-0 right-0 pr-4 pb-2 text-sm text-gray-700">
            <p>_____________________</p>
            <p>Doctor's Signature</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm border-gray-300 border-t pt-4 mt-4">
          <p>Thank you for visiting CityCare Multispeciality Hospital.</p>
          <p>For feedback or emergency, call +91-9999999999</p>
        </div>
      </div>

      {/* Action Buttons (excluded from print/pdf via utility class) */}
      <div className="flex flex-wrap gap-4 mt-6 justify-center print:hidden">
        <button
          onClick={() => window.print()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        >
          🖨️ Print
        </button>
        <button
          onClick={downloadPDF}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          📥 Download PDF
        </button>
        <Link to="/opd/register-new-patient">
          <button className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded">
            🔁 New OPD Slip
          </button>
        </Link>
        <Link to="/opd/fill-slip">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            ⬅️ Back to OPD Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OPDSlipPreview;
