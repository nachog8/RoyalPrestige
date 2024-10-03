import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import TaskList from './pages/TaskList';
import TeamMembers from './pages/TeamMembers';
import Profile from './pages/Profile';
import Catalog from './pages/Catalog';
import Quotation from './pages/Quotation';

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen bg-gray-100">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/tasks" element={<TaskList />} />
              <Route path="/team" element={<TeamMembers />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/quotation" element={<Quotation />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;