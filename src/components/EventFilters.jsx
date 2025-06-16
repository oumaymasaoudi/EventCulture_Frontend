
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Music, Palette, Camera } from 'lucide-react';

const EventFilters = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    { id: 'all', label: 'Tous', icon: Calendar },
    { id: 'Musique', label: 'Musique', icon: Music },
    { id: 'Exposition', label: 'Expositions', icon: Palette },
    { id: 'Visite', label: 'Visites', icon: MapPin },
    { id: 'Spectacle', label: 'Spectacles', icon: Camera },
    { id: 'Conférence', label: 'Conférences', icon: Users }
  ];

  return (
    <div className="space-y-3">
      <h4 className="font-medium text-slate-700 mb-3">Catégories</h4>
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "ghost"}
            className={`w-full justify-start text-left ${
              selectedCategory === category.id 
                ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-black shadow-lg' 
                : 'text-slate-600 hover:bg-violet-50 hover:text-violet-700'
            }`}
            onClick={() => onCategoryChange(category.id)}
          >
            <Icon className="w-4 h-4 mr-2" />
            {category.label}
          </Button>
        );
      })}
    </div>
  );
};

export default EventFilters;
