import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Euro, Eye } from 'lucide-react';

const EventCard = ({
  id,
  title,
  description,
  category,
  date_start,
  date_end,
  price,
  image, // <-- on utilise "image" au lieu de "image_url"
  lieu
}) => {
  const imageSrc = image ? `http://localhost:5000/uploads/${image}` : '/placeholder.jpg';

  return (
    <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-gradient-to-r from-violet-500 to-purple-600 text-black px-3 py-1 rounded-full text-xs font-medium">
            {category}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <Link
            to={`/events/${id}`}
            className="bg-white/90 hover:bg-white text-slate-700 p-2 rounded-full transition-colors group/btn"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-violet-600 transition-colors">
          {title}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-slate-600 text-sm">
            <Calendar className="w-4 h-4 mr-2 text-violet-500" />
            <span>
              {date_start ? new Date(date_start).toLocaleDateString() : 'N/A'} →{' '}
              {date_end ? new Date(date_end).toLocaleDateString() : 'N/A'}
            </span>
          </div>
          <div className="flex items-center text-slate-600 text-sm">
            <MapPin className="w-4 h-4 mr-2 text-violet-500" />
            <span>
              {lieu ? `${lieu.nom} (${lieu.ville})` : 'Lieu non renseigné'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-slate-600 text-sm">
              <Users className="w-4 h-4 mr-2 text-violet-500" />
              <span>0 participants</span>
            </div>
            <div className="flex items-center text-violet-600 font-semibold">
              <Euro className="w-4 h-4 mr-1" />
              <span>{price ? `${price} €` : 'Gratuit'}</span>
            </div>
          </div>
        </div>

        <Link
          to={`/events/${id}`}
          className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-black py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
        >
          <Eye className="w-4 h-4 mr-2" />
          Voir les détails
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
