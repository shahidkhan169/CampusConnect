import React, { useState } from 'react';
import NavbarStudent from '../../Components/Component.NavbarStudent';
import StudentDashboard from './Student.DashBoard';
import StudentProfile from './Student.Profile';
import StudentCompanyProfile from './Student.CompanyProfile';

function StudentHome() {
  const [selection, setSelection] = useState("Dashboard");
  const [companyId, setCompanyId] = useState(null);

  return (
    <div>
      <NavbarStudent setSelection={setSelection} setCompanyId={setCompanyId} />

      <div className="">
        {companyId !== null ? (
          <StudentCompanyProfile companyId={companyId} />
        ) : selection === "Dashboard" ? (
          <StudentDashboard setCompanyId={setCompanyId} />
        ) : selection === "MyProfile" ? (
          <StudentProfile />
        ) : null}
      </div>
    </div>
  );
}

export default StudentHome;
