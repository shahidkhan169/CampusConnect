// AlumniHomePage.jsx
import React from 'react';

const AlumniHomePage = () => {
  // Sample data - in a real app, this would come from props or API
  const alumniName = "Alex Johnson";
  const alumniCompany = "Google";
  const alumniRole = "Senior Software Engineer";
  const alumniBatch = "2018";
  const alumniDepartment = "Computer Science";
  
  const sharedExperiences = [
    { 
      id: 1, 
      company: "Meta", 
      role: "Software Engineer", 
      batch: "2022",
      department: "Computer Science",
      title: "Meta Interview Experience - SWE Role 2022", 
      dateShared: "Oct 12, 2023",
      views: 240,
      likes: 32
    },
    { 
      id: 2, 
      company: "Amazon", 
      role: "SDE Intern", 
      batch: "2023",
      department: "Information Technology",
      title: "Amazon Internship Interview Process", 
      dateShared: "Sep 28, 2023",
      views: 187,
      likes: 28
    },
  ];

  const upcomingEvents = [
    { 
      id: 1, 
      title: 'Career Guidance Session for Juniors', 
      date: 'Oct 25, 2023', 
      time: '2:00 PM - 4:00 PM', 
      location: 'Main Auditorium, Kongu Engineering College',
      description: "Sharing insights on job market trends and interview preparation."
    },
    { 
      id: 2, 
      title: 'Alumni Meet: Tech Industry Networking', 
      date: 'Nov 5, 2023', 
      time: '5:00 PM - 7:00 PM', 
      location: 'Conference Hall, CSE Department',
      description: "Connect with fellow alumni working in tech companies."
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed w-64 h-screen bg-gradient-to-b from-indigo-800 to-indigo-900 text-white p-5 shadow-lg overflow-y-auto">
        <div className="mb-8 pt-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-100">
              Campus Connect
            </h2>
          </div>
        </div>

        <nav className="space-y-1">
          <div className="flex items-center p-3 rounded-lg bg-gradient-to-r from-indigo-700/30 to-blue-700/30 backdrop-blur-sm border border-indigo-600/30">
            <div className="w-8 h-8 rounded-md bg-indigo-600/30 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span className="font-medium text-gray-100">Dashboard</span>
          </div>

          <div className="flex items-center p-3 rounded-lg hover:bg-indigo-700/30 backdrop-blur-sm border border-transparent hover:border-indigo-600/30 cursor-pointer transition-all duration-200 group">
            <div className="w-8 h-8 rounded-md bg-indigo-800/30 flex items-center justify-center mr-3 group-hover:bg-indigo-600/40 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span className="font-medium text-gray-300 group-hover:text-white">My Profile</span>
          </div>

          <div className="flex items-center p-3 rounded-lg hover:bg-indigo-700/30 backdrop-blur-sm border border-transparent hover:border-indigo-600/30 cursor-pointer transition-all duration-200 group">
            <div className="w-8 h-8 rounded-md bg-indigo-800/30 flex items-center justify-center mr-3 group-hover:bg-indigo-600/40 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="font-medium text-gray-300 group-hover:text-white">My Events</span>
          </div>

          <div className="flex items-center p-3 rounded-lg hover:bg-indigo-700/30 backdrop-blur-sm border border-transparent hover:border-indigo-600/30 cursor-pointer transition-all duration-200 group">
            <div className="w-8 h-8 rounded-md bg-indigo-800/30 flex items-center justify-center mr-3 group-hover:bg-indigo-600/40 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="font-medium text-gray-300 group-hover:text-white">My Experiences</span>
          </div>

          <div className="flex items-center p-3 rounded-lg hover:bg-red-700/30 backdrop-blur-sm border border-transparent hover:border-red-600/30 cursor-pointer transition-all duration-200 group mt-10">
            <div className="w-8 h-8 rounded-md bg-red-800/30 flex items-center justify-center mr-3 group-hover:bg-red-600/40 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-red-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <span className="font-medium text-gray-300 group-hover:text-red-200">Logout</span>
          </div>
        </nav>

        {/* User Profile Section */}
        <div className="absolute bottom-5 left-5 right-5">
          <div className="flex items-center p-3 rounded-lg bg-indigo-800/40 backdrop-blur-sm border border-indigo-700/50">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md">
              AJ
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-100">{alumniName}</p>
              <p className="text-xs text-indigo-300">{alumniRole}, {alumniCompany}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8 overflow-y-auto">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-blue-600 flex items-center justify-center text-white text-xl font-bold">
                AJ
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Welcome back, {alumniName}!</h1>
                <p className="text-gray-600">Batch of {alumniBatch} • {alumniDepartment}</p>
              </div>
            </div>
            
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-indigo-100 text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-800">Google</h3>
                <p className="text-gray-600">Current Company</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-100 text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-800">12</h3>
                <p className="text-gray-600">Experiences Shared</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-amber-100 text-amber-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-800">4</h3>
                <p className="text-gray-600">Upcoming Events</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* My Interview Experiences */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">My Interview Experiences</h2>
                <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {sharedExperiences.map(experience => (
                  <div key={experience.id} className="border border-gray-200 rounded-lg p-5 hover:border-indigo-300 transition-colors">
                    <div className="flex justify-between">
                      <h3 className="font-bold text-gray-800 text-lg">{experience.title}</h3>
                      <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                        {experience.company}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center text-sm text-gray-600 mt-2 gap-3">
                      <span>{experience.role}</span>
                      <span>•</span>
                      <span>Batch: {experience.batch}</span>
                      <span>•</span>
                      <span>{experience.department}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-3">
                      <span>Shared on {experience.dateShared}</span>
                    </div>
                    <div className="flex items-center space-x-4 mt-4">
                      <div className="flex items-center text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span>{experience.views}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>{experience.likes}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Upcoming Events</h2>
                <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
                    <h3 className="font-bold text-gray-800">{event.title}</h3>
                    <p className="text-sm text-gray-600 mt-2">{event.description}</p>
                    <div className="flex items-center text-sm text-gray-600 mt-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{event.date} at {event.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{event.location}</span>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
              
              <div className="space-y-3">
                <button className="w-full flex items-center p-3 text-left rounded-lg hover:bg-indigo-50 transition-colors">
                  <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-700">Edit Profile</span>
                </button>
                
                <button className="w-full flex items-center p-3 text-left rounded-lg hover:bg-indigo-50 transition-colors">
                  <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-700">My Events</span>
                </button>
                
                <button className="w-full flex items-center p-3 text-left rounded-lg hover:bg-indigo-50 transition-colors">
                  <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-700">My Experiences</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniHomePage;