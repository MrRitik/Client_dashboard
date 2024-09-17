import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useJobContext } from "../JodContext";

const Edit = () => {
  const { index } = useParams();
  const { jobData, setJobData } = useJobContext();
  const navigate = useNavigate();

  const jobIndex = parseInt(index, 10);
  const job = jobData[jobIndex];

  const [clientName, setClientName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [receivedDate, setReceivedDate] = useState("");
  const [inventoryReceived, setInventoryReceived] = useState("");
  const [file, setFile] = useState(null);
  const [reportedIssues, setReportedIssues] = useState("");
  const [clientNotes, setClientNotes] = useState("");
  const [assignedTechnician, setAssignedTechnician] = useState("");
  const [deadline, setDeadline] = useState("");
  const [estimatedAmount, setEstimatedAmount] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (job) {
      setClientName(job.clientName);
      setContactInfo(job.contactInfo);
      setReceivedDate(job.receivedDate);
      setInventoryReceived(job.inventoryReceived);
      setFile(job.file);
      setReportedIssues(job.reportedIssues);
      setClientNotes(job.clientNotes);
      setAssignedTechnician(job.assignedTechnician);
      setDeadline(job.deadline);
      setEstimatedAmount(job.estimatedAmount);
      setStatus(job.status);
    }
  }, [job]);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedJob = {
      clientName,
      contactInfo,
      receivedDate,
      inventoryReceived,
      file,
      reportedIssues,
      clientNotes,
      assignedTechnician,
      deadline,
      estimatedAmount,
      status,
    };

    const updatedJobData = jobData.map((job, idx) =>
      idx === jobIndex ? updatedJob : job
    );

    setJobData(updatedJobData);
    navigate("/");
  };

  return (
    <div>
      <div className="lg:w-2/4 mx-5 lg:mx-auto mt-10 h-[85vh] overflow-y-scroll">
        <div className="bg-blue-900 text-white uppercase text-center text-3xl py-4 font-bold rounded-t-lg">
          Edit Job Sheet
        </div>
        <form onSubmit={handleSubmit}>
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
              Save Changes
            </button>
            <button
              className="text-blue-900 w-full mx-auto py-2 font-bold border-2"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
