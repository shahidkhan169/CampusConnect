import React, { useContext, useEffect, useState } from 'react';
import NavbarStudent from '../../Components/Component.NavbarStudent';
import { BackendClient } from '../../AxiosClient/BackendClient';
import { authContext } from '../../Context/AuthContext';

const EmailIcon = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.242L9.5 11.5h-2a1 1 0 01-1-1V7.848a1 1 0 01.21-.63l1.45-1.45A1 1 0 006.1 5H5z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v4m0 4v4m0-4h4m-4 0H8" />
  </svg>
);

const AcademicCapIcon = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14v8" />
  </svg>
);

const BadgeIcon = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const TokenIcon = () => (
  <svg className="w-5 h-5 text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const {token}=useContext(authContext);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await BackendClient.get("student/getStudent", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const { password, lastTokenReset, ...safeData } = response.data.data;
        setStudent(safeData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="ml-64 flex-1 p-8 flex items-center justify-center">
          <div className="animate-pulse text-gray-500">Loading your profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Sidebar Navbar */}

      {/* Main Content */}
      <main className="ml-64 flex-1 p-6 md:p-8 lg:p-10 overflow-y-auto">
        {/* Hero Header */}
        <section className="mb-8">
          <div
            className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-1 shadow-xl"
          >
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 md:p-8 relative z-10">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {student.firstName.charAt(0)}
                    {student.lastName.charAt(0)}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-extrabold text-gray-300">
                    {student.firstName} {student.lastName}
                  </h1>
                  <p className="text-lg text-gray-600 mt-1">
                    {student.program} • {student.branch}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <BadgeIcon />
                      {student.rollNo}
                    </span>
                    <span className="flex items-center gap-1">
                      <AcademicCapIcon />
                      Semester {student.semester}
                    </span>
                  </div>
                </div>

                {/* Token Badge */}
                <div className="flex-shrink-0">
                  <div className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full font-semibold text-sm shadow-sm border border-indigo-100">
                    <TokenIcon />
                    {student.tokensRemaining} tokens
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column - Personal & Contact */}
          <div className="lg:col-span-3 space-y-6">
            {/* Personal Info Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all hover:shadow-xl">
              <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Personal Information
                </h2>
              </div>
              <div className="p-6 space-y-5">
                <div className="flex items-start gap-4">
                  <EmailIcon />
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-medium text-gray-800">{student.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <PhoneIcon />
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="font-medium text-gray-800">{student.phoneNumber}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Academic & Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Academic Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-100">
                <h2 className="text-xl font-bold text-indigo-700 flex items-center gap-2">
                  <AcademicCapIcon />
                  Academic Info
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Program</p>
                  <p className="font-semibold text-gray-800">{student.program}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Branch</p>
                  <p className="font-semibold text-gray-800">{student.branch}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Semester</p>
                  <p className="font-semibold text-gray-800">Semester {student.semester}</p>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg p-6 text-center">
              <h3 className="text-lg font-bold mb-2">Interview Access</h3>
              <div className="text-3xl font-extrabold">{student.tokensRemaining}</div>
              <p className="text-indigo-100 text-sm">tokens remaining</p>
              <div className="mt-4 w-full bg-white/20 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-white h-full rounded-full transition-all duration-500"
                  style={{ width: `${(student.tokensRemaining / 10) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>© 2025 CampusConnect. Your journey to success starts here.</p>
        </footer>
      </main>
    </div>
  );
};

export default StudentProfile;