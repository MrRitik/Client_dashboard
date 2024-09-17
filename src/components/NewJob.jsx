import React, { useState } from "react";
import { useJobContext } from "../JodContext";
import { useNavigate } from "react-router-dom";
const NewJob = () => {
  const { jobData, setJobData } = useJobContext();
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [clientName, setClientName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [receivedDate, setReceivedDate] = useState("");
  const [inventoryReceived, setInventoryReceived] = useState("");
  const [reportedIssues, setReportedIssues] = useState("");
  const [clientNotes, setClientNotes] = useState("");
  const [assignedTechnician, setAssignedTechnician] = useState("");
  const [deadline, setDeadline] = useState("");
  const [estimatedAmount, setEstimatedAmount] = useState("");
  const [status, setStatus] = useState("");

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();

    const newJob = {
      clientName,
      contactInfo,
      receivedDate,
      inventoryReceived,
      file: file ? URL.createObjectURL(file) : null,
      reportedIssues,
      clientNotes,
      assignedTechnician,
      deadline,
      estimatedAmount,
      status,
    };
    setJobData([...jobData, newJob]);
    navigate("/");
  };

  return (
    <div>
      <div className="lg:w-2/4 lg:mx-auto mx-5 mt-14 h-[85vh] overflow-y-scroll">
        <div className="bg-blue-900 text-white uppercase text-center text-3xl py-4 rounded-t-lg">
          Create New Job Sheet
        </div>
        <form onSubmit={handleUpload}>
          <div className="flex flex-col py-3 gap-2">
            <span className="font-semibold">Client Name:</span>
            <input
              type="text"
              className="border-2 p-2 text-black"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
            <span className="font-semibold">Contact Info (Phone 10nos):</span>
            <input
              type="text"
              className="border-2 p-2 text-black"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
            />
            <span className="font-semibold">Received Date:</span>
            <input
              type="date"
              className="border-2 p-2 text-black"
              value={receivedDate}
              onChange={(e) => setReceivedDate(e.target.value)}
            />
            <span className="font-semibold">Inventory Received:</span>
            <input
              type="text"
              className="border-2 p-2 text-black"
              value={inventoryReceived}
              onChange={(e) => setInventoryReceived(e.target.value)}
            />
            <span className="font-semibold">
              Upload Inventory Image/Document/Video
            </span>
            <input
              type="file"
              onChange={handleFile}
              className="border-2 p-2 text-black"
            />
            <span className="font-semibold">Reported Issues:</span>
            <textarea
              className="border-2 p-2 text-black"
              value={reportedIssues}
              onChange={(e) => setReportedIssues(e.target.value)}
              cols="30"
              rows="3"
            ></textarea>
            <span className="font-semibold">Client Notes:</span>
            <textarea
              className="border-2 p-2 text-black"
              value={clientNotes}
              onChange={(e) => setClientNotes(e.target.value)}
              cols="30"
              rows="3"
            ></textarea>
            <span className="font-semibold">Assigned Technician:</span>
            <input
              type="text"
              className="border-2 p-2 text-black"
              value={assignedTechnician}
              onChange={(e) => setAssignedTechnician(e.target.value)}
            />
            <span className="font-semibold">Deadline:</span>
            <input
              type="date"
              className="border-2 p-2 text-black"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
            <span className="font-semibold">Estimated Amount:</span>
            <input
              type="text"
              className="border-2 p-2 text-black"
              value={estimatedAmount}
              onChange={(e) => setEstimatedAmount(e.target.value)}
            />
            <span className="font-semibold">Status:</span>
            <input
              type="text"
              className="border-2 p-2 text-black"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
            <button
              className="bg-blue-900 text-white mx-auto w-full py-2 rounded-md"
              type="submit"
            >
              Save Job Sheet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewJob;
