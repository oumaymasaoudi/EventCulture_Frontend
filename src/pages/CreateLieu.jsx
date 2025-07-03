import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useParams } from 'react-router-dom';

const CreateLieu = () => {
  const { toast } = useToast();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const navigate = useNavigate();
  const { id } = useParams();

  const [lieu, setLieu] = useState({
    nom: '',
    pays: '',
    ville: '',
    description: '',
    site_web: '',
  });

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/lieux/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error('Erreur lors de la récupération du lieu');
          return res.json();
        })
        .then((data) => setLieu(data))
        .catch((err) => {
          toast({ title: 'Erreur', description: err.message, variant: 'destructive' });
        });
    }
  }, [id, toast]);

  const handleChange = (field, value) => {
    setLieu({ ...lieu, [field]: value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.id) {
      toast({
        title: "Erreur",
        description: "Utilisateur non connecté. Veuillez vous connecter.",
        variant: "destructive"
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('nom', lieu.nom);
      formData.append('pays', lieu.pays);
      formData.append('ville', lieu.ville);
      formData.append('description', lieu.description);
      formData.append('site_web', lieu.site_web);
      formData.append('user_id', user.id);
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const method = id ? 'PUT' : 'POST';
      const url = id
        ? `http://localhost:5000/api/lieux/${id}`
        : 'http://localhost:5000/api/lieux';

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Erreur lors de l'enregistrement du lieu");

      const data = await res.json();

      toast({
        title: id ? 'Lieu modifié' : 'Lieu créé',
        description: id
          ? 'Le lieu a été modifié avec succès.'
          : 'Le lieu a été enregistré avec succès.',
      });

      if (id) {
        navigate('/lieux');
      } else {
        navigate(`/create-parcours?lieu_id=${data.id}`);
      }

    } catch (error) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-slate-800 mb-6">
            {id ? 'Modifier un Lieu Culturel' : 'Ajouter un Lieu Culturel'}
          </h1>

          <Card>
            <CardHeader>
              <CardTitle>Informations du lieu</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                  <Label htmlFor="nom">Nom du lieu</Label>
                  <Input id="nom" value={lieu.nom} onChange={(e) => handleChange('nom', e.target.value)} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pays">Pays</Label>
                    <Input id="pays" value={lieu.pays} onChange={(e) => handleChange('pays', e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="ville">Ville</Label>
                    <Input id="ville" value={lieu.ville} onChange={(e) => handleChange('ville', e.target.value)} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="image">Image</Label>
                  <Input id="image" type="file" accept="image/*" onChange={handleFileChange} />
                </div>
                <div>
                  <Label htmlFor="site_web">Site web</Label>
                  <Input id="site_web" value={lieu.site_web} onChange={(e) => handleChange('site_web', e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" rows={4} value={lieu.description} onChange={(e) => handleChange('description', e.target.value)} />
                </div>
                <div className="text-right">
                  <Button type="submit" className="bg-orange-600 text-black">
                    {id ? 'Modifier le lieu' : 'Créer le lieu'}
                  </Button>
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

export default CreateLieu;
