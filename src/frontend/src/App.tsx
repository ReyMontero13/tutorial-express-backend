// src/App.tsx
import UserList from "./components/UserList";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          {/* Add other routes here */}
          <Route path="/users" element={<UserList />} />
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/users/:id" element={<>jjjjj</>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
