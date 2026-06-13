import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';

const Clubs = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/clubs');
        setClubs(response.data.clubs);
      } catch (err) {
        console.error("Error fetching clubs:", err);
        setError('Failed to load campus clubs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  const filteredClubs = clubs.filter((club) => {
    const matchesName = club.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = club.category?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesName || matchesCategory;
  });

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">
              Club Directory
            </h1>
            <p className="text-lg text-gray-500 font-medium">
              Discover and join student organizations across campus.
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
              placeholder="Search clubs or categories..." 
              className="w-full pl-11 pr-4 py-3 bg-white rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all font-medium text-gray-700"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 font-bold tracking-wide animate-pulse">Loading clubs...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16 bg-red-50 rounded-3xl border border-red-100">
            <div className="text-4xl mb-4">⚠️</div>
            <p className="text-red-600 font-bold text-lg">{error}</p>
          </div>
        ) : filteredClubs.length === 0 ? (
          
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-3xl mb-4">
              🔍
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No clubs found</h3>
            <p className="text-gray-500 max-w-sm">
              {searchQuery 
                ? `We couldn't find any clubs matching "${searchQuery}". Try a different term.`
                : "There are no clubs registered in the database yet."}
            </p>
          </div>
        ) : (
  
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredClubs.map((club) => (
              <Card 
                key={club._id}
                category={club.category || "General"}
                title={club.name}
                description={club.description}
                authorName={club.presidentName || "Club President"}
                date="Active"
                image={club.image}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Clubs;