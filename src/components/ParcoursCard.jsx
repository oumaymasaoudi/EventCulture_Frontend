import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Users, Star, Eye, Route } from 'lucide-react';

const ParcoursCard = ({ parcours, ...props }) => {
  const parcoursData = parcours || {
    id: props.id || '',
    title: props.title || '',
    description: props.description || '',
    duration: props.duration || '',
    difficulty: props.difficulty || '',
    participants: props.participants || 0,
    rating: props.rating || 4.5,
    image: props.image || '',
    theme: props.theme || 'Culture',
    sitesCount: props.sitesCount || props.stops || 0
  };

  return (
    <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={parcoursData.image ? `http://localhost:5000/uploads/${parcoursData.image}` : 'https://via.placeholder.com/600x400?text=Image+non+disponible'}
          alt={parcoursData.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-gradient-to-r from-emerald-500 to-teal-600 text-black px-3 py-1 rounded-full text-xs font-medium">
            {parcoursData.theme}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex items-center bg-white/50 rounded-full px-2 py-1">
          <Star className="w-3 h-3 text-orange-400 mr-1" />
          <span className="text-black text-xs font-medium">{parcoursData.rating}</span>
        </div>
        <div className="absolute bottom-3 right-3">
          <Link 
            to={`/parcours/${parcoursData.id}`}
            className="bg-white/90 hover:bg-white text-slate-700 p-2 rounded-full transition-colors"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors">
          {parcoursData.title}
        </h3>
        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
          {parcoursData.description}
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-slate-600 text-sm">
            <Clock className="w-4 h-4 mr-2 text-emerald-500" />
            <span>{parcoursData.duration} min</span>
          </div>
          <div className="flex items-center text-slate-600 text-sm">
            <Route className="w-4 h-4 mr-2 text-emerald-500" />
            <span>{parcoursData.sitesCount} sites culturels</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-slate-600 text-sm">
              <Users className="w-4 h-4 mr-2 text-emerald-500" />
              <span>{parcoursData.participants} participants</span>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              parcoursData.difficulty.toLowerCase() === 'facile' ? 'bg-green-100 text-green-700' :
              parcoursData.difficulty.toLowerCase() === 'modéré' ? 'bg-orange-100 text-orange-700' :
              'bg-red-100 text-red-700'
            }`}>
              {parcoursData.difficulty}
            </span>
          </div>
        </div>
        
        <Link 
          to={`/parcours/${parcoursData.id}`}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-black py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
        >
          <Eye className="w-4 h-4 mr-2" />
          Voir les détails
        </Link>
      </div>
    </div>
  );
};

export default ParcoursCard;
