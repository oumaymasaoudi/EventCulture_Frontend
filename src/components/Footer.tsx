
import React from 'react';
import { Calendar, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-cultural-900 text-black">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className="text-xl font-bold">EventCulture</h3>
                <p className="text-sm text-cultural-300">Ministère de la Culture</p>
              </div>
            </div>
            <p className="text-cultural-300 mb-6 max-w-md">
              La plateforme officielle pour découvrir et gérer les événements culturels 
              sur l'ensemble du territoire français. Une initiative du Ministère de la Culture 
              pour démocratiser l'accès à la culture.
            </p>
            
            {/* Réseaux sociaux */}
            <div className="flex space-x-4">
              <button className="w-10 h-10 bg-cultural-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-cultural-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-cultural-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-cultural-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Youtube className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-cultural-300">
              <li><a href="#events" className="hover:text-black transition-colors">Événements</a></li>
              <li><a href="#parcours" className="hover:text-black transition-colors">Parcours culturels</a></li>
              <li><a href="#lieux" className="hover:text-black transition-colors">Lieux patrimoniaux</a></li>
              <li><a href="#about" className="hover:text-black transition-colors">À propos</a></li>
              <li><a href="/admin" className="hover:text-black transition-colors">Administration</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-cultural-300">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-3" />
                <span className="text-sm">contact@eventculture.gouv.fr</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-3" />
                <span className="text-sm">01 42 97 48 16</span>
              </div>
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-3 mt-1" />
                <span className="text-sm">
                  Ministère de la Culture<br />
                  182 rue Saint-Honoré<br />
                  75001 Paris
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-cultural-800 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-cultural-400">
            <p>&copy; 2024 EventCulture - Ministère de la Culture. Tous droits réservés.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/mentions-legales" className="hover:text-black transition-colors">Mentions légales</a>
              <a href="/confidentialite" className="hover:text-black transition-colors">Confidentialité</a>
              <a href="/cookies" className="hover:text-black transition-colors">Cookies</a>
              <a href="/accessibilite" className="hover:text-black transition-colors">Accessibilité</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
