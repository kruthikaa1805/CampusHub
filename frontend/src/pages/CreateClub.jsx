import React, { useState } from 'react';
import axios from 'axios';

const CreateClub = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Technology',
    presidentName: ''
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

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

    const dataToSend = new FormData();
    dataToSend.append('name', formData.name);
    dataToSend.append('description', formData.description);
    dataToSend.append('category', formData.category);
    dataToSend.append('presidentName', formData.presidentName);
    
    if (imageFile) {
      dataToSend.append('image', imageFile);
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/api/clubs/create', dataToSend, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` 
        }
      });

      if (response.status === 201) {
        setMessage({ type: 'success', text: 'Club registered successfully! It is now visible in the directory.' });
        setFormData({ name: '', description: '', category: 'Technology', presidentName: '' });
        setImageFile(null);
        e.target.reset(); 
      }
    } catch (error) {
      console.error("Upload error:", error);
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to create club. Please check your inputs.' 
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
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Register Campus Club</h1>
          <p className="text-gray-500 font-medium mt-2">Create a new student organization and start building your community.</p>
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
              <label className={labelStyles}>Club Name</label>
              <input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="e.g., Coding Club" className={inputStyles} />
            </div>
            <div>
              <label className={labelStyles}>Category</label>
              <select name="category" required value={formData.category} onChange={handleInputChange} className={inputStyles}>
                <option value="Technology">Technology</option>
                <option value="Cultural & Arts">Cultural & Arts</option>
                <option value="Sports & Fitness">Sports & Fitness</option>
                <option value="General">General</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelStyles}>President / Lead Organizer</label>
            <input type="text" name="presidentName" required value={formData.presidentName} onChange={handleInputChange} placeholder="Who is leading this club?" className={inputStyles} />
          </div>

          <div>
            <label className={labelStyles}>Club Description</label>
            <textarea name="description" required rows="4" value={formData.description} onChange={handleInputChange} placeholder="What is the mission and purpose of this club?" className={`${inputStyles} resize-none`} />
          </div>

          <div>
            <label className={labelStyles}>Club Logo</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group relative">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400 group-hover:text-blue-500 transition-colors" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600 justify-center">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-transparent rounded-md font-bold text-blue-600 hover:text-blue-500 focus-within:outline-none">
                    <span>Upload a logo</span>
                    <input id="file-upload" name="file-upload" type="file" accept="image/*" required onChange={handleFileChange} className="sr-only" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  {imageFile ? imageFile.name : "PNG, JPG up to 5MB"}
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
                  Publishing Club...
                </>
              ) : (
                'Publish Club'
              )}
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default CreateClub;