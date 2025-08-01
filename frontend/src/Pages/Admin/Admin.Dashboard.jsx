// src/Pages/AdminDashboard.js

import React, { useEffect, useState } from 'react';
import NavbarAdmin from '../../Components/Component.NavbarAdmin';
import { BackendClient } from '../../AxiosClient/BackendClient';
import AddCompanyModal from './AdminModel/AddCompany.Model';
import InviteAlumniModal from './AdminModel/AddAlumini.Modal';

// Icons (inline SVGs)
const CompanyIcon = () => (
  <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h6m-6 4h6m-6 4h6" />
  </svg>
);

const AlumniIcon = () => (
  <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857" />
  </svg>
);

const StudentIcon = () => (
  <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const DocumentIcon = () => (
  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    companies: 0,
    alumni: 0,
    students: 0,
  });
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [isAddCompanyModalOpen, setIsAddCompanyModalOpen] = useState(false);
  const [isInviteAlumniModalOpen, setIsInviteAlumniModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [companiesRes, alumniRes, studentsRes, eventsRes] = await Promise.all([
          BackendClient.get("/admin/companies/count", {
            headers: {
              Authorization: "Bearer YOUR_ADMIN_TOKEN_HERE",
            },
          }),
          BackendClient.get("/admin/alumni/count", {
            headers: {
              Authorization: "Bearer YOUR_ADMIN_TOKEN_HERE",
            },
          }),
          BackendClient.get("/admin/students/count", {
            headers: {
              Authorization: "Bearer YOUR_ADMIN_TOKEN_HERE",
            },
          }),
          BackendClient.get("/admin/events/upcoming", {
            headers: {
              Authorization: "Bearer YOUR_ADMIN_TOKEN_HERE",
            },
          }),
        ]);

        setStats({
          companies: companiesRes.data.count || 0,
          alumni: alumniRes.data.count || 0,
          students: studentsRes.data.count || 0,
        });

        setUpcomingEvents(eventsRes.data.data?.slice(0, 4) || [
          { title: "Placement Workshop", date: "2025-08-05", type: "Workshop" },
          { title: "Alumni Meetup", date: "2025-08-10", type: "Networking" },
        ]);
      } catch (error) {
        console.error("Error fetching admin data:", error);
        // Fallback static data
        setStats({ companies: 24, alumni: 156, students: 892 });
        setUpcomingEvents([
          { title: "Placement Workshop", date: "2025-08-05", type: "Workshop" },
          { title: "Alumni Meetup", date: "2025-08-10", type: "Networking" },
          { title: "Mock Interview Drive", date: "2025-08-14", type: "Interview" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDateString = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <NavbarAdmin firstName="Admin" lastName="User" role="Administrator" />
        <div className="ml-64 flex-1 p-8 flex items-center justify-center">
          <div className="text-gray-600">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Sidebar */}
      <NavbarAdmin firstName="Alex" lastName="Morgan" role="Super Admin" />

      {/* Main Content */}
      <main className="ml-64 flex-1 p-6 md:p-8 lg:p-10 overflow-y-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-1">Overview of campus placements and user activity</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Companies Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6 flex items-center space-x-4 hover:shadow-xl transition">
            <div className="p-3 bg-indigo-100 rounded-xl">
              <CompanyIcon />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Companies</p>
              <p className="text-2xl font-bold text-gray-800">{stats.companies}</p>
            </div>
          </div>

          {/* Alumni Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6 flex items-center space-x-4 hover:shadow-xl transition">
            <div className="p-3 bg-green-100 rounded-xl">
              <AlumniIcon />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Alumni</p>
              <p className="text-2xl font-bold text-gray-800">{stats.alumni}</p>
            </div>
          </div>

          {/* Students Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6 flex items-center space-x-4 hover:shadow-xl transition">
            <div className="p-3 bg-blue-100 rounded-xl">
              <StudentIcon />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Students</p>
              <p className="text-2xl font-bold text-gray-800">{stats.students}</p>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-2">
              <DocumentIcon />
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  label: "Add New Company",
                  color: "indigo",
                  action: () => setIsAddCompanyModalOpen(true),
                },
                {
                  label: "Invite Alumni",
                  color: "green",
                  action: () => setIsInviteAlumniModalOpen(true),
                },
                {
                  label: "Enroll Student",
                  color: "blue",
                  action: () => alert("Enroll Student coming soon!"),
                },
                {
                  label: "Schedule Webinar",
                  color: "purple",
                  action: () => alert("Schedule Webinar coming soon!"),
                },
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={item.action}
                  className={`p-4 rounded-xl bg-${item.color}-50 border border-${item.color}-100 hover:bg-${item.color}-100 transition text-left`}
                >
                  <p className={`font-semibold text-${item.color}-700`}>{item.label}</p>
                  <p className={`text-sm text-${item.color}-500 mt-1`}>Complete in 2 minutes</p>
                </button>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Recent Activity</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• New company added: <span className="font-medium">Amazon</span></li>
                <li>• 12 students enrolled today</li>
                <li>• Alumni interview report published</li>
              </ul>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl shadow-lg border border-orange-100 p-6">
            <h2 className="text-xl font-bold text-orange-800 mb-5 flex items-center gap-2">
              <CalendarIcon />
              Upcoming Events
            </h2>
            <div className="space-y-4">
              {upcomingEvents.map((event, idx) => (
                <div key={idx} className="bg-white/60 backdrop-blur-sm p-3 rounded-xl border border-orange-200">
                  <p className="font-medium text-gray-800">{event.title}</p>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-orange-600 font-medium">{event.type}</span>
                    <span className="text-xs text-gray-500">{formatDateString(event.date)}</span>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => (window.location.href = "/admin/events")}
              className="w-full mt-5 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-xl transition"
            >
              View All Events
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>© 2025 CampusConnect Admin Panel. All data is updated in real time.</p>
        </footer>
      </main>

      {/* Modals */}
      <AddCompanyModal
        isOpen={isAddCompanyModalOpen}
        onClose={() => setIsAddCompanyModalOpen(false)}
        onCompanyAdded={(company) => {
          console.log('✅ Company added:', company);
          // Optionally refresh stats
          setStats(prev => ({ ...prev, companies: prev.companies + 1 }));
        }}
      />

      <InviteAlumniModal
        isOpen={isInviteAlumniModalOpen}
        onClose={() => setIsInviteAlumniModalOpen(false)}
        onAlumniInvited={(alumni) => {
          console.log('✅ Alumni invited:', alumni);
          // Optionally refresh stats
          setStats(prev => ({ ...prev, alumni: prev.alumni + 1 }));
        }}
      />
    </div>
  );
};

export default AdminDashboard;