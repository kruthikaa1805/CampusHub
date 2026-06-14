import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const cleanEmail = formData.email.trim()
    console.log("Sanitized Email Check ->", `"${cleanEmail}"`);
    const isValidEmail = cleanEmail.endsWith('@nitw.ac.in') || cleanEmail.endsWith('@student.nitw.ac.in');
    if (!isValidEmail) {
      setError('Registration is restricted to valid NITW email addresses.');
      return; 
    }

    setLoading(true);

    try {
      const response = await axios.post('https://campus-hub-backend-wz09.onrender.com/api/auth/register', {
        name: formData.name.trim(),
        email: cleanEmail, 
        password: formData.password
      });

      alert('Account created successfully! Please log in.');
      navigate('/login');

    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-73px)] bg-blue-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        
        <div className="flex flex-col items-center mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-md rotate-45 flex items-center justify-center mb-6 shadow-sm">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Create an account</h2>
          <p className="text-sm text-gray-500 mt-2">Exclusive to NITW students</p>
        </div>

        {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm font-bold rounded-lg">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Kruthika Reddy" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Campus Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="student@student.nitw.ac.in" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Create a strong password" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 mt-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-sm disabled:bg-gray-400"
          >
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-8 font-medium">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 font-bold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;