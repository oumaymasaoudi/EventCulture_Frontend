import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Users, TrendingUp, Plus } from 'lucide-react';

const Dashboard = () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.role;

  const [myEvents, setMyEvents] = useState([]);
  const [myLieux, setMyLieux] = useState([]);
  const [myParticipations, setMyParticipations] = useState([]);
  const [recentEvents, setRecentEvents] = useState([]);
  const [myFavoris, setMyFavoris] = useState([]);

  useEffect(() => {
    if (!user || !token) return;

    fetch(`http://localhost:5000/api/participations?user_id=${user.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setMyParticipations(data))
      .catch((err) => console.error(err));

    if (role === 'participant') {
      fetch(`http://localhost:5000/api/favoris/user/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setMyFavoris(data))
        .catch((err) => console.error(err));
    }

    if (role === 'professionnel') {
      fetch(`http://localhost:5000/api/events?user_id=${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setMyEvents(data))
        .catch((err) => console.error(err));

      fetch(`http://localhost:5000/api/lieux?user_id=${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setMyLieux(data))
        .catch((err) => console.error(err));

      fetch(`http://localhost:5000/api/events/recent?exclude_user_id=${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setRecentEvents(data))
        .catch((err) => console.error(err));
    }
  }, [user, token, role]);

  return (
    <div className="min-h-screen font-sans text-gray-800" style={{ backgroundColor: '#f5f0fa' }}>
      <Header />
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Tableau de Bord</h1>
            <p className="text-gray-600 text-lg">Gérez vos événements et suivez vos performances</p>
          </div>

          {role === 'professionnel' && (
            <button
              className="mt-4 lg:mt-0 bg-indigo-600 hover:bg-indigo-700 text-black text-lg font-semibold px-6 py-3 shadow-md rounded-lg flex items-center transition"
              onClick={() => (window.location.href = '/create-event')}
            >
              <Plus className="w-5 h-5 mr-2" />
              Nouvel événement
            </button>
          )}
        </div>

        {role === 'participant' && (
          <>
            {/* Participations */}
            <Card className="bg-white rounded-xl shadow-lg border border-gray-300 mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Mes Participations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myParticipations.filter(p => p.Event).length > 0 ? (
                    myParticipations.filter(p => p.Event).map(p => (
                      <div key={p.id} className="p-4 bg-gray-50 rounded-lg border hover:bg-gray-200 transition">
                        <h4 className="font-semibold text-lg text-gray-800">{p.Event.title}</h4>
                        <p className="text-sm text-gray-600">
                          {p.Event.date_start
                            ? `${new Date(p.Event.date_start).toLocaleDateString()} → ${new Date(p.Event.date_end).toLocaleDateString()}`
                            : 'Dates non disponibles'}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">Vous n'avez pas encore participé à des événements.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Favoris */}
            <Card className="bg-white rounded-xl shadow-lg border border-gray-300 mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Mes Favoris</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myFavoris.length > 0 ? (
                    myFavoris.map((fav) => (
                      <div
                        key={fav.id}
                        className="p-4 bg-gray-50 rounded-lg border border-gray-300 hover:bg-gray-200 transition"
                      >
                        {fav.Program ? (
                          <>
                            <h4 className="font-semibold text-indigo-700 text-lg">
                              🎭 Programme : {fav.Program.title}
                            </h4>
                            <p className="text-gray-600 text-sm">
                              {fav.Program.description || 'Pas de description'}
                            </p>
                          </>
                        ) : fav.FavoriSite ? (
                          <>
                            <h4 className="font-semibold text-blue-700 text-lg">
                              🏛️ Site : {fav.FavoriSite.name || 'Nom du site inconnu'}
                            </h4>
                            <p className="text-gray-600 text-sm">
                              {fav.FavoriSite.description || 'Pas de description'}
                            </p>
                          </>
                        ) : (
                          <p className="text-gray-500 italic">Aucune information disponible.</p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">Aucun contenu favori enregistré.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* PROFESSIONNEL */}
        {role === 'professionnel' && (
          <>
            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { title: 'Mes Événements', value: myEvents.length, icon: Calendar, gradient: 'from-indigo-500 to-indigo-700' },
                { title: 'Participants Total', value: myParticipations.length, icon: Users, gradient: 'from-green-500 to-green-700' },
                { title: 'Mes Lieux', value: myLieux.length, icon: MapPin, gradient: 'from-purple-500 to-purple-700' },
                { title: 'Mes Participations', value: myParticipations.length, icon: TrendingUp, gradient: 'from-pink-500 to-pink-700' },
              ].map((stat, idx) => (
                <Card key={idx} className="bg-white rounded-xl shadow-lg border border-gray-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                        <p className="text-4xl font-extrabold text-gray-900">{stat.value}</p>
                      </div>
                      <div className={`w-12 h-12 bg-gradient-to-r ${stat.gradient} rounded-lg flex items-center justify-center`}>
                        <stat.icon className="w-6 h-6 text-black" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Événements récents */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="bg-white rounded-xl shadow-lg border border-gray-300">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-900">Événements Récents (autres)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentEvents.length > 0 ? (
                        recentEvents.map((event) => (
                          <div key={event.id} className="p-4 bg-gray-50 rounded-lg border hover:bg-gray-200 transition">
                            <h4 className="font-semibold text-lg text-gray-800">{event.title}</h4>
                            <p className="text-sm text-gray-600">
                              {new Date(event.date_start).toLocaleDateString()} → {new Date(event.date_end).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">Catégorie: {event.category}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 italic">Aucun événement récent disponible.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Actions rapides */}
              <div>
                <div className="bg-white rounded-xl shadow-lg border border-gray-300 p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Actions rapides</h2>
                  <div className="space-y-3">
                    {[
                      { label: '+ Nouvel événement', url: '/create-event' },
                      { label: '+ Nouveau lieu', url: '/create-lieu' },
                      { label: '+ Nouveau parcours', url: '/create-parcours' },
                      { label: '+ Nouveau site', url: '/create-site' },
                    ].map((action, idx) => (
                      <button
                        key={idx}
                        className="w-full text-left bg-indigo-600 hover:bg-indigo-700 text-black font-semibold py-2 px-4 rounded-lg transition"
                        onClick={() => (window.location.href = action.url)}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
