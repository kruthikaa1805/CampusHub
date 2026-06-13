import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const token = localStorage.getItem('token');

  return (
    <div className="min-h-[calc(100vh-64px)] bg-white flex flex-col">
 
      <main className="flex-grow flex items-center justify-center relative overflow-hidden px-6 py-20">
        
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block mb-6 px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full">
            <span className="text-sm font-bold text-blue-600 tracking-wide uppercase">
              Welcome to CampusHub
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-tight mb-8">
            Your Campus Life, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              Simplified.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-500 font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
            Discover upcoming events, join dynamic student clubs, and manage your digital boarding passes all in one place. 
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {token ? (
              <Link 
                to="/events" 
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-sm hover:shadow-md text-lg"
              >
                Browse Events
              </Link>
            ) : (
              <>
                <Link 
                  to="/register" 
                  className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-sm hover:shadow-md text-lg"
                >
                  Join CampusHub
                </Link>
                <Link 
                  to="/events" 
                  className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 transition-all shadow-sm text-lg"
                >
                  Explore Events
                </Link>
              </>
            )}
          </div>
        </div>
      </main>

  
      <section className="bg-gray-50 border-t border-gray-100 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-inner">
                🎉
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">Discover Events</h3>
              <p className="text-gray-500 font-medium leading-relaxed">
                Never miss out on what's happening. From hackathons to open mics, find out exactly what is going on around campus.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-inner">
                🎟️
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">Digital Passes</h3>
              <p className="text-gray-500 font-medium leading-relaxed">
                Say goodbye to paper tickets. Register with one click and access your digital boarding passes right from your phone.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-inner">
                🤝
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">Student Clubs</h3>
              <p className="text-gray-500 font-medium leading-relaxed">
                Find your community. Explore technical, cultural, and sports clubs and connect with like-minded students.
              </p>
            </div>

          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-gray-100 py-8 text-center">
        <p className="text-gray-400 font-bold text-sm">
          Built for NITW • CampusHub &copy; {new Date().getFullYear()}
        </p>
      </footer>

    </div>
  );
};

export default Home;