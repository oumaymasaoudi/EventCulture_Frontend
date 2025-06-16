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

  useEffect(() => {
    if (!user || !token) return;

    // MES participations
    fetch(`http://localhost:5000/api/participations?user_id=${user.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setMyParticipations(data))
      .catch((err) => console.error(err));

    if (role === 'professionnel') {
      // MES événements
      fetch(`http://localhost:5000/api/events?user_id=${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setMyEvents(data))
        .catch((err) => console.error(err));

      // MES lieux
      fetch(`http://localhost:5000/api/lieux?user_id=${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setMyLieux(data))
        .catch((err) => console.error(err));

      // événements récents (des autres)
      fetch(`http://localhost:5000/api/events/recent?exclude_user_id=${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setRecentEvents(data))
        .catch((err) => console.error(err));
    }
  }, [user, token, role]);

  return (
    <div
      className="min-h-screen font-sans text-gray-800"
      style={{ backgroundColor: '#f5f0fa' }} // fond mauve très clair
    >
      <Header />

      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
              Tableau de Bord
            </h1>
            <p className="text-gray-600 text-lg">
              Gérez vos événements et suivez vos performances
            </p>
          </div>

          {role === 'professionnel' && (
            <button
              className="mt-4 lg:mt-0 bg-indigo-600 hover:bg-indigo-700 text-black text-lg font-semibold px-6 py-3 shadow-md rounded-lg flex items-center transition !border-0 !bg-indigo-600"
              onClick={() => (window.location.href = '/create-event')}
            >
              <Plus className="w-5 h-5 mr-2" />
              Nouvel événement
            </button>
          )}
        </div>

        {/* PARTICIPANT */}
        {role === 'participant' && (
          <Card className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-300 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 font-bold">Mes Participations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myParticipations.length > 0 ? (
                  myParticipations.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-300 hover:bg-gray-200 transition"
                    >
                      <div>
                        <h4 className="font-semibold text-gray-800 text-lg">
                          {p.Event?.title || 'Événement inconnu'}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {p.Event?.date_start
                            ? `${new Date(p.Event?.date_start).toLocaleDateString()} → ${new Date(
                                p.Event?.date_end
                              ).toLocaleDateString()}`
                            : 'Dates non disponibles'}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic">Vous n'avez pas encore participé à des événements.</p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* PROFESSIONNEL */}
        {role === 'professionnel' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[ 
                { title: 'Mes Événements', value: myEvents.length, icon: Calendar, gradient: 'from-indigo-500 to-indigo-700' },
                { title: 'Participants Total', value: myParticipations.length, icon: Users, gradient: 'from-green-500 to-green-700' },
                { title: 'Mes Lieux', value: myLieux.length, icon: MapPin, gradient: 'from-purple-500 to-purple-700' },
                { title: 'Mes Participations', value: myParticipations.length, icon: TrendingUp, gradient: 'from-pink-500 to-pink-700' },
              ].map((stat, idx) => (
                <Card
                  key={idx}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                        <p className="text-4xl font-extrabold text-gray-900">{stat.value}</p>
                      </div>
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${stat.gradient} rounded-lg flex items-center justify-center`}
                      >
                        <stat.icon className="w-6 h-6 text-black" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Events + Actions Rapides */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-300">
                  <CardHeader>
                    <CardTitle className="text-2xl text-gray-900 font-bold">Événements Récents (autres)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentEvents.length > 0 ? (
                        recentEvents.map((event) => (
                          <div
                            key={event.id}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-300 hover:bg-gray-200 transition"
                          >
                            <div>
                              <h4 className="font-semibold text-gray-800 text-lg">{event.title}</h4>
                              <p className="text-gray-600 text-sm">
                                {new Date(event.date_start).toLocaleDateString()} →{' '}
                                {new Date(event.date_end).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-gray-600 text-sm mt-1">Catégorie: {event.category}</p>
                            </div>
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
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-300 p-6">
                  <h2 className="text-2xl text-gray-900 font-bold mb-4">Actions rapides</h2>
                  <div className="space-y-3">
                    {[
                      { label: '+ Nouvel événement', url: '/create-event' },
                      { label: '+ Nouveau lieu', url: '/create-lieu' },
                      { label: '+ Nouveau parcours', url: '/create-parcours' },
                      { label: '+ Nouveau site', url: '/create-site' },
                    ].map((action, idx) => (
                      <button
                        key={idx}
                        className="w-full justify-start bg-indigo-600 hover:bg-indigo-700 text-black font-semibold py-2 px-4 rounded-lg transition text-left !border-0"
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
