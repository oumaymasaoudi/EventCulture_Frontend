import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Heart, MapPin, Clock, Euro } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const fetchSites = async () => {
  const response = await axios.get('http://localhost:5000/api/sites');
  return response.data;
};

const Sites = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.role;
  const userId = user?.id;

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [favorites, setFavorites] = useState([]);

  const { data: sites, isLoading, isError } = useQuery({
    queryKey: ['sites'],
    queryFn: fetchSites,
  });

  // 🔁 Charger les favoris au début
  useEffect(() => {
    const fetchFavoris = async () => {
      if (role !== 'participant' || !userId) return;

      try {
        const res = await axios.get(`http://localhost:5000/api/favoris/user/${userId}`);
        const favSiteIds = res.data
          .filter(fav => fav.siteId)
          .map(fav => fav.siteId);
        setFavorites(favSiteIds);
      } catch (err) {
        console.error('Erreur chargement favoris :', err);
      }
    };

    fetchFavoris();
  }, [userId, role]);

  // ✅ Ajouter ou retirer un favori
  const toggleFavorite = async (siteId) => {
    const isFav = favorites.includes(siteId);

    try {
      if (isFav) {
        await axios.delete('http://localhost:5000/api/favoris/remove', {
          data: { userId, siteId },
        });
        setFavorites(prev => prev.filter(id => id !== siteId));
      } else {
        await axios.post('http://localhost:5000/api/favoris', {
          userId,
          siteId,
        });
        setFavorites(prev => [...prev, siteId]);
      }
    } catch (err) {
      console.error('Erreur favori :', err);
      alert("Erreur lors du changement de favori");
    }
  };

  const handleEdit = (siteId) => navigate(`/create-site/${siteId}`);

  const handleDelete = async (siteId) => {
    if (!window.confirm('Êtes-vous sûr ?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/sites/${siteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Site supprimé.');
      queryClient.invalidateQueries(['sites']);
    } catch (err) {
      console.error(err);
      alert("Erreur suppression");
    }
  };

  if (isLoading) return <div>Chargement des sites...</div>;
  if (isError) return <div>Erreur lors du chargement.</div>;

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-black mb-6">Sites Culturels</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sites.map(site => (
            <div
              key={site.id}
              className="bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700"
            >
              <img src={`http://localhost:5000/uploads/${site.image}`} alt={site.name} className="w-full h-48 object-cover" />

              <div className="p-5">
                <h2 className="text-xl font-semibold text-black mb-1">{site.name}</h2>
                <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                  <MapPin className="w-4 h-4" /> <span>{site.location}</span>
                </div>
                <p className="text-slate-300 text-sm mb-3 line-clamp-2">{site.description}</p>
                <div className="flex items-center gap-4 text-slate-400 text-sm mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" /> {site.duration || '1h'}
                  </div>
                  <div className="flex items-center gap-1">
                    <Euro className="w-4 h-4" />
                    <span className="font-semibold text-blue-400">
                      {site.tarif === '0' || site.tarif === 0 || !site.tarif ? 'Gratuit' : `${site.tarif} €`}
                    </span>
                  </div>
                </div>

                {/* Pour les professionnels */}
                {role === 'professionnel' && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-600 text-green-600 hover:bg-green-600 hover:text-black"
                      onClick={() => handleEdit(site.id)}
                    >
                      <Edit className="w-4 h-4 mr-2" /> Modifier
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-600 text-red-600 hover:bg-red-600 hover:text-black"
                      onClick={() => handleDelete(site.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" /> Supprimer
                    </Button>
                  </div>
                )}

                {/* Pour les participants */}
                {role === 'participant' && (
                  <button
                    onClick={() => toggleFavorite(site.id)}
                    className={`mt-2 w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${
                      favorites.includes(site.id)
                        ? 'bg-red-500 border-red-500 text-black'
                        : 'border-slate-600 text-slate-400 hover:text-red-500 hover:border-red-500'
                    }`}
                  >
                    <Heart
                      className="w-5 h-5"
                      fill={favorites.includes(site.id) ? 'currentColor' : 'none'}
                    />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Sites;
