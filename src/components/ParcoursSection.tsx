import React, { useEffect, useState } from 'react';
import { MapPin, Clock, QrCode, Route } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ParcoursSection = () => {
  const [parcoursList, setParcoursList] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/parcours')
      .then((res) => setParcoursList(res.data))
      .catch((err) => console.error("Erreur lors du chargement des parcours :", err));
  }, []);

  return (
    <section id="parcours" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-cultural-900 mb-4">
            Parcours culturels intelligents
          </h2>
          <p className="text-lg text-cultural-600 max-w-2xl mx-auto">
            Suivez nos itinéraires thématiques conçus pour vous faire découvrir le patrimoine français 
            de manière cohérente et enrichissante.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {parcoursList.map((parcour) => (
            <Card key={parcour.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 rounded-xl">
              <div className="relative overflow-hidden h-48">
                <img 
                  src={parcour.image ? `http://localhost:5000/uploads/${parcour.image}` : 'https://via.placeholder.com/600x400?text=Image+non+disponible'}
                  alt={parcour.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium text-white shadow ${
                    parcour.difficulty === 'facile' ? 'bg-green-600' :
                    parcour.difficulty === 'modéré' ? 'bg-yellow-600' : 'bg-red-600'
                  }`}>
                    {parcour.difficulty.charAt(0).toUpperCase() + parcour.difficulty.slice(1)}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                    <QrCode className="w-4 h-4 text-black" />
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-cultural-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {parcour.title}
                </h3>
                <p className="text-cultural-600 text-sm mb-4 line-clamp-2">
                  {parcour.description}
                </p>

                <div className="grid grid-cols-2 gap-3 text-sm text-cultural-500">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-emerald-500" />
                    <span>{parcour.duration} min</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-emerald-500" />
                    <span>{parcour.Sites?.length || 0} étapes</span>
                  </div>
                  <div className="flex items-center">
                    <Route className="w-4 h-4 mr-2 text-emerald-500" />
                    <span>{parcour.Lieu?.ville || 'Inconnu'}</span>
                  </div>
                  <div className="flex items-center">
                    <QrCode className="w-4 h-4 mr-2 text-emerald-500" />
                    <span>QR codes inclus</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="px-6 pb-6">
                <Link to={`/parcours/${parcour.id}`} className="w-full">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Voir le parcours
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/parcours">
            <Button size="lg" variant="outline">
              Découvrir tous les parcours
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ParcoursSection;
