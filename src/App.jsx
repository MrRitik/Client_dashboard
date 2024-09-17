// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import NewJob from "./components/NewJob";
import ViewJob from "./components/ViewJob";
import { JobProvider } from "./JodContext";
import Edit from "./components/Edit";

const App = () => {
  return (
    <Router>
      <JobProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/newjob" element={<NewJob />} />
          <Route path="/viewjob/:index" element={<ViewJob />} />
          <Route path="/edit/:index" element={<Edit />} />
        </Routes>
      </JobProvider>
    </Router>
  );
};

export default App;
