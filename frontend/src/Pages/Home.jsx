import React from 'react';
import Navbar from '../Components/Navbar';

const HomePage = () => {
  // Sample company data
  const companies = [
    { id: 1, name: 'Google', logo: 'https://placehold.co/100x100/4285F4/FFFFFF?text=G' },
    { id: 2, name: 'Microsoft', logo: 'https://placehold.co/100x100/00BCF2/FFFFFF?text=M' },
    { id: 3, name: 'Amazon', logo: 'https://placehold.co/100x100/FF9900/FFFFFF?text=A' },
    { id: 4, name: 'Apple', logo: 'https://placehold.co/100x100/A2AAAD/FFFFFF?text=' },
    { id: 5, name: 'Meta', logo: 'https://placehold.co/100x100/1877F2/FFFFFF?text=f' },
    { id: 6, name: 'Netflix', logo: 'https://placehold.co/100x100/E50914/FFFFFF?text=N' },
    { id: 7, name: 'Tesla', logo: 'https://placehold.co/100x100/CC0000/FFFFFF?text=T' },
    { id: 8, name: 'Adobe', logo: 'https://placehold.co/100x100/FF0000/FFFFFF?text=A' },
    { id: 9, name: 'IBM', logo: 'https://placehold.co/100x100/054ADA/FFFFFF?text=I' },
    { id: 10, name: 'Oracle', logo: 'https://placehold.co/100x100/F80000/FFFFFF?text=O' },
    { id: 11, name: 'Salesforce', logo: 'https://placehold.co/100x100/00A1E0/FFFFFF?text=S' },
    { id: 12, name: 'Intel', logo: 'https://placehold.co/100x100/0071C5/FFFFFF?text=I' },
  ];

  const handleCompanyClick = (companyId) => {
    // Navigate to years page
    window.location.href = `/company/${companyId}/years`;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Fixed and not scrolling */}
        <Navbar/>

      {/* Main Content - With left margin to accommodate sidebar */}
      <div className="ml-64 flex-1 p-8 overflow-y-auto">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold">
              N
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Welcome back, Naveenram !</h1>
              <p className="text-gray-600">Explore interview experiences shared by alumni from your college</p>
            </div>
          </div>
        </div>

        {/* Header Section with Title and Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Companies with Alumni Placements</h2>
          <div className="relative max-w-xs w-full md:w-auto">
            <input
              type="text"
              placeholder="Search companies..."
              className="w-full p-2 pl-8 pr-10 rounded-full  bg-white border-0 border-b-2 border-gray-300 placeholder-gray-400 focus:outline-none focus:border-slate-900 transition duration-200 ease-in-out shadow-sm text-sm"
            />
            <svg 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Company Showcase */}
        <div className="mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4">
            {companies.map(company => (
              <div 
                key={company.id} 
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                onClick={() => handleCompanyClick(company.id)}
              >
                {/* Combined Image and Name Container */}
                <div className="relative h-36">
                  {/* Company Logo */}
                  <img 
                    src={company.logo} 
                    alt={company.name} 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Company Name Overlay - Apple-like glossy effect */}
                  <div className="absolute bottom-0 left-0 right-0  bg-gradient-to-t from-black/70 to-transparent">
                    <div className="relative">
                      {/* Glass morphism background */}
                      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-lg"></div>
                      
                      {/* Subtle highlight */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"></div>
                      
                      {/* Company name */}
                      <h3 className="text-sm font-semibold text-white relative z-10 text-center truncate px-2 py-1">
                        {company.name}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Recent Alumni Stories</h3>
            <div className="space-y-3">
              <div className="p-3 hover:bg-purple-50 rounded-lg transition-colors">
                <p className="font-medium">John Doe placed at Google in 2023</p>
                <p className="text-sm text-gray-600">Software Engineer Role</p>
              </div>
              <div className="p-3 hover:bg-purple-50 rounded-lg transition-colors">
                <p className="font-medium">Sarah Smith joined Microsoft in 2022</p>
                <p className="text-sm text-gray-600">Product Manager Position</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Upcoming Webinars</h3>
            <div className="space-y-3">
              <div className="p-3 hover:bg-blue-50 rounded-lg transition-colors">
                <p className="font-medium">Career Guidance Session</p>
                <p className="text-sm text-gray-600">October 15, 2023 • 3:00 PM</p>
              </div>
              <div className="p-3 hover:bg-blue-50 rounded-lg transition-colors">
                <p className="font-medium">Interview Prep Workshop</p>
                <p className="text-sm text-gray-600">October 22, 2023 • 4:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;