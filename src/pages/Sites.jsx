import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const fetchSites = async () => {
  const response = await axios.get('http://localhost:5000/api/sites');
  return response.data;
};

const Sites = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['sites'],
    queryFn: fetchSites
  });

  const handleEdit = (siteId) => {
    navigate(`/create-site/${siteId}`);
  };

  const handleDelete = async (siteId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce site ?')) return;

    try {
      const token = localStorage.getItem('token');

      await axios.delete(`http://localhost:5000/api/sites/${siteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Site supprimé avec succès.');
      queryClient.invalidateQueries(['sites']);
    } catch (error) {
      console.error(error);
      alert('Erreur lors de la suppression du site.');
    }
  };

  if (isLoading) return <div>Chargement des sites...</div>;
  if (isError) return <div>Erreur lors du chargement des sites.</div>;

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Liste des sites</h1>
        <ul className="space-y-2">
          {data.map((site) => (
            <li key={site.id} className="p-4 bg-white rounded shadow flex justify-between items-center">
              <div>
                <strong>{site.name}</strong> ({site.categorie})
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                  onClick={() => handleEdit(site.id)}
                >
                  <Edit className="w-4 h-4 mr-2" /> Modifier
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                  onClick={() => handleDelete(site.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Supprimer
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default Sites;
