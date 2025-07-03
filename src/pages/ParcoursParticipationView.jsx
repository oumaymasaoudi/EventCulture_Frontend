import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MapPin, PlusCircle, MinusCircle } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Distance géographique
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const toRad = deg => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Ordre optimal (brute force)
function computeOptimalOrder(sites) {
  if (sites.length <= 2) return sites;
  const permute = arr => arr.length <= 1 ? [arr] : arr.flatMap((v, i) => permute(arr.filter((_, j) => j !== i)).map(p => [v, ...p]));
  return permute(sites).reduce((best, curr) => {
    const dist = curr.slice(1).reduce((sum, site, i) => sum + haversineDistance(curr[i].latitude, curr[i].longitude, site.latitude, site.longitude), 0);
    return dist < best.dist ? { dist, path: curr } : best;
  }, { dist: Infinity, path: sites }).path;
}

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const ParcoursParticipationView = () => {
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const [sites, setSites] = useState([]);
  const [selectedSites, setSelectedSites] = useState([]);
  const [parcours, setParcours] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/sites/by-parcours/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.json()).then(setSites);

    fetch(`http://localhost:5000/api/parcours/${id}`)
      .then(res => res.json())
      .then(setParcours);
  }, [id, token]);

  const toggleSite = (site) => {
    const exists = selectedSites.find(s => s.id === site.id);
    if (exists) {
      setSelectedSites(selectedSites.filter(s => s.id !== site.id));
    } else {
      setSelectedSites([...selectedSites, site]);
    }
  };

  const orderedSites = computeOptimalOrder(selectedSites);
  const totalDistance = orderedSites.slice(1).reduce((sum, site, i) => sum + haversineDistance(orderedSites[i].latitude, orderedSites[i].longitude, site.latitude, site.longitude), 0).toFixed(2);

  return (
    <div className="min-h-screen bg-purple-50">
      <Header />

      <div className="container mx-auto grid md:grid-cols-2 gap-6 px-6 py-10">
        {/* Colonne Infos + sélection */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-2">Informations du Parcours</h2>
            {parcours && (
              <div className="text-sm space-y-1">
                <p><b>Titre:</b> {parcours.title}</p>
                <p><b>Description:</b> {parcours.description}</p>
                <p><b>Thème:</b> {parcours.theme}</p>
                <p><b>Difficulté:</b> {parcours.difficulty}</p>
                <div className="bg-purple-100 mt-2 p-2 rounded">
                  <p><b>Parcours Personnalisé:</b></p>
                  <p>Distance: {totalDistance} km</p>
                  <p>Sites sélectionnés: {selectedSites.length}</p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Sites disponibles</h3>
              <button className="text-red-500 text-sm" onClick={() => setSelectedSites([])}>Tout effacer</button>
            </div>
            <div className="space-y-3">
              {sites.map(site => (
                <div key={site.id} className="bg-purple-50 p-3 rounded flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{site.name}</p>
                    <p className="text-xs text-gray-500">{site.adresse}</p>
                  </div>
                  <button
                    onClick={() => toggleSite(site)}
                    className={`p-2 rounded-full ${selectedSites.find(s => s.id === site.id) ? 'bg-red-300' : 'bg-green-300'}`}
                  >
                    {selectedSites.find(s => s.id === site.id) ? <MinusCircle /> : <PlusCircle />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Carte + ordre */}
        <div className="bg-white p-6 rounded-xl shadow space-y-6">
          <h2 className="text-xl font-bold">Ordre Optimal & Carte</h2>

          <ul className="space-y-2">
            {orderedSites.map((site, i) => (
              <li key={site.id} className="text-sm">
                <b>{site.name}</b> - {site.adresse} ({i === 0 ? 'Départ' : `${haversineDistance(orderedSites[i - 1].latitude, orderedSites[i - 1].longitude, site.latitude, site.longitude).toFixed(2)} km`})
              </li>
            ))}
          </ul>

          <div className="h-[400px]">
            {orderedSites.length > 0 && orderedSites[0]?.latitude && orderedSites[0]?.longitude && (
  <MapContainer
    center={[orderedSites[0].latitude, orderedSites[0].longitude]}
    zoom={13}
    scrollWheelZoom={true}
    style={{ height: "400px", width: "100%" }}
  >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; OpenStreetMap contributors"
    />
    {orderedSites.map((site) => (
      <Marker key={site.id} position={[site.latitude, site.longitude]} icon={markerIcon}>
        <Popup>{site.name}</Popup>
      </Marker>
    ))}
  </MapContainer>
)}

            
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ParcoursParticipationView;
