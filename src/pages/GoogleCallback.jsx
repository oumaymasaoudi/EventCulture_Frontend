import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    const token = new URLSearchParams(hash.replace("#", "?")).get("access_token");

    if (token) {
      // Simule un appel backend avec le token
      localStorage.setItem("user", JSON.stringify({ token, role: "user" }));
      navigate("/dashboard");
    } else {
      navigate("/auth");
    }
  }, [navigate]);

  return <div>Connexion en cours...</div>;
};

export default GoogleCallback;
