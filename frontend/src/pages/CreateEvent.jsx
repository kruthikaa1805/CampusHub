import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateEvent = () => {
  const [clubs, setClubs] = useState([]);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    clubId: '',
    capacity: '' 
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await axios.get(' https://campus-hub-backend-wz09.onrender.com/api/clubs');
        const clubsArray = Array.isArray(response.data) 
          ? response.data 
          : response.data.clubs || response.data.data || [];
        setClubs(clubsArray);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };
    fetchClubs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    if (!formData.clubId) {
      setMessage({ type: 'error', text: 'Please select a hosting club.' });
      setLoading(false);
      return;
    }

    const dataToSend = new FormData();
    dataToSend.append('title', formData.title);
    dataToSend.append('description', formData.description);
    dataToSend.append('date', formData.date);
    dataToSend.append('time', formData.time);
    dataToSend.append('location', formData.location);
    dataToSend.append('clubId', formData.clubId);
    dataToSend.append('capacity', formData.capacity || 100); 
    
    if (imageFile) {
      dataToSend.append('image', imageFile);
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(' https://campus-hub-backend-wz09.onrender.com/api/events/create', dataToSend, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` 
        }
      });

      if (response.status === 201) {
        setMessage({ type: 'success', text: 'Event published successfully! It is now live on the platform.' });
        setFormData({ title: '', description: '', date: '', time: '', location: '', clubId: '', capacity: '' });
        setImageFile(null);
        e.target.reset(); 
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to create event. Please verify your details.' 
      });
    } finally {
      setLoading(false);
      if (message.type === 'success') {
        setTimeout(() => setMessage({ type: '', text: '' }), 5000);
      }
    }
  };

  const inputStyles = "w-full px-5 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all font-medium text-gray-900";
  const labelStyles = "block text-xs font-black text-gray-500 uppercase tracking-wider mb-2";

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-12 flex items-center justify-center px-4">
      <div className="bg-white max-w-2xl w-full rounded-[2rem] shadow-sm border border-gray-100 p-8 md:p-12">
        
        <div className="mb-8 text-center">
          {/* Emoji container removed */}
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Publish Campus Event</h1>
          <p className="text-gray-500 font-medium mt-2">Fill out the details below to broadcast your event to the campus.</p>
        </div>

        {message.text && (
          <div className={`p-4 rounded-xl flex items-start gap-3 mb-8 border ${
            message.type === 'success' ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'
          }`}>
            <span className="text-lg">{message.type === 'success' ? '✅' : '⚠️'}</span>
            <p className="text-sm font-bold pt-0.5">{message.text}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelStyles}>Event Title</label>
              <input type="text" name="title" required value={formData.title} onChange={handleInputChange} placeholder="e.g., Tech Summit 2026" className={inputStyles} />
            </div>
            <div>
              <label className={labelStyles}>Hosting Club</label>
              <select name="clubId" required value={formData.clubId} onChange={handleInputChange} className={inputStyles}>
                <option value="" disabled>Select a club...</option>
                {Array.isArray(clubs) && clubs.map((club) => (
                  <option key={club._id} value={club._id}>{club.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className={labelStyles}>Date</label>
              <input type="date" name="date" required value={formData.date} onChange={handleInputChange} className={inputStyles} />
            </div>
            <div>
              <label className={labelStyles}>Time</label>
              <input type="time" name="time" required value={formData.time} onChange={handleInputChange} className={inputStyles} />
            </div>
            <div>
              <label className={labelStyles}>Capacity (Tickets)</label>
              <input type="number" min="1" name="capacity" required value={formData.capacity} onChange={handleInputChange} placeholder="e.g., 100" className={inputStyles} />
            </div>
          </div>

          <div>
            <label className={labelStyles}>Location</label>
            <input type="text" name="location" required value={formData.location} onChange={handleInputChange} placeholder="e.g., NITW Main Auditorium" className={inputStyles} />
          </div>

          <div>
            <label className={labelStyles}>Event Description</label>
            <textarea name="description" required rows="4" value={formData.description} onChange={handleInputChange} placeholder="What will happen at this event?" className={`${inputStyles} resize-none`} />
          </div>

          <div>
            <label className={labelStyles}>Event Flyer</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group relative">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400 group-hover:text-blue-500 transition-colors" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600 justify-center">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-transparent rounded-md font-bold text-blue-600 hover:text-blue-500 focus-within:outline-none">
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" accept="image/*" required onChange={handleFileChange} className="sr-only" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  {imageFile ? imageFile.name : "PNG, JPG, GIF up to 5MB"}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit" 
              disabled={loading} 
              className={`w-full flex items-center justify-center py-4 rounded-xl font-black text-lg tracking-wide transition-all shadow-sm ${
                loading 
                  ? 'bg-blue-400 text-white cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md active:scale-[0.98]'
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Publishing Event...
                </>
              ) : (
                'Publish Event'
              )}
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;