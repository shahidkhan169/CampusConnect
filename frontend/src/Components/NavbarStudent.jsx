import React from 'react';
import { useNavigate } from 'react-router-dom';



function NavbarStudent({firstName,lastName,departmant}) {
    const navigate=useNavigate();
    return (
        <div className="fixed w-64 h-screen bg-gradient-to-b from-slate-800 via-slate-900 to-slate-900 text-white p-5 shadow-2xl overflow-y-auto z-50">
            {/* Logo Section */}
            <div className="mb-8 pt-4">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-100">
                        Campus Connect
                    </h2>
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-1">
                <div onClick={()=>{navigate("/student/home")}} className="flex items-center p-3 rounded-lg bg-gradient-to-r from-blue-700/20 to-indigo-700/20 backdrop-blur-sm border border-blue-600/20 shadow-sm">
                    <div className="w-8 h-8 rounded-md bg-blue-600/20 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                    </div>
                    <span className="font-medium text-gray-100">Dashboard</span>
                </div>

                <div onClick={()=>{navigate("/student/profile")}} className="flex items-center p-3 rounded-lg hover:bg-slate-700/50 backdrop-blur-sm border border-transparent hover:border-slate-600/30 cursor-pointer transition-all duration-200 group" >
                    <div  className="w-8 h-8 rounded-md bg-slate-700/50 flex items-center justify-center mr-3 group-hover:bg-blue-600/30 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <span className="font-medium text-gray-300 group-hover:text-white"  >My Profile</span>
                </div>

                <div className="flex items-center p-3 rounded-lg hover:bg-slate-700/50 backdrop-blur-sm border border-transparent hover:border-slate-600/30 cursor-pointer transition-all duration-200 group">
                    <div className="w-8 h-8 rounded-md bg-slate-700/50 flex items-center justify-center mr-3 group-hover:bg-blue-600/30 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <span className="font-medium text-gray-300 group-hover:text-white">Appointments</span>
                </div>

                <div className="flex items-center p-3 rounded-lg hover:bg-slate-700/50 backdrop-blur-sm border border-transparent hover:border-slate-600/30 cursor-pointer transition-all duration-200 group">
                    <div className="w-8 h-8 rounded-md bg-slate-700/50 flex items-center justify-center mr-3 group-hover:bg-blue-600/30 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <span className="font-medium text-gray-300 group-hover:text-white">Events</span>
                </div>

                <div className="flex items-center p-3 rounded-lg hover:bg-slate-700/50 backdrop-blur-sm border border-transparent hover:border-slate-600/30 cursor-pointer transition-all duration-200 group mt-10">
                    <div className="w-8 h-8 rounded-md bg-slate-700/50 flex items-center justify-center mr-3 group-hover:bg-red-600/30 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </div>
                    <span className="font-medium text-gray-300 group-hover:text-red-200">Logout</span>
                </div>
            </nav>

            {/* User Profile Section */}
            <div className="absolute bottom-5 left-5 right-5">
                <div className="flex items-center p-3 rounded-lg bg-slate-800/60 backdrop-blur-sm border border-slate-700/50">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-semibold shadow-md">
                        {firstName.charAt(0)}
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-100">{firstName} {lastName}</p>
                        <p className="text-xs text-gray-400">{departmant    }</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavbarStudent;