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
    user_id: '1',
    image: null
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [lieux, setLieux] = useState([]);
  const [loading, setLoading] = useState(false);

  // Charger les lieux
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/lieux')
      .then((res) => setLieux(res.data))
      .catch((err) => console.error('Erreur lors du chargement des lieux :', err));
  }, []);

  // Charger le parcours en mode édition SEULEMENT si id est défini
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/parcours/${id}`)
        .then((res) => {
          const data = res.data;
          setFormData({
            title: data.title,
            description: data.description,
            theme: data.theme,
            difficulty: data.difficulty,
            duration: data.duration,
            lieu_id: data.Lieu ? data.Lieu.id : '',
            user_id: '1',
            image: null
          });
          setPreviewImage(data.image ? `http://localhost:5000/uploads/${data.image}` : null);
        })
        .catch((err) => console.error('Erreur lors du chargement du parcours :', err));
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
    if (formData.image) {
      formPayload.append('image', formData.image);
    }

    try {
      if (id) {
        // Mode édition → PUT
        await axios.put(`http://localhost:5000/api/parcours/${id}`, formPayload);
        alert('Parcours modifié avec succès.');
      } else {
        // Mode création → POST
        await axios.post('http://localhost:5000/api/parcours/create', formPayload);
        alert('Parcours créé avec succès.');
      }
      navigate('/parcours');
    } catch (err) {
      console.error('Erreur lors de la soumission du formulaire :', err);
      alert('Erreur lors de la soumission du formulaire.');
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

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <div>
            <label className="block text-slate-700 font-semibold mb-2">Titre</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-2">Thème</label>
            <input
              type="text"
              name="theme"
              value={formData.theme}
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-2">Difficulté</label>
            <input
              type="text"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-2">Durée (minutes)</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-2">Lieu</label>
            <select
              name="lieu_id"
              value={formData.lieu_id}
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
            >
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
            {previewImage && (
              <div className="mt-4">
                <img src={previewImage} alt="Preview" className="w-48 h-48 object-cover rounded border" />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow"
          >
            {loading ? 'Traitement en cours...' : id ? 'Modifier' : 'Créer'}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreateParcours;
