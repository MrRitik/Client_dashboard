import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useJobContext } from "../JodContext";
const Home = () => {
  const { jobData, deleteJob } = useJobContext();

  const [searchQuery, setSearchQuery] = useState("");

  const [jobsWithIds, setJobsWithIds] = useState([]);

  useEffect(() => {
    const updatedJobs = jobData.map((job, index) => ({
      ...job,
      clientId: job.clientId || generateRandomId(5),
    }));
    setJobsWithIds(updatedJobs);
  }, [jobData]);

  const generateRandomId = (length) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  };

  const handleDelete = (index) => {
    deleteJob(index);
  };

  const filteredJobs = jobsWithIds.filter((job) =>
    job.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-3">
      <div className="bg-blue-900 text-white uppercase text-center text-3xl font-semibold py-4 rounded-t-lg">
        Hardik Traders - Client Management Dashboard
      </div>
      <div className="flex py-6 gap-2">
        <input
          type="text"
          className="w-full border-gray-400 border-2 px-4"
          placeholder="Search by client Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="text-white bg-blue-900 px-5 py-2 rounded-md">
          Search
        </button>
      </div>
      <div className="flex justify-center mb-6">
        <Link to="/newjob">
          <button className="text-white bg-blue-900 px-5 py-2 rounded-md">
            New Job Sheet
          </button>
        </Link>
      </div>

      <div className="relative overflow-x-auto mt-4">
        <table className="w-full text-left rtl:text-right">
          <thead className="uppercase bg-blue-900 text-white">
            <tr>
              <th scope="col" className="px-2 py-3">
                #
              </th>
              <th scope="col" className="px-2 py-3">
                Client Id
              </th>
              <th scope="col" className="px-2 py-3">
                Client Name
              </th>
              <th scope="col" className="px-2 py-3">
                Contact Info
              </th>
              <th scope="col" className="px-2 py-3">
                Received Date
              </th>
              <th scope="col" className="px-2 py-3">
                Inventory Received
              </th>
              <th scope="col" className="px-2 py-3">
                Reported Issues
              </th>
              <th scope="col" className="px-2 py-3">
                Client Notes
              </th>
              <th scope="col" className="px-2 py-3">
                Assigned Technician
              </th>
              <th scope="col" className="px-2 py-3">
                Estimated Amount
              </th>
              <th scope="col" className="px-2 py-3">
                Deadline
              </th>
              <th scope="col" className="px-2 py-3">
                Status
              </th>
              <th scope="col" className="px-2 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs && filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => (
                <tr key={index} className="bg-white border-b">
                  <td className="px-2 py-3">{index + 1}</td>
                  <td className="px-2 py-3">{job.clientId}</td>
                  <td className="px-2 py-3">{job.clientName}</td>
                  <td className="px-2 py-3">{job.contactInfo}</td>
                  <td className="px-2 py-3">{job.receivedDate}</td>
                  <td className="px-2 py-3">{job.inventoryReceived}</td>
                  <td className="px-2 py-3">{job.reportedIssues}</td>
                  <td className="px-2 py-3">{job.clientNotes}</td>
                  <td className="px-2 py-3">{job.assignedTechnician}</td>
                  <td className="px-2 py-3">{job.estimatedAmount}</td>
                  <td className="px-2 py-3">{job.deadline}</td>
                  <td className="px-2 py-3">{job.status}</td>
                  <td className="px-2 py-3 flex gap-2">
                    <Link to={`/viewjob/${index}`}>
                      <button className="bg-blue-800 text-white px-1">
                        View
                      </button>
                    </Link>
                    <Link to={`/edit/${index}`}>
                      <button className="bg-orange-500 text-white px-1">
                        Edit
                      </button>
                    </Link>
                    <button
                      className="bg-red-600 text-white px-1"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-white border-b">
                <td colSpan="13" className="px-2 py-3 text-center">
                  No jobs available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="bg-blue-900 text-white text-center py-2 rounded-b-lg">
        &copy; 2024 Hardik Traders
      </div>
    </div>
  );
};

export default Home;
