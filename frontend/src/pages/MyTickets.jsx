import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyTickets = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError("Please log in to view your tickets.");
          setLoading(false);
          return;
        }

        const response = await axios.get(' https://campus-hub-backend-wz09.onrender.com/api/registrations/my-tickets', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setTickets(response.data);
      } catch (err) {
        console.error("Error fetching tickets:", err);
        setError("Failed to load your tickets. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyTickets();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-blue-50 flex items-center justify-center font-bold text-gray-500">Loading your digital passes...</div>;
  }

  return (
    <div className="min-h-screen bg-blue-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-10">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">My Tickets</h1>
          <p className="text-gray-500 font-medium">Your digital passes for upcoming campus events.</p>
        </div>

        {error ? (
          <div className="bg-red-50 text-red-600 p-6 rounded-2xl font-bold border border-red-100 text-center">
            {error}
          </div>
        ) : tickets.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl shadow-sm text-center border border-gray-100 flex flex-col items-center">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-3xl mb-4">
              🎟️
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No tickets yet</h3>
            <p className="text-gray-500 mb-6">You haven't registered for any events. Discover what's happening on campus!</p>
            <Link to="/events" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-sm">
              Browse Events
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tickets.map((ticket) => {
              if (!ticket.eventId) return null;

              const event = ticket.eventId;
              const isAttended = ticket.status === 'Attended';

              return (
                <div key={ticket._id} className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col overflow-hidden relative group">
                  
                  {/* Image Section */}
                  <div className="h-48 overflow-hidden bg-gray-100 relative shrink-0">
                    <img 
                      src={` https://campus-hub-backend-wz09.onrender.com${event.image}`} 
                      alt={event.title} 
                      className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${isAttended ? 'grayscale opacity-70' : ''}`}
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/400x200?text=Event+Flyer'; }}
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <h2 className="absolute bottom-4 left-5 right-5 text-xl font-black text-white truncate drop-shadow-md">
                      {event.title}
                    </h2>
                  </div>

                  {/* Details Section */}
                  <div className="p-5 flex-grow flex flex-col gap-4 bg-white relative">
                    {/* Decorative ticket cutouts */}
                    <div className="absolute -left-3 top-0 -translate-y-1/2 w-6 h-6 bg-blue-50 rounded-full border-b border-r border-gray-100 shadow-inner"></div>
                    <div className="absolute -right-3 top-0 -translate-y-1/2 w-6 h-6 bg-blue-50 rounded-full border-b border-l border-gray-100 shadow-inner"></div>

                    {/* Date and Venue (QR Code removed, spacing simplified) */}
                    <div className="mt-2 space-y-3 w-full">
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Date & Time</p>
                        <p className="font-bold text-gray-900 text-sm">
                          {new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} at {event.time}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Venue</p>
                        <p className="font-bold text-gray-900 text-sm line-clamp-1">{event.location}</p>
                      </div>
                    </div>
                  </div>

                  {/* Footer Section (Ticket ID & Status) */}
                  <div className="border-t-2 border-dashed border-gray-200 bg-gray-50 px-5 py-3 flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Ticket ID</span>
                      <span className="font-mono text-xs text-gray-600 truncate max-w-[150px]">
                        {ticket._id}
                      </span>
                    </div>
                    
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm ${
                      isAttended 
                        ? 'bg-gray-200 text-gray-600' 
                        : 'bg-green-100 text-green-700 border border-green-200'
                    }`}>
                      {ticket.status}
                    </span>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTickets;