import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const CreateEvent = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    date_start: '',
    date_end: '',
    price: '',
    lieu_id: '',
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [createdEventId, setCreatedEventId] = useState(null);
  const [lieux, setLieux] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/lieux')
      .then(res => res.json())
      .then(data => setLieux(data));
  }, []);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/events/${id}`)
        .then(res => res.json())
        .then(data => {
          setFormData(prev => ({
            ...prev,
            title: data.title || '',
            description: data.description || '',
            category: data.category || '',
            date_start: data.date_start ? data.date_start.split('T')[0] : '',
            date_end: data.date_end ? data.date_end.split('T')[0] : '',
            price: data.price || '',
            lieu_id: data.lieu_id ? String(data.lieu_id) : ''
          }));
        })
        .catch(err => {
          console.error('Erreur chargement event:', err);
          alert("Erreur lors du chargement de l'événement");
        });
    }
  }, [id]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const dataToSend = new FormData();
    dataToSend.append("title", formData.title);
    dataToSend.append("description", formData.description);
    dataToSend.append("category", formData.category);
    dataToSend.append("date_start", formData.date_start);
    dataToSend.append("date_end", formData.date_end);
    dataToSend.append("price", formData.price);
    dataToSend.append("lieu_id", formData.lieu_id);
    if (formData.image) {
      dataToSend.append("image", formData.image);
    }

    try {
      const response = await fetch(
        id ? `http://localhost:5000/api/events/${id}` : 'http://localhost:5000/api/events',
        {
          method: id ? 'PUT' : 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: dataToSend,
        }
      );

      if (response.ok) {
        const data = await response.json();
        const eventId = data?.event?.id || data?.id || id;

        if (!id) {
          setCreatedEventId(eventId);
          navigate(`/create-program/event/${eventId}`); // ✅ Redirection corrigée ici
          setPreviewImage(null);
          setFormData({
            title: '',
            description: '',
            category: '',
            date_start: '',
            date_end: '',
            price: '',
            lieu_id: '',
            image: null
          });
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('Erreur :', error);
      alert("Erreur réseau !");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
              {id ? "Modifier l'Événement" : "Créer un Événement"}
            </h1>
            <p className="text-slate-600">
              {id ? "Modifiez les informations de votre événement" : "Partagez votre événement culturel avec la communauté"}
            </p>
          </div>

          <Card className="bg-white/70 backdrop-blur-sm shadow-xl border-white/50">
            <CardHeader>
              <CardTitle className="text-xl text-slate-800">Informations de l'événement</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Titre</Label>
                    <Input id="title" value={formData.title} onChange={(e) => handleChange('title', e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Catégorie</Label>
                    <select id="category" value={formData.category} onChange={(e) => handleChange('category', e.target.value)} className="w-full p-2 border border-gray-300 rounded" required>
                      <option value="">Choisir</option>
                      <option value="Musique">Musique</option>
                      <option value="Exposition">Exposition</option>
                      <option value="Spectacle">Spectacle</option>
                      <option value="Conférence">Conférence</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" value={formData.description} onChange={(e) => handleChange('description', e.target.value)} rows={4} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date_start">Date de début</Label>
                    <Input type="date" id="date_start" value={formData.date_start} onChange={(e) => handleChange('date_start', e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date_end">Date de fin</Label>
                    <Input type="date" id="date_end" value={formData.date_end} onChange={(e) => handleChange('date_end', e.target.value)} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="price">Prix</Label>
                    <Input type="number" id="price" value={formData.price} onChange={(e) => handleChange('price', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image">Image</Label>
                    <Input type="file" id="image" accept="image/*" onChange={(e) => {
                      const file = e.target.files[0];
                      setFormData(prev => ({ ...prev, image: file }));
                      setPreviewImage(file ? URL.createObjectURL(file) : null);
                    }} />
                    {previewImage && <img src={previewImage} alt="Aperçu" className="mt-2 w-48 h-48 object-cover rounded-lg shadow border" />}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lieu_id">Lieu</Label>
                  <select id="lieu_id" value={formData.lieu_id} onChange={(e) => handleChange('lieu_id', e.target.value)} className="w-full p-2 border border-gray-300 rounded" required>
                    <option value="">Choisir un lieu</option>
                    {lieux.map(lieu => (
                      <option key={lieu.id} value={lieu.id}>
                        {lieu.nom} ({lieu.ville})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-6 flex gap-4">
                  <Button type="submit" className="bg-emerald-600 text-black shadow-md">
                    <Save className="w-4 h-4 mr-2" />
                    {id ? "Mettre à jour l'événement" : "Créer l'événement"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => navigate('/dashboard')}>
                    Annuler
                  </Button>
                  {createdEventId && (
                    <Button onClick={() => navigate(`/create-program/event/${createdEventId}`)} className="bg-blue-500 text-black">
                      Ajouter un programme
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateEvent;
