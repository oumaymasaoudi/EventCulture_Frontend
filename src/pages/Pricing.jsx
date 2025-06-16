
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PricingCard from '@/components/PricingCard';
import { Check } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Visiteur',
      price: 'Gratuit',
      description: 'Pour les particuliers qui souhaitent découvrir la culture',
      features: [
        'Accès aux événements publics',
        'Consultation des parcours',
        'Scan des QR codes',
        'Support communautaire'
      ],
      popular: false,
      color: 'from-slate-500 to-slate-600'
    },
    {
      name: 'Organisateur',
      price: '29€/mois',
      description: 'Pour les professionnels qui organisent des événements',
      features: [
        'Création d\'événements illimitée',
        'Gestion des inscriptions',
        'Statistiques détaillées',
        'Support prioritaire',
        'Outils de promotion',
        'Export des données'
      ],
      popular: true,
      color: 'from-violet-500 to-purple-600'
    },
    {
      name: 'Institution',
      price: '99€/mois',
      description: 'Pour les institutions culturelles et collectivités',
      features: [
        'Multi-utilisateurs',
        'API personnalisée',
        'Marque blanche',
        'Support dédié',
        'Formation équipe',
        'Intégrations avancées',
        'Rapports personnalisés'
      ],
      popular: false,
      color: 'from-emerald-500 to-teal-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Choisissez votre formule
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Des solutions adaptées à tous les acteurs culturels, du visiteur curieux 
            aux grandes institutions patrimoniales
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">
            Toutes les formules incluent
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              'Interface intuitive et responsive',
              'Génération automatique de QR codes',
              'Cartes interactives',
              'Notifications en temps réel',
              'Sécurité renforcée des données',
              'Mises à jour automatiques',
              'Sauvegarde cloud',
              'Conformité RGPD'
            ].map((feature, index) => (
              <div key={index} className="flex items-center">
                <div className="w-6 h-6 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mr-3">
                  <Check className="w-4 h-4 text-black" />
                </div>
                <span className="text-slate-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Pricing;
