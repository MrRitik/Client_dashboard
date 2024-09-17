// JobContext.jsx
import React, { createContext, useContext, useState } from "react";

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobData, setJobData] = useState([]);

  const deleteJob = (index) => {
    setJobData(jobData.filter((_, i) => i !== index));
  };

  return (
    <JobContext.Provider value={{ jobData, setJobData, deleteJob }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => useContext(JobContext);
