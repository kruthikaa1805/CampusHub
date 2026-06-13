import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    } else {
      setToken(null);
      setUser(null);
    }
  }, [location]);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
     
        <Link to="/" className="text-2xl font-black text-blue-600 tracking-tight">
          CampusHub
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className={`text-sm font-bold transition-colors ${isActive('/') ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Home
          </Link>
          <Link 
            to="/clubs" 
            className={`text-sm font-bold transition-colors ${isActive('/clubs') ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Clubs
          </Link>
          <Link 
            to="/events" 
            className={`text-sm font-bold transition-colors ${isActive('/events') ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Events
          </Link>

          {token && user?.role === 'admin' ? (
            <>
              <Link 
                to="/admin" 
                className={`text-sm font-bold transition-colors ${isActive('/admin') ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
              >
                Dashboard
              </Link>
              <Link 
                to="/create-event" 
                className={`text-sm font-bold transition-colors ${isActive('/create-event') ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
              >
                + Event
              </Link>
              <Link 
                to="/create-club" 
                className={`text-sm font-bold transition-colors ${isActive('/create-club') ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
              >
                + Club
              </Link>
            </>
          ) : token && user?.role === 'student' ? (
            <Link 
              to="/my-tickets" 
              className={`text-sm font-bold transition-colors ${isActive('/my-tickets') ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
            >
              My Tickets
            </Link>
          ) : null}
        </div>

        <div className="flex items-center gap-4">
          {token && user ? (
            <>
              <span className="text-sm font-bold text-gray-900 hidden sm:block">
                Hi, {user.name.split(' ')[0]}
              </span>
              <button 
                onClick={handleSignOut}
                className="text-sm font-bold text-red-600 hover:text-red-700 transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="text-sm font-bold text-gray-600 hover:text-gray-900"
              >
                Log In
              </Link>
              <Link 
                to="/register" 
                className="bg-blue-600 text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;