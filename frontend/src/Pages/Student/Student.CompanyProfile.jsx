import React, { useState } from 'react';
import NavbarStudent from '../../Components/Component.NavbarStudent';

const StudentCompanyProfile = () => {
  const company = {
    name: 'Google',
    lastVisit: 'March 15, 2025',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/150px-Google_%22G%22_logo.svg.png',
  };

  const alumniList = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Software Engineer',
      batch: '2025',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      resumeUrl: '#resume-john',
      experience: [
        {
          round: 'Online Assessment',
          title: 'Coding Test (Leetcode Medium)',
          details:
            'Two coding questions on Trees and Dynamic Programming. Time: 90 mins. Platform: HackerRank.',
        },
        {
          round: 'Technical Round 1',
          title: 'System Design - Design YouTube',
          details:
            'Discussed scalability, database schema, CDN usage, and caching strategies. Asked to draw architecture.',
        },
        {
          round: 'Technical Round 2',
          title: 'Coding & Problem Solving',
          details:
            'Solved a graph traversal problem (BFS + DFS hybrid). Optimized for space and time. Follow-up on edge cases.',
        },
        {
          round: 'Behavioral Round',
          title: 'Leadership & Teamwork',
          details:
            'STAR-based questions on conflict resolution, project ownership, and handling failure in team projects.',
        },
      ],
    },
    {
      id: 2,
      name: 'Sarah Smith',
      role: 'Product Manager',
      batch: '2024',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      resumeUrl: '#resume-sarah',
      experience: [
        {
          round: 'Screening Call',
          title: 'Product Sense - Improve Google Maps',
          details:
            'Discussed user personas, pain points, feature prioritization using RICE framework.',
        },
        {
          round: 'Execution Round',
          title: 'Prioritize Gmail Features',
          details:
            'Given 5 features, asked to prioritize with reasoning. Focused on user impact vs effort.',
        },
        {
          round: 'Leadership Round',
          title: 'Market Expansion Strategy',
          details:
            'How would you launch Google Wallet in Southeast Asia? Covered localization, partnerships, and regulation.',
        },
      ],
    },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear - i);

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [expandedRound, setExpandedRound] = useState(null);
  const [showMentorshipModal, setShowMentorshipModal] = useState(false);
  const [message, setMessage] = useState('');

  const filteredAlumni = alumniList.filter((alumni) => alumni.batch === selectedYear.toString());

  const handleAlumniClick = (alumni) => {
    setSelectedAlumni(alumni);
    setExpandedRound(null);
    setMessage('');
  };

  const toggleRound = (alumniId, roundIndex) => {
    if (expandedRound?.alumniId === alumniId && expandedRound.roundIndex === roundIndex) {
      setExpandedRound(null);
    } else {
      setExpandedRound({ alumniId, roundIndex });
    }
  };

  const openMentorshipModal = () => {
    setShowMentorshipModal(true);
  };

  const sendMentorshipRequest = () => {
    alert(`Mentorship request sent to ${selectedAlumni.name}!`);
    setShowMentorshipModal(false);
    setSelectedAlumni(null);
  };

  const closeModal = () => {
    setSelectedAlumni(null);
    setExpandedRound(null);
    setShowMentorshipModal(false);
    setMessage('');
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      <NavbarStudent />

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8 overflow-y-auto">
       {/* Company Header with Integrated Year Dropdown and Back Button */}
<section className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
  {/* Back Button + Company Info */}
  <div className="flex items-center space-x-4">
    {/* Back Arrow Button */}
    <button
      onClick={() => window.history.back()} // Or navigate(-1) if using React Router
      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition duration-200 shadow-sm"
      aria-label="Go back"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    {/* Company Logo & Name */}
    <div className="flex items-center space-x-4">
      <img
        src={company.logo}
        alt={company.name}
        className="w-14 h-14 object-contain rounded-lg shadow-sm"
      />
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{company.name}</h1>
        <p className="text-sm text-gray-500">Last visited: {company.lastVisit}</p>
      </div>
    </div>
  </div>

  {/* Compact Year Dropdown */}
  <div className="flex items-center space-x-3">
    <label htmlFor="year-select" className="text-sm font-medium text-gray-800">
      Year:
    </label>
    <select
      id="year-select"
      value={selectedYear}
      onChange={(e) => setSelectedYear(Number(e.target.value))}
      className="py-1 px-4 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-gray-400 transition duration-200 shadow-sm min-w-[100px] appearance-none"
    >
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  </div>
</section>
        {/* Alumni Grid */}
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Alumni Placed in {selectedYear}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredAlumni.length > 0 ? (
            filteredAlumni.map((alumni) => (
              <div
                key={alumni.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
                onClick={() => handleAlumniClick(alumni)}
              >
                <div className="p-6 text-center">
                  <img
                    src={alumni.image}
                    alt={alumni.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-indigo-100 shadow-sm"
                  />
                  <h3 className="text-xl font-bold text-gray-800">{alumni.name}</h3>
                  <p className="text-indigo-600 font-medium">{alumni.role}</p>
                  <p className="text-sm text-gray-500 mt-1">Batch of {alumni.batch}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-gray-500 text-center py-8 text-lg italic">
              No alumni records available for {selectedYear}.
            </p>
          )}
        </div>
      </main>

      {/* Alumni Detail Modal - Fixed Header, Scrollable Body */}
      {selectedAlumni && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col border border-gray-200 overflow-hidden">
            {/* Modal Header - Fixed */}
            <div className="flex items-center justify-between p-8 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200">
              <div className="flex items-center space-x-6">
                <img
                  src={selectedAlumni.image}
                  alt={selectedAlumni.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{selectedAlumni.name}</h2>
                  <p className="text-xl text-indigo-600 font-medium">{selectedAlumni.role}</p>
                  <p className="text-gray-600">Batch of {selectedAlumni.batch}</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="ml-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-lg transition"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

            {/* Modal Body - Scrollable */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {/* Resume */}
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  📄 Resume
                </h3>
                <a
                  href={selectedAlumni.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  View Resume
                </a>
              </div>

              {/* Interview Rounds */}
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-5">Interview Process</h3>
                <div className="space-y-4">
                  {selectedAlumni.experience.map((round, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between p-4 bg-white">
                        <div>
                          <h4 className="font-bold text-gray-800">{round.round}</h4>
                          <p className="text-indigo-600 text-sm">{round.title}</p>
                        </div>
                        <button
                          onClick={() => toggleRound(selectedAlumni.id, idx)}
                          className="ml-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
                        >
                          <span className="text-sm">
                            {expandedRound?.alumniId === selectedAlumni.id &&
                            expandedRound.roundIndex === idx
                              ? '▲'
                              : '▼'}
                          </span>
                        </button>
                      </div>

                      {expandedRound?.alumniId === selectedAlumni.id &&
                        expandedRound.roundIndex === idx && (
                          <div className="p-4 bg-gray-50 border-t border-gray-200 animate-fadeIn">
                            <p className="text-gray-700 leading-relaxed">{round.details}</p>
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-gray-50 border-t border-gray-200 text-right">
              <button
                onClick={openMentorshipModal}
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mentorship Request Modal */}
      {showMentorshipModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 border border-gray-200">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">Request Mentorship</h3>
            <p className="text-gray-600 mb-6">
              Send a personalized message to{' '}
              <span className="font-semibold text-indigo-600">{selectedAlumni?.name}</span>.
            </p>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi, I’m preparing for interviews at Google and would love your guidance..."
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-indigo-500 resize-none h-32 text-sm placeholder-gray-400"
            />

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowMentorshipModal(false)}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-xl hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={sendMentorshipRequest}
                disabled={!message.trim()}
                className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default StudentCompanyProfile;