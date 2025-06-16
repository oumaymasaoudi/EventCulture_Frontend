
import React from 'react';
import { Calendar, MapPin, QrCode, Sparkles, Route, Plus, Eye, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-violet-100 via-purple-50 to-indigo-100 py-20 md:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-violet-200/50 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 right-20 w-32 h-32 bg-purple-200/50 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-indigo-200/50 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/40 shadow-lg">
            <Sparkles className="w-5 h-5 mr-2 text-violet-600" />
            <span className="text-sm font-medium text-violet-800">Nouvelle plateforme culturelle nationale</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight text-slate-800">
            Explorez la culture
            <span className="block bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              de votre territoire
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Découvrez les événements culturels, suivez des parcours intelligents et plongez dans l'histoire 
            de nos lieux patrimoniaux grâce aux QR codes interactifs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/events">
              <Button size="lg" className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-black shadow-xl">
                <Calendar className="w-5 h-5 mr-2" />
                Découvrir les événements
              </Button>
            </Link>
            <Link to="/parcours">
              <Button size="lg" variant="outline" className="border-violet-300 text-violet-700 hover:bg-violet-50 bg-white/60 backdrop-blur-sm shadow-lg">
                <Route className="w-5 h-5 mr-2" />
                Explorer les parcours
              </Button>
            </Link>
          </div>

          {/* Navigation rapide */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <Link to="/create-event" className="group">
              <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-4 border border-white/30 shadow-lg hover:shadow-xl transition-all group-hover:bg-white/60">
                <Plus className="w-8 h-8 mx-auto mb-2 text-violet-600" />
                <div className="text-sm font-medium text-slate-700">Créer un événement</div>
              </div>
            </Link>
            <Link to="/create-parcours" className="group">
              <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-4 border border-white/30 shadow-lg hover:shadow-xl transition-all group-hover:bg-white/60">
                <Route className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
                <div className="text-sm font-medium text-slate-700">Créer un parcours</div>
              </div>
            </Link>
            <Link to="/create-lieu" className="group">
              <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-4 border border-white/30 shadow-lg hover:shadow-xl transition-all group-hover:bg-white/60">
                <MapPin className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-sm font-medium text-slate-700">Ajouter un lieu</div>
              </div>
            </Link>

            <Link to="/create-program" className="group">
  <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-4 border border-white/30 shadow-lg hover:shadow-xl transition-all group-hover:bg-white/60">
    <ClipboardList className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
    <div className="text-sm font-medium text-slate-700">Créer un programme</div>
  </div>
</Link>

            <Link to="/pricing" className="group">
              <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-4 border border-white/30 shadow-lg hover:shadow-xl transition-all group-hover:bg-white/60">
                <Eye className="w-8 h-8 mx-auto mb-2 text-rose-600" />
                <div className="text-sm font-medium text-slate-700">Voir les tarifs</div>
              </div>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
            <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg">
              <div className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">250+</div>
              <div className="text-slate-600">Événements culturels</div>
            </div>
            <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg">
              <div className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">50+</div>
              <div className="text-slate-600">Parcours thématiques</div>
            </div>
            <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg">
              <div className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">150+</div>
              <div className="text-slate-600">Lieux patrimoniaux</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
