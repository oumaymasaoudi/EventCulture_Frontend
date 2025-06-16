import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 
import './UserSettings.css';

const UserSettings = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState(''); // Ajouter le champ prénom
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [organization, setOrganization] = useState('');
  const [siret, setSiret] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/users/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        const userData = response.data || {};
        setUser(userData);
        setFirstName(userData.first_name || ''); // Ajouter le prénom
        setLastName(userData.last_name || '');
        setEmail(userData.email || '');
        setPhone(userData.phone || '' );
        setAddress(userData.address || ''); // Ajouter l'adresse
        setOrganization(userData.organization || ''); // Ajouter l'organisation
        setSiret(userData.siret || ''); // Ajouter le SIRET
        setDescription(userData.description || ''); // Ajouter la description
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur", error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/users/${id}`, {
        first_name: firstName, // Mettre à jour le prénom
        last_name: lastName,
        email,
        phone,
        address,
        organization,
        siret,
        description,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      navigate('/'); 
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <div className="flex justify-center">
          <form 
            onSubmit={handleSubmit} 
            className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl"
          >
            <h1 className="text-3xl font-semibold mb-4 text-black text-center">Paramètres</h1>

            <div className="flex flex-col md:flex-row justify-between">
              {/* Champs gauche */}
              <div className="w-full md:w-1/2 pr-2">
                <div className="flex mb-4">
                  <div className="pr-2 name">
                    <label className="block text-sm font-medium mb-2">Prénom</label>
                    <input 
                      type="text" 
                      value={firstName} 
                      onChange={(e) => setFirstName(e.target.value)} 
                      className="border rounded-xl  p-2 name" 
                    />
                  </div>
                  <div className="pl-2 name">
                    <label className="block text-sm font-medium mb-2">Nom</label>
                    <input 
                      type="text" 
                      value={lastName} 
                      onChange={(e) => setLastName(e.target.value)} 
                      className="border rounded-xl  p-2 name" 
                    />
                  </div>
                </div>
                <div className="mb-4 left">
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="border rounded-xl w-full p-2" 
                  />
                </div>
                <div className="mb-4 left">
                  <label className="block text-sm font-medium mb-2">Téléphone</label>
                  <input 
                    type="tel" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    className="border rounded-xl w-full p-2" 
                  />
                </div>
              </div>

              {/* Trait noir */}
              <div className="hidden md:flex items-center justify-center mx-4 trait">
                <div className="h-full border-l border-black border-2 trait"></div>
              </div>

              {/* Champs droite */}
              <div className="w-full md:w-1/2 pl-2">
                <div className="mb-4 right">
                  <label className="block text-sm font-medium mb-2">Adresse</label>
                  <input 
                    type="text" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    className="border rounded-xl w-full p-2" 
                  />
                </div>
                <div className="mb-4 right">
                  <label className="block text-sm font-medium mb-2">Organisation</label>
                  <input 
                    type="text" 
                    value={organization} 
                    onChange={(e) => setOrganization(e.target.value)} 
                    className="border rounded-xl w-full p-2" 
                  />
                </div>
                <div className="mb-4 right">
                  <label className="block text-sm font-medium mb-2">SIRET</label>
                  <input 
                    type="text" 
                    value={siret} 
                    onChange={(e) => setSiret(e.target.value)} 
                    className="border rounded-xl w-full p-2" 
                  />
                </div>
              </div>
            </div>

            {/* Champ Description en pleine largeur */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                className="border rounded-xl w-full p-2" 
              />
            </div>

            {/* Boutons de validation et d'annulation */}
            <div className="flex justify-between mt-6">
              <button 
                type="button" 
                className="button-pill cancel"
                onClick={() => navigate('/')} >
                Annuler
              </button>
              <button 
                type="submit"
                className="button-pill validate" >
                Valider
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserSettings;