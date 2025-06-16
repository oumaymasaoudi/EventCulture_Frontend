
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Target, Award, Heart } from 'lucide-react';

const About = () => {
  const stats = [
    { number: '500+', label: 'Événements organisés', icon: Target },
    { number: '50K+', label: 'Visiteurs satisfaits', icon: Users },
    { number: '150+', label: 'Lieux patrimoniaux', icon: Award },
    { number: '95%', label: 'Taux de satisfaction', icon: Heart }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            À propos d'EventCulture
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Une initiative du Ministère de la Culture pour démocratiser l'accès au patrimoine 
            et valoriser la richesse culturelle de nos territoires
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl border border-white/50 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Notre Mission</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                EventCulture naît de la volonté de créer un pont numérique entre le patrimoine français 
                et ses citoyens. Notre plateforme révolutionne l'accès à la culture en proposant des 
                parcours intelligents et des expériences immersives.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed">
                Chaque QR code devient une porte d'entrée vers l'histoire, chaque parcours raconte 
                une époque, chaque événement tisse le lien social autour de notre héritage commun.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800" 
                alt="Patrimoine français"
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="text-center bg-white/70 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-black" />
                  </div>
                  <div className="text-3xl font-bold text-slate-800 mb-2">{stat.number}</div>
                  <div className="text-slate-600 text-sm">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Accessibilité</h3>
              <p className="text-slate-600">
                Rendre la culture accessible à tous, sans barrière technique ni géographique
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Innovation</h3>
              <p className="text-slate-600">
                Utiliser la technologie pour enrichir l'expérience culturelle traditionnelle
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Transmission</h3>
              <p className="text-slate-600">
                Préserver et transmettre notre patrimoine aux générations futures
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Team Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl border border-white/50">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">L'équipe EventCulture</h2>
          <p className="text-lg text-slate-600 text-center max-w-3xl mx-auto">
            Notre équipe pluridisciplinaire réunit des experts en patrimoine, des développeurs passionnés, 
            des designers UX et des spécialistes de la médiation culturelle. Ensemble, nous créons des 
            expériences numériques qui révèlent la beauté de notre héritage culturel.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
