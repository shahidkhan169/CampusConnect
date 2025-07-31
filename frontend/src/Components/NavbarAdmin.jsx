import React from 'react';
import { useNavigate } from 'react-router-dom';

function NavbarAdmin({ firstName, lastName, role = "Administrator" }) {

  return (
    <div className="fixed w-64 h-screen bg-gradient-to-b from-slate-800 via-slate-900 to-slate-900 text-white p-5 shadow-2xl overflow-y-auto z-50">
      {/* Logo Section */}
      <div className="mb-8 pt-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-100">Campus Connect</h2>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-1">
        {/* Dashboard */}
        <div
          className="flex items-center p-3 rounded-lg bg-gradient-to-r from-purple-700/20 to-pink-700/20 backdrop-blur-sm border border-purple-600/20 shadow-sm cursor-pointer"
        >
          <div className="w-8 h-8 rounded-md bg-purple-600/20 flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <span className="font-medium text-gray-100">Dashboard</span>
        </div>

        {/* Manage Students */}
        <div
          className="flex items-center p-3 rounded-lg hover:bg-slate-700/50 backdrop-blur-sm border border-transparent hover:border-slate-600/30 cursor-pointer transition-all duration-200 group"
        >
          <div className="w-8 h-8 rounded-md bg-slate-700/50 flex items-center justify-center mr-3 group-hover:bg-purple-600/30 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <span className="font-medium text-gray-300 group-hover:text-white">Manage Alumini</span>
        </div>

        {/* Manage Companies */}
        <div
          className="flex items-center p-3 rounded-lg hover:bg-slate-700/50 backdrop-blur-sm border border-transparent hover:border-slate-600/30 cursor-pointer transition-all duration-200 group"
        >
          <div className="w-8 h-8 rounded-md bg-slate-700/50 flex items-center justify-center mr-3 group-hover:bg-purple-600/30 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h6m-6 4h6m-6 4h6" />
            </svg>
          </div>
          <span className="font-medium text-gray-300 group-hover:text-white">Manage Companies</span>
        </div>

        {/* Placement Reports */}
        <div
          className="flex items-center p-3 rounded-lg hover:bg-slate-700/50 backdrop-blur-sm border border-transparent hover:border-slate-600/30 cursor-pointer transition-all duration-200 group"
        >
          <div className="w-8 h-8 rounded-md bg-slate-700/50 flex items-center justify-center mr-3 group-hover:bg-purple-600/30 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <span className="font-medium text-gray-300 group-hover:text-white">Reports & Analytics</span>
        </div>

        {/* Webinars & Events */}
        <div
          className="flex items-center p-3 rounded-lg hover:bg-slate-700/50 backdrop-blur-sm border border-transparent hover:border-slate-600/30 cursor-pointer transition-all duration-200 group"
        >
          <div className="w-8 h-8 rounded-md bg-slate-700/50 flex items-center justify-center mr-3 group-hover:bg-purple-600/30 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="font-medium text-gray-300 group-hover:text-white">Events & Webinars</span>
        </div>

        {/* Settings */}
        <div
          className="flex items-center p-3 rounded-lg hover:bg-slate-700/50 backdrop-blur-sm border border-transparent hover:border-slate-600/30 cursor-pointer transition-all duration-200 group mt-10"
        >
          <div className="w-8 h-8 rounded-md bg-slate-700/50 flex items-center justify-center mr-3 group-hover:bg-blue-600/30 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span className="font-medium text-gray-300 group-hover:text-white">Settings</span>
        </div>

        {/* Logout */}
        <div
          onClick={() => {
            // Add logout logic here (e.g., clear token, redirect)
            localStorage.removeItem("adminToken");
          }}
          className="flex items-center p-3 rounded-lg hover:bg-slate-700/50 backdrop-blur-sm border border-transparent hover:border-red-600/30 cursor-pointer transition-all duration-200 group"
        >
          <div className="w-8 h-8 rounded-md bg-slate-700/50 flex items-center justify-center mr-3 group-hover:bg-red-600/30 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
          <span className="font-medium text-gray-300 group-hover:text-red-200">Logout</span>
        </div>
      </nav>

      {/* Admin Profile Section */}
      <div className="absolute bottom-5 left-5 right-5">
        <div className="flex items-center p-3 rounded-lg bg-slate-800/60 backdrop-blur-sm border border-slate-700/50">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-semibold shadow-md">

          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-100">{firstName} {lastName}</p>
            <p className="text-xs text-gray-400 capitalize">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarAdmin;