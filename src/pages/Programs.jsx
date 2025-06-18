import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Calendar, Clock, MapPin, Folder } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Fonction pour récupérer les programmes
const fetchPrograms = async () => {
  const response = await axios.get('http://localhost:5000/api/programs');
  return response.data;
};

const Programs = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const userRole = user?.role || '';

  const { data, isLoading, isError } = useQuery({
    queryKey: ['programs'],
    queryFn: fetchPrograms
  });

  const handleEdit = (programId) => {
    navigate(`/create-program/edit/${programId}`);
  };

  const handleDelete = async (programId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce programme ?')) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/programs/${programId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Erreur lors de la suppression du programme');
      alert('Programme supprimé avec succès.');
      queryClient.invalidateQueries(['programs']);
    } catch (error) {
      console.error(error);
      alert('Erreur lors de la suppression.');
    }
  };

  // ✅ Regrouper les programmes par event_id
  const groupedPrograms = data?.reduce((acc, prog) => {
    const eventId = prog.event?.id || 'inconnu';
    if (!acc[eventId]) {
      acc[eventId] = {
        event: prog.event,
        programs: []
      };
    }
    acc[eventId].programs.push(prog);
    return acc;
  }, {});

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-slate-800 mb-8">📋 Programmes Culturels</h1>

        {isLoading && <p className="text-slate-500">Chargement des programmes...</p>}
        {isError && <p className="text-red-500">Erreur lors du chargement des données.</p>}

        <div className="space-y-10">
          {Object.entries(groupedPrograms || {}).map(([eventId, group], index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-md shadow-lg p-6 rounded-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-violet-700 font-semibold">
                  {group.event?.title || 'Événement inconnu'}
                </CardTitle>
                <p className="text-sm text-gray-600 italic">
                  <MapPin className="inline w-4 h-4 mr-1" />
                  {group.event?.lieu?.nom || 'Lieu non défini'}
                </p>
              </CardHeader>

              <CardContent className="space-y-4 mt-4">
                {group.programs.map((prog) => (
                  <div key={prog.id} className="border p-4 rounded-lg bg-violet-50 shadow-sm">
                    <p className="text-sm flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> <strong>Date :</strong> {prog.date}
                    </p>
                    <p className="text-sm flex items-center gap-2">
                      <Clock className="w-4 h-4" /> <strong>Heure :</strong> {prog.start_time} - {prog.end_time}
                    </p>
                    <p className="text-sm flex items-center gap-2">
                      <Folder className="w-4 h-4" /> <strong>Catégorie :</strong> {prog.category}
                    </p>
                    {prog.description && (
                      <p className="text-sm text-slate-700 mt-2">{prog.description}</p>
                    )}

                    {userRole === 'professionnel' && (
                      <div className="flex gap-2 mt-3">
                        <Button
                          size="sm"
                          onClick={() => handleEdit(prog.id)}
                          variant="outline"
                          className="border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white"
                        >
                          <Edit className="w-4 h-4 mr-1" /> Modifier
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleDelete(prog.id)}
                          variant="outline"
                          className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                        >
                          <Trash2 className="w-4 h-4 mr-1" /> Supprimer
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Programs;
