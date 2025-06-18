import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Clock, MapPin, PlusCircle, MinusCircle } from 'lucide-react';

const ParcoursParticipationView = () => {
  const { id } = useParams();
  const token = localStorage.getItem('token');

  const [sites, setSites] = useState([]);
  const [selectedSites, setSelectedSites] = useState([]);
  const [parcours, setParcours] = useState(null);

  useEffect(() => {
    // Charger sites
    fetch(`http://localhost:5000/api/sites/by-parcours/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setSites(data))
      .catch(err => console.error("Erreur chargement sites :", err));

    // Charger parcours
    fetch(`http://localhost:5000/api/parcours/${id}`)
      .then(res => res.json())
      .then(data => setParcours(data))
      .catch(err => console.error("Erreur chargement parcours :", err));
  }, [id, token]);

  // Ajouter un site
  const addSite = (site) => {
    if (!selectedSites.find(s => s.id === site.id)) {
      setSelectedSites([...selectedSites, site]);
    }
  };

  // Supprimer un site
  const removeSite = (id) => {
    setSelectedSites(selectedSites.filter(site => site.id !== id));
  };

  // Simule un ordre optimisé
  const orderedSites = [...selectedSites].sort((a, b) => a.name.localeCompare(b.name));

  // Simule distances et durées
  const totalDistance = (orderedSites.length * 0.5).toFixed(2); // 0.5km entre chaque
  const totalDuration = orderedSites.reduce((acc, site) => {
    const min = parseInt(site.tarif) || 45;
    return acc + min;
  }, 0);

  const toHHMM = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h${m < 10 ? '0' : ''}${m}`;
  };

  return (
    <div className="min-h-screen bg-yellow-300">
      <Header />

      <div className="container mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-6">

          {/* Colonne infos parcours */}
          <div className="bg-yellow-100 p-6 rounded-xl shadow space-y-4">
            <h2 className="text-lg font-bold">Informations du Parcours</h2>
            {parcours && (
              <div className="space-y-2 text-sm">
                <div><b>Titre :</b> {parcours.title}</div>
                <div><b>Description :</b> {parcours.description}</div>
                <div><b>Thème :</b> {parcours.theme}</div>
                <div><b>Difficulté :</b> {parcours.difficulty}</div>
                <div className="mt-4 bg-white p-4 border rounded-lg">
                  <p><b>Parcours Optimisé</b></p>
                  <p>📏 Distance : {totalDistance} km</p>
                  <p>⏱️ Durée totale : {toHHMM(totalDuration)}</p>
                  <p>📍 Sites : {selectedSites.length}</p>
                </div>
              </div>
            )}
          </div>

          {/* Colonne sites disponibles */}
          <div className="md:col-span-2 bg-yellow-100 p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">🧠 Sélection Intelligente des Sites</h2>
              <button onClick={() => setSelectedSites([])} className="bg-yellow-400 px-4 py-1 rounded hover:bg-yellow-500 text-sm">
                Tout effacer
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {sites.map(site => {
                const selected = selectedSites.find(s => s.id === site.id);
                return (
                  <div key={site.id} className="bg-white p-4 rounded-lg border space-y-2 relative">
                    <h3 className="font-semibold">{site.name}</h3>
                    <p className="text-sm text-gray-600">{site.description}</p>
                    <div className="flex items-center text-xs gap-4">
                      <span className="flex items-center gap-1 text-gray-500"><Clock className="w-4 h-4" /> {site.tarif || 45} min</span>
                      <span className="bg-yellow-200 px-2 py-1 rounded-full">{site.categorie}</span>
                    </div>
                    <button
                      onClick={() => selected ? removeSite(site.id) : addSite(site)}
                      className={`absolute top-3 right-3 p-2 rounded-full ${selected ? 'bg-red-400' : 'bg-yellow-400'} hover:scale-110 transition`}
                    >
                      {selected ? <MinusCircle className="text-white w-5 h-5" /> : <PlusCircle className="text-white w-5 h-5" />}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Colonne ordre optimisé */}
        {selectedSites.length > 0 && (
          <div className="mt-10 bg-yellow-100 p-6 rounded-xl shadow">
            <h2 className="text-lg font-bold mb-4">🗺️ Ordre du Parcours Optimisé</h2>
            <ul className="space-y-2">
              {orderedSites.map((site, index) => (
                <li key={site.id} className="bg-white px-4 py-3 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{site.name}</p>
                    <p className="text-sm text-gray-500">{site.tarif || 45} minutes de visite</p>
                  </div>
                  <span className="text-gray-400 text-sm">~ 0.{index + 5} km</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ParcoursParticipationView;
