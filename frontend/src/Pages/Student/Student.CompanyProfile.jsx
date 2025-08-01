import React, { useContext, useEffect, useState } from 'react';
import NavbarStudent from '../../Components/Component.NavbarStudent';
import { authContext } from '../../Context/AuthContext';
import { BackendClient } from '../../AxiosClient/BackendClient';

const StudentCompanyProfile = () => {
  const { token } = useContext(authContext);
  const [alumniData, setAlumniData] = useState([]);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  const companyId = "688b9d248084bea9fd52c6f0"; // Can be passed via URL later
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear - i);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [expandedRound, setExpandedRound] = useState(null);
  const [showMentorshipModal, setShowMentorshipModal] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch company details
  useEffect(() => {
    const fetchCompany = async () => {
      if (!token || !companyId) return;

      try {
        const response = await BackendClient.post(
          "student/getCompany",
          { companyId },
          {
            headers: {
              Authorization: `Bearer ${token.trim()}`
            }
          }
        );

        console.log("Company API Response:", response.data);

        if (response.data.status && response.data.statusCode === 200) {
          const data = response.data.data;

          // Use companyImg.data directly (it's already a full data URL like 'data:image/png;base64,...')
          setCompany({
            name: data.companyName || "Unknown Company",
            logo: data.companyImg?.data || "https://via.placeholder.com/150",
            lastVisit: "N/A" // Update if backend provides this
          });
        } else {
          setCompany({
            name: "Not Found",
            logo: "https://via.placeholder.com/150",
            lastVisit: "N/A"
          });
        }
      } catch (error) {
        console.error("Error fetching company:", error);
        setCompany({
          name: "Error",
          logo: "https://via.placeholder.com/150",
          lastVisit: "N/A"
        });
      }
    };

    fetchCompany();
  }, [token, companyId]);

  // Fetch alumni data
  useEffect(() => {
    const fetchAlumni = async () => {
      if (!token || !selectedYear) return;

      setLoading(true);
      try {
        const payload = {
          companyId,
          year: selectedYear.toString()
        };

        const response = await BackendClient.post("student/sortAlumni", payload, {
          headers: {
            Authorization: `Bearer ${token.trim()}`
          }
        });

        console.log("Alumni API Response:", response.data);

        if (response.data.statusCode && Array.isArray(response.data.data)) {
          const mappedAlumni = response.data.data.map(alumni => {
            // Handle profile image: check if file.data is already a full data URL
            const imageSrc = alumni.file
              ? alumni.file.data.startsWith('data:')
                ? alumni.file.data // Already a full data URL (e.g., "data:image/jpeg;base64,...")
                : `data:${alumni.file.contentType};base64,${alumni.file.data}` // Build it
              : 'https://via.placeholder.com/150';

            return {
              id: alumni._id,
              name: `${alumni.firstName} ${alumni.lastName}`.trim(),
              role: alumni.designation || 'N/A',
              batch: alumni.passedOutYear,
              salary: alumni.salaryPackage || 'Not disclosed',
              image: imageSrc,
              resumeUrl: alumni.socialMediaProfiles?.find(p => p.name === 'LinkedIn')?.link?.trim() || '#',
              generalDesc: alumni.generalDesc || '',
              experience: alumni.rounds?.map(round => ({
                round: round.name,
                title: round.name,
                details: round.description
              })) || []
            };
          });
          setAlumniData(mappedAlumni);
        } else {
          setAlumniData([]);
        }
      } catch (error) {
        console.error("Error fetching alumni:", error);
        setAlumniData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, [token, selectedYear, companyId]);

  const filteredAlumni = alumniData.filter(alumni => alumni.batch === selectedYear.toString());

  const handleAlumniClick = (alumni) => {
    setSelectedAlumni(alumni);
    setExpandedRound(null);
    setMessage('');
  };

  const toggleRound = (alumniId, roundIndex) => {
    setExpandedRound(prev =>
      prev?.alumniId === alumniId && prev.roundIndex === roundIndex
        ? null
        : { alumniId, roundIndex }
    );
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

  if (!company && loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <NavbarStudent />
        <main className="ml-64 flex-1 p-8">Loading company info...</main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      <NavbarStudent />

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8 overflow-y-auto">
        {/* Company Header */}
        <section className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => window.history.back()}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition duration-200 shadow-sm"
              aria-label="Go back"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex items-center space-x-4">
              <img
                src={company?.logo}
                alt={company?.name}
                className="w-14 h-14 object-contain rounded-lg shadow-sm"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{company?.name.toUpperCase()}</h1>
              </div>
            </div>
          </div>

          {/* Year Dropdown */}
          <div className="flex items-center space-x-3">
            <label htmlFor="year-select" className="text-sm font-medium text-gray-800">
              Year:
            </label>
            <select
              id="year-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="py-1 px-4 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-gray-400 transition duration-200 shadow-sm min-w-[100px]"
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

        {loading ? (
          <p className="text-center text-gray-500 text-lg">Loading alumni data...</p>
        ) : filteredAlumni.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredAlumni.map((alumni) => (
              <div
                key={alumni.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
                onClick={() => handleAlumniClick(alumni)}
              >
                <div className="p-6 text-center">
                  <img
                    src={alumni.name}
                    alt={alumni.name.charAt(0)}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-indigo-100 shadow-sm"
                  />
                  <h3 className="text-xl font-bold text-gray-800">{alumni.name}</h3>
                  <p className="text-indigo-600 font-medium">{alumni.role}</p>
                  <p className="text-sm text-gray-500 mt-1">Batch of {alumni.batch}</p>
                  {alumni.salary && (
                    <p className="text-sm text-green-600 font-semibold mt-1">{alumni.salary}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8 text-lg italic">
            No alumni records available for {selectedYear}.
          </p>
        )}
      </main>

      {/* Alumni Detail Modal */}
      {selectedAlumni && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col border border-gray-200 overflow-hidden">
            {/* Modal Header */}
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
                  {selectedAlumni.salary && (
                    <p className="text-green-600 font-semibold">{selectedAlumni.salary}</p>
                  )}
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

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {/* LinkedIn / Resume Link */}
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">📄 LinkedIn Profile</h3>
                <a
                  href={selectedAlumni.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  View Profile
                </a>
              </div>

              {/* About */}
              {selectedAlumni.generalDesc && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">About</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedAlumni.generalDesc}</p>
                </div>
              )}

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
                            {expandedRound?.alumniId === selectedAlumni.id && expandedRound.roundIndex === idx
                              ? '▲'
                              : '▼'}
                          </span>
                        </button>
                      </div>
                      {expandedRound?.alumniId === selectedAlumni.id && expandedRound.roundIndex === idx && (
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
                className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition"
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
              placeholder="Hi, I'm preparing for interviews and would love your guidance..."
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-indigo-500 h-32 resize-none text-sm"
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

      {/* Fade-in Animation */}
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