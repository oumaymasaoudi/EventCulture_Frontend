import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CreateParcours = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    theme: '',
    difficulty: '',
    duration: '',
    lieu_id: '',
    user_id: '', // récupéré dynamiquement plus tard
    image: null
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [lieux, setLieux] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/lieux')
      .then((res) => setLieux(res.data))
      .catch((err) => console.error('Erreur chargement lieux :', err));

    // récupérer l'utilisateur connecté depuis le localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.id) {
      setFormData((prev) => ({ ...prev, user_id: user.id }));
    }
  }, []);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/parcours/${id}`)
        .then((res) => {
          const data = res.data;
          setFormData((prev) => ({
            ...prev,
            title: data.title,
            description: data.description,
            theme: data.theme,
            difficulty: data.difficulty,
            duration: data.duration,
            lieu_id: data.Lieu ? data.Lieu.id : ''
          }));
          setPreviewImage(data.image ? `http://localhost:5000/uploads/${data.image}` : null);
        })
        .catch((err) => console.error('Erreur chargement parcours :', err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formPayload = new FormData();
    formPayload.append('title', formData.title);
    formPayload.append('description', formData.description);
    formPayload.append('theme', formData.theme);
    formPayload.append('difficulty', formData.difficulty);
    formPayload.append('duration', formData.duration);
    formPayload.append('lieu_id', formData.lieu_id);
    formPayload.append('user_id', formData.user_id);
    if (formData.image) formPayload.append('image', formData.image);

    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/parcours/${id}`, formPayload);
        alert('Parcours modifié.');
      } else {
        await axios.post('http://localhost:5000/api/parcours/create', formPayload);
        alert('Parcours créé.');
      }
      navigate('/parcours');
    } catch (err) {
      console.error('Erreur soumission formulaire :', err);
      alert('Erreur lors de la soumission.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-slate-800 mb-8">
          {id ? 'Modifier le parcours' : 'Créer un parcours'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-lg border">
          <div>
            <label className="block text-slate-700 font-semibold mb-2">Titre</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full border rounded p-2" />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-2">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required className="w-full border rounded p-2" />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-2">Thème</label>
            <select name="theme" value={formData.theme} onChange={handleChange} required className="w-full border rounded p-2 bg-white">
              <option value="">Sélectionnez un thème</option>
              <option value="Histoire">Histoire</option>
              <option value="Architecture">Architecture</option>
              <option value="Art">Art</option>
              <option value="Religion">Religion</option>
              <option value="Gastronomie">Gastronomie</option>
              <option value="Littérature">Littérature</option>
              <option value="Musique">Musique</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-2">Difficulté</label>
            <select name="difficulty" value={formData.difficulty} onChange={handleChange} required className="w-full border rounded p-2 bg-white">
              <option value="">Sélectionnez une difficulté</option>
              <option value="facile">Facile</option>
              <option value="modéré">Modéré</option>
              <option value="difficile">Difficile</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-2">Durée (minutes)</label>
            <input type="number" name="duration" value={formData.duration} onChange={handleChange} required className="w-full border rounded p-2" />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-2">Lieu</label>
            <select name="lieu_id" value={formData.lieu_id} onChange={handleChange} required className="w-full border rounded p-2">
              <option value="">-- Sélectionner un lieu --</option>
              {lieux.map((lieu) => (
                <option key={lieu.id} value={lieu.id}>
                  {lieu.nom} ({lieu.ville}, {lieu.pays})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-2">Image</label>
            <input type="file" name="image" accept="image/*" onChange={handleChange} />
            {previewImage && <img src={previewImage} alt="Preview" className="mt-4 w-48 h-48 object-cover rounded border" />}
          </div>

          <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow">
            {loading ? 'Traitement en cours...' : id ? 'Modifier' : 'Créer'}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreateParcours;
