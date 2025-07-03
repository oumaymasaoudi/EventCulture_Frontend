import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

function LandingPage() {
  const navigate = useNavigate();

  const handleGoogleLogin = (credentialResponse) => {
    const userData = jwt_decode(credentialResponse.credential);
    console.log("Connexion Google réussie :", userData);

    // Sauvegarder l'utilisateur dans le localStorage
    localStorage.setItem("user", JSON.stringify(userData));

    // Rediriger vers le simulateur
    navigate("/main");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-50 px-4">
      <h1 className="text-4xl font-bold mb-4 text-center text-blue-700">
        Bienvenue sur le Simulateur Réseau
      </h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-xl">
        Visualisez, explorez et simulez vos topologies réseau en quelques clics.
      </p>

      <div className="text-center text-xl font-semibold mb-4 text-gray-700">
        Choisissez une méthode d'accès
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded shadow"
        >
          Connexion manuelle
        </button>
        <button
          onClick={() => navigate("/register")}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded shadow"
        >
          Créer un compte
        </button>
      </div>

      <div className="text-gray-500 mb-4">— ou via Google —</div>

      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={() => {
          console.error("Erreur de connexion Google");
          alert("Échec de la connexion avec Google.");
        }}
      />
    </div>
  );
}

export default LandingPage;
