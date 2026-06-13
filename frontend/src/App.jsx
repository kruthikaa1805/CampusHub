import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Clubs from './pages/Clubs';
import Events from './pages/Events';
import Register from './pages/Register';
import CreateClub from './pages/CreateClub';
import CreateEvent from './pages/CreateEvent';
import MyTickets from './pages/MyTickets';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/events" element={<Events />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-club" element={<CreateClub />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/my-tickets" element={<MyTickets />} />
          <Route path="/admin" element={<AdminDashboard />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;