
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Star } from 'lucide-react';

const PricingCard = ({
  name,
  price,
  description,
  features,
  popular,
  color
}) => {
  return (
    <Card className={`relative overflow-hidden ${popular ? 'ring-2 ring-violet-400 shadow-2xl scale-105' : 'shadow-lg'} bg-white/70 backdrop-blur-sm border-white/50 transition-all duration-300 hover:shadow-xl`}>
      {popular && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-violet-500 to-purple-600 text-black text-center py-2 text-sm font-medium">
          <Star className="w-4 h-4 inline mr-1" />
          Plus populaire
        </div>
      )}
      
      <CardHeader className={`text-center ${popular ? 'pt-12' : 'pt-6'}`}>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">{name}</h3>
        <div className="mb-4">
          <span className="text-4xl font-bold text-slate-800">{price}</span>
          {price !== 'Gratuit' && <span className="text-slate-600 ml-1">/mois</span>}
        </div>
        <p className="text-slate-600">{description}</p>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <div className={`w-5 h-5 bg-gradient-to-r ${color} rounded-full flex items-center justify-center mr-3 flex-shrink-0`}>
                <Check className="w-3 h-3 text-black" />
              </div>
              <span className="text-slate-700 text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <Button 
          className={`w-full ${popular 
            ? 'bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700' 
            : `bg-gradient-to-r ${color} hover:opacity-90`
          } text-black shadow-lg`}
        >
          {price === 'Gratuit' ? 'Commencer gratuitement' : 'Essayer 14 jours gratuits'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PricingCard;
