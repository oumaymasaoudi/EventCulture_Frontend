import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MapPin, Clock, Users, Edit, Trash2, Route } from 'lucide-react';
import axios from 'axios';
import { Button } from '@/components/ui/button';

const ParcoursDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [parcours, setParcours] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/parcours/${id}`)
      .then((res) => setParcours(res.data))
      .catch((err) => console.error("Erreur lors du chargement du parcours :", err));
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce parcours ?")) {
      try {
        await axios.delete(`http://localhost:5000/api/parcours/${id}`);
        alert('Parcours supprimé avec succès.');
        navigate('/parcours');
      } catch (err) {
        console.error("Erreur suppression parcours :", err);
        alert('Erreur lors de la suppression du parcours.');
      }
    }
  };

  const handleEdit = () => {
    navigate(`/create-parcours?id=${id}`);
  };

  if (!parcours) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-600 text-xl font-medium">
        Chargement en cours...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-12 space-y-10">

        {/* Header parcours */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-slate-800">{parcours.title}</h1>
              <p className="text-slate-500 text-lg">{parcours.theme}</p>
            </div>
           
           <div className="flex gap-4">
  {/* Si l'utilisateur est professionnel : afficher Modifier/Supprimer */}
  {JSON.parse(localStorage.getItem('user'))?.role === 'professionnel' && (
    <>
      <Button onClick={handleEdit} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow">
        <Edit className="w-5 h-5 mr-2" />
        Modifier
      </Button>
      <Button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow">
        <Trash2 className="w-5 h-5 mr-2" />
        Supprimer
      </Button>
    </>
  )}

  {/* Si l'utilisateur est participant : afficher Participer */}
  {JSON.parse(localStorage.getItem('user'))?.role === 'participant' && (
    <Button
      onClick={() => navigate(`/participer-au-parcours/${id}`)}
      className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow"
    >
      Participer
    </Button>
  )}
</div>

          </div>

          <div className="flex flex-col md:flex-row gap-8 mt-8">
            <img
              src={parcours.image ? `http://localhost:5000/uploads/${parcours.image}` : 'https://via.placeholder.com/400x400?text=Image+non+disponible'}

              alt={parcours.title}
              className="rounded-xl w-80 h-80 object-cover shadow-md border border-gray-200"
            />
            <div className="flex-1 space-y-4 text-slate-700 text-lg">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-emerald-500" />
                <span>{parcours.Lieu ? `${parcours.Lieu.nom} (${parcours.Lieu.ville}, ${parcours.Lieu.pays})` : 'Lieu non renseigné'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-indigo-500" />
                <span>Durée : {parcours.duration} min</span>
              </div>
              <div className="flex items-center space-x-2">
                <Route className="w-5 h-5 text-purple-500" />
                <span>Thème : {parcours.theme}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-pink-500" />
                <span>Participants : N/A</span>
              </div>
              <div className="text-slate-700 font-semibold">Difficulté : {parcours.difficulty}</div>
            </div>
          </div>
        </div>

        {/* À propos du parcours */}
        <div className="bg-gray-100 rounded-2xl shadow p-8 border border-gray-200">
          <h2 className="text-3xl font-bold mb-6 text-slate-800">À propos de ce parcours</h2>
          <p className="text-slate-600 leading-relaxed text-lg">{parcours.description}</p>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default ParcoursDetail;
