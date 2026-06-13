import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/events');
        setEvents(response.data);
        if (response.data.length > 0) {
          setSelectedEvent(response.data[0]._id);
        }
      } catch (err) {
        console.error("Failed to load events", err);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    if (!selectedEvent) return;

    const fetchAttendees = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3000/api/registrations/event/${selectedEvent}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAttendees(response.data);
        setError('');
      } catch (err) {
        setError('Failed to fetch guest list. Make sure you are logged in as an Admin.');
        setAttendees([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendees();
  }, [selectedEvent]);

  const handleCheckIn = async (ticketId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:3000/api/registrations/checkin', 
        { ticketId }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAttendees(attendees.map(attendee => 
        attendee._id === ticketId ? { ...attendee, status: 'Attended' } : attendee
      ));

    } catch (err) {
      alert(err.response?.data?.message || 'Failed to check in student');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Admin Check-in</h1>
            <p className="text-gray-500 font-medium mt-1">Manage event access and digital guest lists.</p>
          </div>
          
          <div className="w-full md:w-72">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Select Event Door</label>
            <select 
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 font-bold text-gray-700"
            >
              {events.map(evt => (
                <option key={evt._id} value={evt._id}>{evt.title}</option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl font-bold mb-6 border border-red-100">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-10 text-center font-bold text-gray-400">Loading guest list...</div>
          ) : attendees.length === 0 ? (
            <div className="p-10 text-center font-bold text-gray-400">No students registered for this event yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="p-4 text-xs font-black text-gray-500 uppercase tracking-wider">Student</th>
                    <th className="p-4 text-xs font-black text-gray-500 uppercase tracking-wider">Ticket ID</th>
                    <th className="p-4 text-xs font-black text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="p-4 text-xs font-black text-gray-500 uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {attendees.map((ticket) => (
                    <tr key={ticket._id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <p className="font-bold text-gray-900">{ticket.studentId?.name || 'Unknown Student'}</p>
                        <p className="text-sm text-gray-500">{ticket.studentId?.email}</p>
                      </td>
                      <td className="p-4 font-mono text-xs text-gray-500">
                        {ticket._id}
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          ticket.status === 'Attended' ? 'bg-green-100 text-green-700' : 'bg-blue-50 text-blue-700'
                        }`}>
                          {ticket.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleCheckIn(ticket._id)}
                          disabled={ticket.status === 'Attended'}
                          className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm ${
                            ticket.status === 'Attended' 
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                              : 'bg-gray-900 text-white hover:bg-gray-800'
                          }`}
                        >
                          {ticket.status === 'Attended' ? 'Checked In' : 'Mark Attended'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;