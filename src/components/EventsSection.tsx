import React, { useEffect, useState } from 'react';
import { Filter, Search, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import EventCard from './EventCard';
import axios from 'axios';

const EventsSection = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/events')
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.error('Erreur lors du chargement des événements:', err);
      });
  }, []);

  return (
    <section id="events" className="py-16 bg-cultural-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-cultural-900 mb-4">
            Événements culturels à découvrir
          </h2>
          <p className="text-lg text-cultural-600 max-w-2xl mx-auto">
            Explorez notre sélection d'événements culturels exceptionnels organisés sur tout le territoire français
          </p>
        </div>

        {/* Filtres et recherche */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cultural-400 w-5 h-5" />
              <Input
  placeholder="Rechercher un événement, lieu, artiste..."
  className="pl-10 py-3 border-2 border-purple-500 rounded-lg text-black placeholder:text-[#5C4033]"
  style={{
    backgroundColor: 'white',
    color: 'black'
  }}
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>

            </div>
          </div>
          <div className="flex gap-2">
            <Button
              className="flex items-center bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-lg transition"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filtres
            </Button>
            <Button
              className="flex items-center bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-lg transition"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Dates
            </Button>
          </div>
        </div>

        {/* Grille d'événements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {events
            .filter((event) =>
              event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              event.description.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((event) => (
              <div key={event.id} className="animate-fade-in">
                <EventCard {...event} />
              </div>
            ))}
        </div>

        <div className="text-center">
          <Link to="/events">
            <Button size="lg" variant="outline" className="text-purple-700 border-2 border-purple-700 hover:bg-purple-100">
              Voir tous les événements
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
