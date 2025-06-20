import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Route, MapPin, ClipboardList, Landmark } from 'lucide-react';
import placeholder from '../assets/UserPlaceholder.png';

const Header = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.role;
  const userId = user?.id;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setDropdownOpen(false);
  }
  const toggleDropdown = () => setDropdownOpen(prev => !prev);

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-sm border-b border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Calendar className="text-black w-5 h-5" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              EventCulture
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {/* ÉVÉNEMENTS */}
            <div className="relative group">
              <button className="flex items-center text-slate-700 hover:text-violet-600 transition-colors font-medium">
                Événements
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {role === 'professionnel' && (
                  <Link
                    to="/create-event"
                    className="flex items-center px-4 py-3 text-slate-700 hover:bg-violet-50 hover:text-violet-600 transition-colors"
                  >
                    <Calendar className="w-4 h-4 mr-3" />
                    Créer un événement
                  </Link>
                )}
                <Link
                  to="/events"
                  className="flex items-center px-4 py-3 text-slate-700 hover:bg-violet-50 hover:text-violet-600 transition-colors"
                >
                  <Calendar className="w-4 h-4 mr-3" />
                  Afficher événements
                </Link>
              </div>
            </div>

            {/* PROGRAMMES */}
            <div className="relative group">
              <button className="flex items-center text-slate-700 hover:text-emerald-600 transition-colors font-medium">
                Programmes
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {role === 'professionnel' && (
                  <Link
                    to="/create-program"
                    className="flex items-center px-4 py-3 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                  >
                    <ClipboardList className="w-4 h-4 mr-3" />
                    Ajouter programme
                  </Link>
                )}
                <Link
                  to="/programs"
                  className="flex items-center px-4 py-3 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                >
                  <ClipboardList className="w-4 h-4 mr-3" />
                  Afficher programmes
                </Link>
                
              </div>
            </div>

            {/* LIEUX */}
            <div className="relative group">
              <button className="flex items-center text-slate-700 hover:text-blue-600 transition-colors font-medium">
                Lieux
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {role === 'professionnel' && (
                  <Link
                    to="/create-lieu"
                    className="flex items-center px-4 py-3 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <MapPin className="w-4 h-4 mr-3" />
                    Ajouter lieu
                  </Link>
                )}
                <Link
                  to="/lieux"
                  className="flex items-center px-4 py-3 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <MapPin className="w-4 h-4 mr-3" />
                  Afficher lieux
                </Link>
              </div>
            </div>

            {/* PARCOURS */}
            <div className="relative group">
              <button className="flex items-center text-slate-700 hover:text-rose-600 transition-colors font-medium">
                Parcours
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {role === 'professionnel' && (
                  <Link
                    to="/create-parcours"
                    className="flex items-center px-4 py-3 text-slate-700 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                  >
                    <Route className="w-4 h-4 mr-3" />
                    Ajouter parcours
                  </Link>
                )}
                <Link
                  to="/parcours"
                  className="flex items-center px-4 py-3 text-slate-700 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                >
                  <Route className="w-4 h-4 mr-3" />
                  Afficher parcours
                </Link>
              </div>
            </div>

            {/* SITES */}
            <div className="relative group">
              <button className="flex items-center text-slate-700 hover:text-orange-600 transition-colors font-medium">
                Sites
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {role === 'professionnel' && (
                  <Link
                    to="/create-site"
                    className="flex items-center px-4 py-3 text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  >
                    <Landmark className="w-4 h-4 mr-3" />
                    Ajouter site
                  </Link>
                )}
                <Link
                  to="/sites"
                  className="flex items-center px-4 py-3 text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                >
                  <Landmark className="w-4 h-4 mr-3" />
                  Afficher sites
                </Link>
              </div>
            </div>

            {/* Tarifs */}
            <Link
              to="/pricing"
              className="text-slate-700 hover:text-violet-600 transition-colors font-medium"
            >
              Tarifs
            </Link>

            {/* À propos */}
            <Link
              to="/about"
              className="text-slate-700 hover:text-violet-600 transition-colors font-medium"
            >
              À propos
            </Link>
          </nav>

          <div className="relative flex items-center space-x-4">
            {/* Bulle utilisateur */}
            { user && (
              <div className="relative">
                <button onClick={toggleDropdown} className="w-10 h-10 rounded-full overflow-hidden focus:outline-none">
                  <img src={placeholder} alt="User" className="w-full h-full object-cover" />
                </button>

                {/* Menu déroulant */}
                {dropdownOpen && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-40 bg-white rounded-lg shadow-lg border border-slate-200">
                    <Link
                      to={`/settings/${userId}`}
                      className="block px-4 py-2 text-slate-700 hover:bg-violet-50 hover:text-violet-600 transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Paramètres
                    </Link>
                    <Link
                      to="/"
                      className="block px-4 py-2 text-slate-700 hover:bg-violet-50 hover:text-violet-600 transition-colors"
                      onClick={handleLogout}
                    >
                      Déconnexion
                    </Link>
                  </div>
                )}
              </div>
            )}

            {!user && (
              <Link
                to="/auth"
                className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Connexion
              </Link>
            )}

             <Link
              to="/dashboard"
              className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-black px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Mon espace
            </Link>
          </div>  
        </div>
      </div>
    </header>
  );
};

export default Header;