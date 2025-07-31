import React, { useEffect, useState } from 'react';
import NavbarStudent from '../Components/NavbarStudent';
import { axiosClient } from '../AxiosClient/AxiosClinent';

const HomePage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [branch, setBranch] = useState("");
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const companyResponse = await axiosClient.get("student/getCompanies");
        const response = await axiosClient.get("student/getStudent", {
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4OGI2ODJmYzM0ZjY2MjI2MDJhMzUwZiIsImlhdCI6MTc1Mzk3NDM1OX0.TeNWxEXKXst_dRpqYGQOiMCfsdZxtDbqSoqY1IyoQAM"
          }
        });

        setFirstName(response.data.data.firstName);
        setLastName(response.data.data.lastName);
        setBranch(response.data.data.branch);
        setCompanies(companyResponse.data.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetch();
  }, []);

  const handleCompanyClick = (companyId) => {
    window.location.href = `/company/${companyId}/years`;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <NavbarStudent firstName={firstName} lastName={lastName} departmant={branch} />

      <div className="ml-64 flex-1 p-8 overflow-y-auto">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold">
              {firstName.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Welcome back, {firstName} {lastName}!</h1>
              <p className="text-gray-600">Explore interview experiences shared by alumni from your college</p>
            </div>
          </div>
        </div>

        {/* Search and Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Companies with Alumni Placements</h2>
          <div className="relative max-w-xs w-full md:w-auto">
            <input
              type="text"
              placeholder="Search companies..."
              className="w-full p-2 pl-8 pr-10 rounded-full bg-white border-0 border-b-2 border-gray-300 placeholder-gray-400 focus:outline-none focus:border-slate-900 transition duration-200 ease-in-out shadow-sm text-sm"
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

        {/* Company Cards */}
        <div className="mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {companies.map(company => {
              const logoBase64 = `data:${company.companyImg.contentType};base64,${btoa(
                new Uint8Array(company.companyImg.data.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
              )}`;

              return (
                <div
                  key={company._id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                  onClick={() => handleCompanyClick(company._id)}
                >
                  <div className="relative h-36">
                    <img
                      src={logoBase64}
                      alt={company.companyName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent">
                      <div className="relative">
                        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-lg"></div>
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"></div>
                        <h3 className="text-sm font-semibold text-white relative z-10 text-center truncate px-2 py-1">
                          {company.companyName}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Stories and Webinars */}
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
