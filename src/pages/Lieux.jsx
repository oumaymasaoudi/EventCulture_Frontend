import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const fetchLieux = async () => {
  const response = await axios.get('http://localhost:5000/api/lieux');
  return response.data;
};

const Lieux = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 🟢 Récupérer l'utilisateur connecté
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const userRole = user?.role || '';

  const { data, isLoading, isError } = useQuery({
    queryKey: ['lieux'],
    queryFn: fetchLieux
  });

  const handleEdit = (lieuId) => {
    navigate(`/create-lieu/${lieuId}`);
  };

  const handleDelete = async (lieuId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce lieu ?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/lieux/${lieuId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Erreur lors de la suppression du lieu');

      alert('Lieu supprimé avec succès.');

      // On force un refetch de la liste
      queryClient.invalidateQueries(['lieux']);
    } catch (error) {
      console.error(error);
      alert('Erreur lors de la suppression du lieu.');
    }
  };

  return (
    <div className="min-h-screen bg-purple-50">
      <Header />
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-slate-800">Liste des Lieux</h1>

        {isLoading && <p className="text-slate-600">Chargement des lieux...</p>}
        {isError && <p className="text-red-500">Erreur lors du chargement des lieux.</p>}

        <ul className="space-y-4">
          {data?.map((lieu) => (
            <li
              key={lieu.id}
              className="flex justify-between items-center p-4 bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300"
            >
              <div>
                <strong className="text-lg text-slate-800">{lieu.nom}</strong>{' '}
                <span className="text-slate-500">({lieu.ville}) - {lieu.pays}</span>
                <div className="text-slate-600 text-sm mt-1">{lieu.description}</div>
              </div>

              {/* 👉 Si user professionnel → on affiche les boutons */}
              {userRole === 'professionnel' && (
                <div className="flex gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                    onClick={() => handleEdit(lieu.id)}
                  >
                    <Edit className="w-4 h-4 mr-2" /> Modifier
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                    onClick={() => handleDelete(lieu.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Supprimer
                  </Button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
};

export default Lieux;
