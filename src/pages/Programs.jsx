import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ✅ Fonction pour récupérer tous les programmes
const fetchPrograms = async () => {
  const response = await axios.get('http://localhost:5000/api/programs');
  return response.data;
};

const Programs = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // ✅ On récupère le user et son rôle
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const userRole = user?.role || '';

  const { data, isLoading, isError } = useQuery({
    queryKey: ['programs'],
    queryFn: fetchPrograms
  });

  // 👉 Handler pour modifier
  const handleEdit = (programId) => {
    // ✅ On utilise la bonne route : edit
    navigate(`/create-program/edit/${programId}`);
  };

  // 👉 Handler pour supprimer
  const handleDelete = async (programId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce programme ?')) return;

    try {
      const token = localStorage.getItem('token'); // ➜ récupérer le token !

      const res = await fetch(`http://localhost:5000/api/programs/${programId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`, // ➜ envoyer le token
        },
      });

      if (!res.ok) throw new Error('Erreur lors de la suppression du programme');

      alert('Programme supprimé avec succès.');

      // On force un refetch
      queryClient.invalidateQueries(['programs']);
    } catch (error) {
      console.error(error);
      alert('Erreur lors de la suppression du programme.');
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Liste des Programmes</h1>

        {isLoading && <p className="text-slate-600">Chargement des programmes...</p>}
        {isError && <p className="text-red-500">Erreur lors du chargement des programmes.</p>}

        <ul className="space-y-2">
          {data?.map((prog) => (
            <li
              key={prog.id}
              className="flex justify-between items-center p-4 bg-white rounded shadow"
            >
              <div>
                <strong>{prog.title}</strong> ({prog.date}) - {prog.start_time} → {prog.end_time}
              </div>

              {/* 👉 Si user professionnel → afficher les boutons */}
              {userRole === 'professionnel' && (
                <div className="flex gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                    onClick={() => handleEdit(prog.id)}
                  >
                    <Edit className="w-4 h-4 mr-2" /> Modifier
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                    onClick={() => handleDelete(prog.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Supprimer
                  </Button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default Programs;
