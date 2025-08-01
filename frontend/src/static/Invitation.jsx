import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export default function Invitation() {
  const { id } = useParams(); 
  const url="immune-coral-pumped.ngrok-free.app"

  useEffect(() => {
    axios
      .get(`${url}/api/admin/createAlumni/${id}`)
  }, [id]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1 style={{ color: "#4a148c" }}>Welcome to Campus Connect</h1>
    </div>
  );
}
