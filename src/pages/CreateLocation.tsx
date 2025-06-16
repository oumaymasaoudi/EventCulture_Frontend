
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock, Image, Save, Star, Info, Globe, Phone, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CreateLocation = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
    category: '',
    openingHours: '',
    phone: '',
    email: '',
    website: '',
    image: '',
    accessibility: false,
    guidedTours: false,
    audioGuide: false,
    freeEntry: false,
    entryPrice: '',
    parkingAvailable: false,
    publicTransport: '',
    historicalPeriod: '',
    architecturalStyle: '',
    specialFeatures: ''
  });

  const handleChange = (field: string, value: any) => {
    setFormData({...formData, [field]: value});
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch('http://localhost:5000/api/locations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}` // si token stocké
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Erreur lors de la création du lieu');
    }

    const result = await res.json();
    toast({
      title: 'Lieu ajouté avec succès',
      description: `Le lieu "${result.name}" a bien été enregistré.`,
    });

    // Optionnel : reset du formulaire
    setFormData({
      ...formData,
      name: '',
      address: '',
      city: '',
      description: '',
      // vide tous les autres si nécessaire
    });

  } catch (err: any) {
    toast({
      title: 'Erreur',
      description: err.message,
      variant: 'destructive'
    });
  }
};




  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
              Ajouter un Lieu Culturel
            </h1>
            <p className="text-slate-600">
              Enrichissez notre plateforme en ajoutant un nouveau site
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Informations générales */}
            <Card className="bg-white/70 backdrop-blur-sm shadow-xl border-white/50">
              <CardHeader>
                <CardTitle className="text-xl text-slate-800 flex items-center">
                  <Info className="w-5 h-5 mr-2 text-blue-500" />
                  Informations générales
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-700 font-medium">Nom du site</Label>
                    <Input
                      id="name"
                      placeholder="Ex: Musée du Louvre"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="border-slate-200 focus:border-blue-300 focus:ring-blue-200"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-slate-700 font-medium">Catégorie</Label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => handleChange('category', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-md focus:border-blue-300 focus:ring-blue-200 bg-white"
                      required
                    >
                      <option value="">Sélectionnez une catégorie</option>
                      <option value="Musée">Musée</option>
                      <option value="Monument">Monument historique</option>
                      <option value="Église">Église/Cathédrale</option>
                      <option value="Château">Château</option>
                      <option value="Parc">Parc/Jardin</option>
                      <option value="Galerie">Galerie d'art</option>
                      <option value="Théâtre">Théâtre</option>
                      <option value="Centre culturel">Centre culturel</option>
                      <option value="Site archéologique">Site archéologique</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-slate-700 font-medium">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Décrivez ce lieu culturel, son histoire, ses particularités..."
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    className="border-slate-200 focus:border-blue-300 focus:ring-blue-200 min-h-[120px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image" className="text-slate-700 font-medium flex items-center">
                    <Image className="w-4 h-4 mr-2" />
                    Image principale (URL)
                  </Label>
                  <Input
                    id="image"
                    placeholder="https://exemple.com/image.jpg"
                    value={formData.image}
                    onChange={(e) => handleChange('image', e.target.value)}
                    className="border-slate-200 focus:border-blue-300 focus:ring-blue-200"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Localisation */}
            <Card className="bg-white/70 backdrop-blur-sm shadow-xl border-white/50">
              <CardHeader>
                <CardTitle className="text-xl text-slate-800 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                  Localisation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-slate-700 font-medium">Adresse complète</Label>
                  <Input
                    id="address"
                    placeholder="Ex: 1 Rue de Rivoli"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    className="border-slate-200 focus:border-blue-300 focus:ring-blue-200"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-slate-700 font-medium">Ville</Label>
                    <Input
                      id="city"
                      placeholder="Ex: Paris"
                      value={formData.city}
                      onChange={(e) => handleChange('city', e.target.value)}
                      className="border-slate-200 focus:border-blue-300 focus:ring-blue-200"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="postalCode" className="text-slate-700 font-medium">Code postal</Label>
                    <Input
                      id="postalCode"
                      placeholder="Ex: 75001"
                      value={formData.postalCode}
                      onChange={(e) => handleChange('postalCode', e.target.value)}
                      className="border-slate-200 focus:border-blue-300 focus:ring-blue-200"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-slate-700 font-medium">Pays</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => handleChange('country', e.target.value)}
                      className="border-slate-200 focus:border-blue-300 focus:ring-blue-200"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informations pratiques */}
            <Card className="bg-white/70 backdrop-blur-sm shadow-xl border-white/50">
              <CardHeader>
                <CardTitle className="text-xl text-slate-800 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-500" />
                  Informations pratiques
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="openingHours" className="text-slate-700 font-medium">Horaires d'ouverture</Label>
                    <Textarea
                      id="openingHours"
                      placeholder="Ex: Lun-Dim: 9h-18h&#10;Fermé le mardi"
                      value={formData.openingHours}
                      onChange={(e) => handleChange('openingHours', e.target.value)}
                      className="border-slate-200 focus:border-blue-300 focus:ring-blue-200"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="entryPrice" className="text-slate-700 font-medium">Prix d'entrée</Label>
                      <Input
                        id="entryPrice"
                        placeholder="Ex: 15€ / Gratuit"
                        value={formData.entryPrice}
                        onChange={(e) => handleChange('entryPrice', e.target.value)}
                        className="border-slate-200 focus:border-blue-300 focus:ring-blue-200"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="freeEntry"
                        checked={formData.freeEntry}
                        onChange={(e) => handleChange('freeEntry', e.target.checked)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <Label htmlFor="freeEntry" className="text-slate-700">Entrée gratuite</Label>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-slate-700 font-medium flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      Téléphone
                    </Label>
                    <Input
                      id="phone"
                      placeholder="Ex: +33 1 42 97 48 16"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="border-slate-200 focus:border-blue-300 focus:ring-blue-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-700 font-medium flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="contact@lieu.fr"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="border-slate-200 focus:border-blue-300 focus:ring-blue-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-slate-700 font-medium flex items-center">
                      <Globe className="w-4 h-4 mr-2" />
                      Site web
                    </Label>
                    <Input
                      id="website"
                      placeholder="https://www.lieu.fr"
                      value={formData.website}
                      onChange={(e) => handleChange('website', e.target.value)}
                      className="border-slate-200 focus:border-blue-300 focus:ring-blue-200"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Caractéristiques et services */}
            <Card className="bg-white/70 backdrop-blur-sm shadow-xl border-white/50">
              <CardHeader>
                <CardTitle className="text-xl text-slate-800 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-blue-500" />
                  Caractéristiques et services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-slate-700">Services disponibles</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="accessibility"
                          checked={formData.accessibility}
                          onChange={(e) => handleChange('accessibility', e.target.checked)}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <Label htmlFor="accessibility" className="text-slate-700">Accessible aux personnes handicapées</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="guidedTours"
                          checked={formData.guidedTours}
                          onChange={(e) => handleChange('guidedTours', e.target.checked)}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <Label htmlFor="guidedTours" className="text-slate-700">Visites guidées disponibles</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="audioGuide"
                          checked={formData.audioGuide}
                          onChange={(e) => handleChange('audioGuide', e.target.checked)}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <Label htmlFor="audioGuide" className="text-slate-700">Audioguide disponible</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="parkingAvailable"
                          checked={formData.parkingAvailable}
                          onChange={(e) => handleChange('parkingAvailable', e.target.checked)}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <Label htmlFor="parkingAvailable" className="text-slate-700">Parking disponible</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="publicTransport" className="text-slate-700 font-medium">Transports en commun</Label>
                      <Input
                        id="publicTransport"
                        placeholder="Ex: Métro ligne 1, arrêt Louvre"
                        value={formData.publicTransport}
                        onChange={(e) => handleChange('publicTransport', e.target.value)}
                        className="border-slate-200 focus:border-blue-300 focus:ring-blue-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="historicalPeriod" className="text-slate-700 font-medium">Période historique</Label>
                      <Input
                        id="historicalPeriod"
                        placeholder="Ex: XIIe-XIVe siècle"
                        value={formData.historicalPeriod}
                        onChange={(e) => handleChange('historicalPeriod', e.target.value)}
                        className="border-slate-200 focus:border-blue-300 focus:ring-blue-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="architecturalStyle" className="text-slate-700 font-medium">Style architectural</Label>
                      <Input
                        id="architecturalStyle"
                        placeholder="Ex: Gothique, Renaissance, Baroque"
                        value={formData.architecturalStyle}
                        onChange={(e) => handleChange('architecturalStyle', e.target.value)}
                        className="border-slate-200 focus:border-blue-300 focus:ring-blue-200"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialFeatures" className="text-slate-700 font-medium">Particularités/Points d'intérêt</Label>
                  <Textarea
                    id="specialFeatures"
                    placeholder="Décrivez les éléments remarquables, œuvres principales, anecdotes historiques..."
                    value={formData.specialFeatures}
                    onChange={(e) => handleChange('specialFeatures', e.target.value)}
                    className="border-slate-200 focus:border-blue-300 focus:ring-blue-200"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button 
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-black shadow-lg"
                disabled={!formData.name || !formData.address || !formData.city}
              >
                <Save className="w-4 h-4 mr-2" />
                Ajouter le lieu culturel
              </Button>
              <Button type="button" variant="outline" className="border-slate-300 text-slate-600 hover:bg-slate-50">
                Annuler
              </Button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CreateLocation;
