import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Save } from 'lucide-react';

const CreateSite = () => {
  const { toast } = useToast();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const { id: siteId } = useParams();
  const [searchParams] = useSearchParams();
  const parcoursIdFromURL = searchParams.get('parcours_id');

  const [parcoursList, setParcoursList] = useState([]);
  const [lieux, setLieux] = useState([]);
  const [site, setSite] = useState({
    name: '',
    categorie: '',
    description: '',
    adresse: '',
    heure_ouverture: '',
    tarif: '',
    telephone: '',
    email: '',
    site_web: '',
    services: [],
    transport_en_commun: '',
    periode: '',
    style: '',
    particularites: '',
    id_lieu: '',
    parcours_id: '',
    image: '',
  });

  const servicesList = [
    "Accessible aux personnes handicapées",
    "Visites guidées disponibles",
    "Audioguide disponible",
    "Parking disponible"
  ];

  useEffect(() => {
    fetch("http://localhost:5000/api/lieux", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => setLieux(data))
      .catch((err) => console.error(err));

    fetch(`http://localhost:5000/api/parcours?user_id=${user.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => setParcoursList(data))
      .catch((err) => console.error(err));
  }, [token, user.id]);

  useEffect(() => {
    if (!siteId) return;

    const fetchSite = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/sites/${siteId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Erreur lors de la récupération du site");

        const data = await response.json();

        setSite({
          name: data.name || '',
          categorie: data.categorie || '',
          description: data.description || '',
          adresse: data.adresse || '',
          heure_ouverture: data.heure_ouverture || '',
          tarif: data.tarif || '',
          telephone: data.telephone || '',
          email: data.email || '',
          site_web: data.site_web || '',
          services: JSON.parse(data.services || '[]'),
          transport_en_commun: data.transport || '',
          periode: data.periode_historique || '',
          style: data.style_architectural || '',
          particularites: data.points_interet || '',
          id_lieu: data.lieu_id || '',
          parcours_id: data.parcours_id || '',
          image: data.image || '',
        });

      } catch (error) {
        console.error(error);
        toast({
          title: "Erreur",
          description: error.message,
          variant: "destructive",
        });
      }
    };

    fetchSite();
  }, [siteId, token, toast]);

  useEffect(() => {
    setSite((prev) => ({
      ...prev,
      parcours_id: parcoursIdFromURL || '',
    }));
  }, [parcoursIdFromURL]);

  const handleChange = (field, value) => {
    setSite({ ...site, [field]: value });
  };

  const handleCheckbox = (service) => {
    setSite((prev) => {
      const exists = prev.services.includes(service);
      return {
        ...prev,
        services: exists
          ? prev.services.filter((s) => s !== service)
          : [...prev.services, service]
      };
    });
  };

 
  const handleSubmit = async (e) => {
  e.preventDefault();

  const url = siteId
    ? `http://localhost:5000/api/sites/${siteId}`
    : "http://localhost:5000/api/sites";

  const method = siteId ? "PUT" : "POST";

  const formData = new FormData();
  formData.append("name", site.name);
  formData.append("categorie", site.categorie);
  formData.append("description", site.description);
  formData.append("adresse", site.adresse);
  formData.append("heure_ouverture", site.heure_ouverture);
  formData.append("tarif", site.tarif);
  formData.append("telephone", site.telephone);
  formData.append("email", site.email);
  formData.append("site_web", site.site_web);
  formData.append("services", JSON.stringify(site.services));
  formData.append("transport", site.transport_en_commun);
  formData.append("periode_historique", site.periode);
  formData.append("style_architectural", site.style);
  formData.append("points_interet", site.particularites);
  formData.append("lieu_id", site.id_lieu);
  formData.append("parcours_id", site.parcours_id);
  formData.append("user_id", user.id);


  if (site.image) {
    formData.append("image", site.image);
  }

  try {
    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) throw new Error("Erreur lors de la sauvegarde du site");

    const data = await res.json();

    toast({
      title: siteId ? "Site modifié" : "Site créé",
      description: siteId
        ? "Le site a été modifié avec succès."
        : "Le site culturel a été ajouté avec succès.",
    });
  } catch (error) {
    console.error(error);
    toast({
      title: "Erreur",
      description: error.message,
      variant: "destructive",
    });
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-200 to-purple-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-purple-800 mb-8">
            {siteId ? "Modifier le Site Culturel" : "Ajouter un Site Culturel"}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm border border-purple-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-purple-700">
                  Informations générales
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">

                {/* Parcours associé */}
                <div>
                  <Label>Parcours associé</Label>
                  <select
                    value={site.parcours_id}
                    onChange={(e) => handleChange('parcours_id', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                    required
                  >
                    <option value="">-- Sélectionner un parcours --</option>
                    {parcoursList.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Nom */}
                <div>
                  <Label>Nom du site</Label>
                  <Input value={site.name} onChange={(e) => handleChange('name', e.target.value)} required />
                </div>

                {/* Catégorie */}
                <div>
                  <Label>Catégorie</Label>
                  <select
                    value={site.categorie}
                    onChange={(e) => handleChange('categorie', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                    required
                  >
                    <option value="">Sélectionnez une catégorie</option>
                    <option value="Musée">Musée</option>
                    <option value="Monument">Monument historique</option>
                    <option value="Église">Église / Cathédrale</option>
                    <option value="Château">Château</option>
                    <option value="Parc">Parc / Jardin</option>
                    <option value="Galerie">Galerie d'art</option>
                    <option value="Théâtre">Théâtre</option>
                    <option value="Centre culturel">Centre culturel</option>
                    <option value="Site archéologique">Site archéologique</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <Label>Description</Label>
                  <Textarea value={site.description} onChange={(e) => handleChange('description', e.target.value)} required />
                </div>

                {/* Adresse */}
                <div>
                  <Label>Adresse complète</Label>
                  <Input value={site.adresse} onChange={(e) => handleChange('adresse', e.target.value)} />
                </div>

                {/* Heures d'ouverture */}
                <div>
                  <Label>Heures d'ouverture</Label>
                  <Input
                    placeholder="Ex : Lun-Dim : 9h-18h / Fermé le mardi"
                    value={site.heure_ouverture}
                    onChange={(e) => handleChange('heure_ouverture', e.target.value)}
                  />
                </div>

                {/* Tarif */}
                <div>
                  <Label>Tarif</Label>
                  <Input value={site.tarif} onChange={(e) => handleChange('tarif', e.target.value)} />
                </div>

                {/* Téléphone / Email / Site web */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label>Téléphone</Label>
                    <Input value={site.telephone} onChange={(e) => handleChange('telephone', e.target.value)} />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input value={site.email} onChange={(e) => handleChange('email', e.target.value)} />
                  </div>
                  <div>
                    <Label>Site web</Label>
                    <Input value={site.site_web} onChange={(e) => handleChange('site_web', e.target.value)} />
                  </div>
                </div>

                {/* Transports en commun */}
                <div>
                  <Label>Transports en commun</Label>
                  <Input
                    placeholder="Ex: Métro ligne 1, arrêt Louvre"
                    value={site.transport_en_commun}
                    onChange={(e) => handleChange('transport_en_commun', e.target.value)}
                  />
                </div>

                {/* Services */}
                <div>
                  <Label>Services disponibles</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    {servicesList.map((service) => (
                      <label key={service} className="flex items-center gap-2">
                        <Checkbox
                          checked={site.services.includes(service)}
                          onCheckedChange={() => handleCheckbox(service)}
                        />
                        {service}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Période / Style */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Période historique</Label>
                    <Input value={site.periode} onChange={(e) => handleChange('periode', e.target.value)} />
                  </div>
                  <div>
                    <Label>Style architectural</Label>
                    <Input value={site.style} onChange={(e) => handleChange('style', e.target.value)} />
                  </div>
                </div>

                {/* Image */}
                 {/* ✅ Image fichier */}
                <div>
                  <Label>Image</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleChange('image', e.target.files[0])}
                  />
                </div>

                {/* Particularités */}
                <div>
                  <Label>Particularités / Points d'intérêt</Label>
                  <Textarea value={site.particularites} onChange={(e) => handleChange('particularites', e.target.value)} />
                </div>

                {/* Bouton enregistrer */}
                <div className="text-right">
                  <Button type="submit" className="bg-purple-600 text-white hover:bg-purple-700">
                    <Save className="w-4 h-4 mr-2" />
                    {siteId ? "Modifier le site" : "Créer le site"}
                  </Button>
                </div>

              </CardContent>
            </Card>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateSite;
