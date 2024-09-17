import React, { useState } from "react";
import { useJobContext } from "../JodContext";
import { Link, useParams } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ViewJob = () => {
  const { index } = useParams();
  const { jobData, setJobData } = useJobContext();

  const jobIndex = parseInt(index, 10);
  const job = jobData[jobIndex];

  const [note, setNote] = useState(job?.clientNotes || "");

  if (isNaN(jobIndex) || jobIndex < 0 || jobIndex >= jobData.length || !job) {
    return <div>Job not found</div>;
  }

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleSaveNote = () => {
    const updatedJobData = jobData.map((job, idx) =>
      idx === jobIndex ? { ...job, clientNotes: note } : job
    );
    setJobData(updatedJobData);
    setNote("");
  };
  const handleSaveAsPDF = () => {
    const input = document.getElementById("job-sheet-content");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      const position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("job-sheet.pdf");
    });
  };

  return (
    <div>
      <div id="job-sheet-content" className="lg:w-2/4 lg:mx-auto mx-5 mt-10">
        <div className="bg-blue-900 text-white uppercase text-center text-3xl py-2 rounded-t-lg">
          View Job Sheet
        </div>

        <div className="relative overflow-x-auto mt-1">
          <table className="w-full text-left border-collapse">
            <tbody>
              {Object.entries(job).map(([key, value]) => (
                <tr key={key} className="bg-white border-b">
                  <td className="px-4 py-1 border text-white lg:w-80 w-[40%] bg-blue-900 font-semibold">
                    {key.replace(/([A-Z])/g, " $1").toUpperCase()}{" "}
                  </td>
                  <td className="px-4 py-1 border">
                    <div className="border-gray-300 p-1 w-full text-black rounded-lg">
                      {key === "file" ? (
                        <a
                          href={value}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-900 font-bold "
                        >
                          View File
                        </a>
                      ) : (
                        value
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col p-1 ">
          <span>Add or Upload Note:</span>
          <textarea
            value={note}
            onChange={handleNoteChange}
            cols="30"
            rows="2"
            className="border-gray-300 border-2"
          ></textarea>
        </div>

        <button
          onClick={handleSaveNote}
          className="bg-blue-900 text-white w-full p-2  rounded-md"
        >
          Save Note
        </button>

        <div className="text-blue-900 flex gap-2 font-bold ">
          <button>Edit</button>
          <button>Delete</button>
        </div>

        <Link to="/">
          <div className="text-blue-900 font-bold text-center py-1 w-full">
            <button>Back</button>
          </div>
        </Link>
        <button
          onClick={handleSaveAsPDF}
          className="border-2 border-black px-1 "
        >
          Save as PDF
        </button>
      </div>
    </div>
  );
};

export default ViewJob;
