import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Clock, Users, Euro, Share2, Heart, PlayCircle, Trash2, Pencil } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [participants, setParticipants] = useState(0);

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const userRole = user?.role;

  useEffect(() => {
    fetch(`http://localhost:5000/api/events/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Événement introuvable');
        return res.json();
      })
      .then(data => {
        setEvent(data);
        setParticipants(data.attendees || 0);
      })
      .catch(err => {
        console.error(err);
        toast({ title: 'Erreur', description: err.message, variant: 'destructive' });
      })
      .finally(() => setLoading(false));
  }, [id, toast]);

  const handlePayment = () => {
    toast({
      title: "Redirection vers le paiement",
      description: "Vous allez être redirigé vers la page de réservation.",
    });
    navigate(`/events/${id}/register`);
  };

  const handleDelete = async () => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet événement ?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/events/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error("Erreur lors de la suppression");

      toast({ title: "Événement supprimé", description: "Redirection en cours..." });
      navigate('/events');
    } catch (error) {
      toast({ title: "Erreur", description: error.message, variant: 'destructive' });
    }
  };

  if (loading) return <div>Chargement…</div>;
  if (!event) return <div>Événement non trouvé.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-rose-50 to-teal-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Card className="overflow-hidden bg-white/70 backdrop-blur-sm shadow-xl border-white/50 mb-8">
          <div className="relative h-64 md:h-80">
            <img src={`http://localhost:5000/uploads/${event.image}`} alt={event.title} className="w-full h-full object-cover" />
            <div className="absolute top-4 right-4 flex gap-2">
              <Button size="sm" variant="secondary" className="bg-white/90"><Share2 /></Button>
              <Button size="sm" variant="secondary" className="bg-white/90"><Heart /></Button>
            </div>
            <div className="absolute bottom-4 left-4">
              <span className="bg-violet-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {event.category}
              </span>
            </div>
          </div>

          <CardContent className="p-6">
            <h1 className="text-3xl font-bold text-slate-800 mb-4">{event.title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-3 text-slate-600">
                <div className="flex items-center"><Calendar /><span className="ml-2">{new Date(event.date_start).toLocaleDateString()}</span></div>
                <div className="flex items-center"><Clock /><span className="ml-2">{new Date(event.date_start).toLocaleTimeString()} – {new Date(event.date_end).toLocaleTimeString()}</span></div>
                <div className="flex items-center"><MapPin /><span className="ml-2">{event.lieu?.nom}, {event.lieu?.ville}</span></div>
              </div>
              <div className="space-y-3 text-slate-600">
                <div className="flex items-center"><Users /><span className="ml-2">{participants} participants</span></div>
                <div className="flex items-center"><Euro /><span className="ml-2 text-2xl font-bold">{event.price} €</span></div>
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">{event.description}</p>

            <div className="flex gap-4 flex-wrap">
              <Button onClick={handlePayment} className="flex-1 bg-gradient-to-r from-violet-500 to-purple-600 text-white">
                <Euro className="mr-2" /> Réserver – {event.price} €
              </Button>

              {userRole === 'professionnel' && (
                <>
                  <Link to={`/create-program/event/${id}`}>
                    <Button variant="outline" className="border-violet-300 text-violet-600 hover:bg-violet-50">
                      Ajouter des programmes
                    </Button>
                  </Link>

                  <Link to={`/events/edit/${id}`}>
                    <Button variant="outline" className="border-emerald-300 text-emerald-600 hover:bg-emerald-50 flex items-center">
                      <Pencil className="w-4 h-4 mr-2" /> Modifier
                    </Button>
                  </Link>

                  <Button
                    variant="outline"
                    className="border-red-300 text-red-600 hover:bg-red-50 flex items-center"
                    onClick={handleDelete}
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Supprimer
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Description longue */}
        {event.description && (
          <Card className="bg-white/70 backdrop-blur-sm shadow-lg border-white/50 mb-8">
            <CardHeader><CardTitle>Description détaillée</CardTitle></CardHeader>
            <CardContent><p>{event.description}</p></CardContent>
          </Card>
        )}

        {/* Programme */}
        {event.programmes?.length > 0 && (
          <Card className="bg-white/70 backdrop-blur-sm shadow-lg border-white/50 mb-8">
            <CardHeader><CardTitle><PlayCircle /> Programme détaillé</CardTitle></CardHeader>
            <CardContent>
              {event.programmes.map((item, idx) => (
                <div key={idx} className="mb-6 border-l-2 border-violet-200 pl-6 relative">
                  <div className="absolute -left-3 top-0 w-6 h-6 bg-violet-500 rounded-full text-white flex items-center justify-center">
                    {idx + 1}
                  </div>
                  <div className="bg-violet-50 rounded-lg p-4">
                    <div className="md:flex justify-between mb-3">
                      <div className="flex items-center mb-2 md:mb-0">
                        <span className="bg-violet-500 text-white px-3 py-1 rounded-full mr-3">{new Date(item.date).toLocaleTimeString()}</span>
                        <h3 className="font-semibold">{item.title}</h3>
                      </div>
                      <div className="flex items-center text-sm text-slate-600"><MapPin className="mr-1" /> {item.location || event.lieu?.nom}</div>
                    </div>
                    {item.description && <p className="text-slate-600">{item.description}</p>}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        <Card className="bg-white/70 backdrop-blur-sm shadow-lg border-white/50">
          <CardContent>
            <div className="flex gap-3">
              <Link to="/events">
                <Button variant="outline">Voir les autres événements</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default EventDetail;
