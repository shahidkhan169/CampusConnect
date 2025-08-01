import { createContext, useState } from "react";

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ||
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4OGI2ODJmYzM0ZjY2MjI2MDJhMzUwZiIsImlhdCI6MTc1Mzk3NDM1OX0.TeNWxEXKXst_dRpqYGQOiMCfsdZxtDbqSoqY1IyoQAM"
  );
  const [firstName, setFirstName] = useState(localStorage.getItem("firstName") || "Naveen");
  const [lastName, setLastName] = useState(localStorage.getItem("lastName") || "ram");
  const [branch, setBranch] = useState(localStorage.getItem("branch") || "AI");

  return (
    <authContext.Provider
      value={{
        token,
        setToken,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        branch,
        setBranch,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
