import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [searchQuery, setSearchQuery] = useState('');

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/events');
      setEvents(response.data);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError('Failed to load campus events.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleRegister = async (eventId) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        alert("Please log in to register for events!");
        return;
      }

      const response = await axios.post(
        'http://localhost:3000/api/registrations/join',
        { eventId: eventId },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      if (response.status === 201) {
        alert("🎉 Successfully registered for the event!");
        fetchEvents(); 
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to register. Please try again.");
    }
  };

  const filteredEvents = events.filter((event) => {
    const matchesTitle = event.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDesc = event.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTitle || matchesDesc;
  });

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">
              Campus Events
            </h1>
            <p className="text-lg text-gray-500 font-medium">
              Discover, register, and experience what's happening.
            </p>
          </div>
     
          <div className="w-full md:w-96 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events..." 
              className="w-full pl-11 pr-4 py-3 bg-white rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all font-medium text-gray-700"
            />
          </div>
        </div>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 font-bold tracking-wide animate-pulse">Loading events...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16 bg-red-50 rounded-3xl border border-red-100">
            <div className="text-4xl mb-4">⚠️</div>
            <p className="text-red-600 font-bold text-lg">{error}</p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-3xl mb-4">📅</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-500 max-w-sm">
              {searchQuery 
                ? `We couldn't find any events matching "${searchQuery}".`
                : "Check back later for upcoming campus activities."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredEvents.map((event) => {
              
              const capacity = event.capacity || 100;
              const registered = event.registeredCount || 0;
              const isSoldOut = registered >= capacity;
              const spotsLeft = Math.max(0, capacity - registered);

              return (
                <div key={event._id} className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
               
                  {/* Image Header - Hover scaling removed */}
                  <div className="h-48 overflow-hidden bg-gray-100 relative shrink-0">
                    <img 
                      src={`http://localhost:3000${event.image}`} 
                      alt={event.title} 
                      className={`w-full h-full object-cover ${isSoldOut ? 'grayscale opacity-80' : ''}`}
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/400x200?text=Event+Flyer'; }}
                    />
                    
                    {/* Date Badge - Simplified styling */}
                    <div className="absolute top-4 right-4 bg-white px-3 py-1.5 rounded-xl shadow-sm border border-gray-100">
                      <span className="block text-[10px] font-black text-blue-600 uppercase tracking-widest text-center">
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                      </span>
                      <span className="block text-2xl font-black text-gray-900 text-center leading-none mt-0.5">
                        {new Date(event.date).getDate()}
                      </span>
                    </div>

                    {isSoldOut && (
                      <div className="absolute inset-0 bg-gray-900/40 flex items-center justify-center">
                        <span className="bg-red-600 text-white px-4 py-1.5 rounded-full font-black text-sm uppercase tracking-widest shadow-lg transform -rotate-12">
                          Sold Out
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    {event.clubId && (
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-5 h-5 rounded-full bg-blue-100 overflow-hidden shrink-0">
                          <img 
                             src={event.clubId.image ? `http://localhost:3000${event.clubId.image}` : `https://ui-avatars.com/api/?name=${event.clubId.name}&background=random`} 
                             alt="club logo" 
                             className="w-full h-full object-cover"
                             onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${event.clubId.name}&background=random`; }}
                          />
                        </div>
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-wider truncate">
                          {event.clubId.name}
                        </span>
                      </div>
                    )}

                    {/* Text classes simplified (no line clamping) */}
                    <h2 className="text-xl font-black text-gray-900 mb-2">{event.title}</h2>
                    <p className="text-gray-500 text-sm mb-6 flex-grow">{event.description}</p>

                    {/* Emojis removed from time and location */}
                    <div className="space-y-3 mt-auto mb-6">
                      <div className="flex items-center gap-3 text-sm font-bold text-gray-700 truncate bg-gray-50 px-3 py-2 rounded-lg">
                        {event.time}
                      </div>
                      <div className="flex items-center gap-3 text-sm font-bold text-gray-700 truncate bg-gray-50 px-3 py-2 rounded-lg">
                        {event.location}
                      </div>
                    </div>

                    {/* Brand New Simplified Capacity Text */}
                    <div className="mb-5 pt-4 border-t border-gray-100">
                      <p className={`text-sm font-bold ${isSoldOut ? 'text-red-500' : spotsLeft <= 10 ? 'text-orange-500' : 'text-blue-600'}`}>
                        {isSoldOut ? 'Status: Sold Out' : `Status: ${spotsLeft} spots left`}
                      </p>
                    </div>

                    {/* Simplified Button with new text */}
                    <button 
                      onClick={() => handleRegister(event._id)}
                      disabled={isSoldOut}
                      className={`w-full py-3.5 rounded-xl font-black tracking-wide transition-colors ${
                        isSoldOut 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200' 
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {isSoldOut ? 'Registrations Closed' : 'Register Now'}
                    </button>
                    
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

export default Events;