import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ParcoursCard from '@/components/ParcoursCard';
import { MapPin, Clock, Users } from 'lucide-react';
import axios from 'axios';

const Parcours = () => {
  const [parcoursList, setParcoursList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/parcours")
      .then((res) => setParcoursList(res.data))
      .catch((err) => console.error("Erreur lors du chargement des parcours :", err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Parcours Culturels
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Explorez l'histoire et la culture à travers des parcours thématiques intelligents, 
            conçus pour vous faire découvrir les trésors patrimoniaux.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {parcoursList.map((parcours) => (
            <ParcoursCard key={parcours.id} {...parcours} />
          ))}
        </div>

        {parcoursList.length === 0 && (
          <div className="text-center text-slate-600 text-lg py-12">
            Aucun parcours disponible pour le moment.
          </div>
        )}

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
            Comment ça marche ?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Choisissez votre parcours</h3>
              <p className="text-slate-600">
                Sélectionnez un parcours thématique selon vos centres d'intérêt
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Suivez le guide</h3>
              <p className="text-slate-600">
                Laissez-vous guider d'étape en étape avec nos indications détaillées
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Découvrez et partagez</h3>
              <p className="text-slate-600">
                Enrichissez vos connaissances et partagez votre expérience
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Parcours;
