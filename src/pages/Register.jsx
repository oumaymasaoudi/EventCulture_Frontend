import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Register = () => {
  const { id } = useParams(); // id de l'événement
  const navigate = useNavigate();


  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    demandes_speciales: "",
    motivation: "",
  });

  const [nombreBillets, setNombreBillets] = useState(1);
  const [oeuvres, setOeuvres] = useState([]); // fichiers image

  const [prixUnitaire, setPrixUnitaire] = useState(0);

useEffect(() => {
  const fetchEvent = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/events/${id}`);
      setPrixUnitaire(res.data.price); // 👉 'price' selon ton modèle Event
    } catch (error) {
      console.error("Erreur chargement prix événement :", error);
    }
  };

  fetchEvent();
}, [id]);

  const montantTotal = nombreBillets * prixUnitaire;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    setOeuvres([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const formData = new FormData();

      formData.append("nom", form.nom);
      formData.append("prenom", form.prenom);
      formData.append("email", form.email);
      formData.append("telephone", form.telephone);
      formData.append("motivation", form.motivation);
      formData.append("demandes_speciales", form.demandes_speciales);
      formData.append("nombre_places", nombreBillets);
      formData.append("montant_paye", montantTotal);
      formData.append("user_id", user?.id);
      formData.append("event_id", id);
      formData.append("statut", "confirmé");
      formData.append("date_inscription", new Date().toISOString());

      oeuvres.forEach((file, index) => {
        formData.append("oeuvres_images", file);
      });

      await axios.post("http://localhost:5000/api/participations", formData , {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast({
        title: "Inscription réussie 🎉",
        description: `Merci ${form.prenom}, votre participation est bien enregistrée.`,
      });

      const paymentResponse = await axios.post("http://localhost:5000/api/payment/create-checkout-session", {
  eventId: id,
  quantity: nombreBillets,
  montant: prixUnitaire,
  userEmail: form.email,
});
window.location.href = paymentResponse.data.url;


    } catch (error) {
      console.error(error);
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer votre participation.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <main className="container mx-auto py-12 px-4 max-w-2xl space-y-8">
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-6">
          Inscription à l'événement
        </h1>

        <form onSubmit={handleSubmit}>
          <Card className="bg-white rounded-xl shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-800">Informations participant</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">

              <div className="text-sm text-gray-700 font-medium">
                Tarif du billet : {prixUnitaire} € / personne
              </div>

              <div className="flex items-center space-x-4">
                <Label>Nombre de billets :</Label>
                <Button type="button" onClick={() => setNombreBillets(Math.max(1, nombreBillets - 1))}>−</Button>
                <span className="text-lg font-bold">{nombreBillets}</span>
                <Button type="button" onClick={() => setNombreBillets(nombreBillets + 1)}>+</Button>
              </div>

              <div className="bg-green-50 text-green-700 p-4 rounded-md border border-green-200 text-center font-semibold">
                Total à payer : {montantTotal} €
              </div>

              <div>
                <Label htmlFor="prenom">Prénom</Label>
                <Input id="prenom" name="prenom" value={form.prenom} onChange={handleChange} required />
              </div>

              <div>
                <Label htmlFor="nom">Nom</Label>
                <Input id="nom" name="nom" value={form.nom} onChange={handleChange} required />
              </div>

              <div>
                <Label htmlFor="email">Adresse e-mail</Label>
                <Input id="email" name="email" value={form.email} onChange={handleChange} required />
              </div>

              <div>
                <Label htmlFor="telephone">Téléphone</Label>
                <Input id="telephone" name="telephone" value={form.telephone} onChange={handleChange} required />
              </div>

              <div>
                <Label htmlFor="demandes_speciales">Demandes spéciales (optionnel)</Label>
                <textarea
                  id="demandes_speciales"
                  name="demandes_speciales"
                  value={form.demandes_speciales}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows="3"
                />
              </div>

              <div>
                <Label htmlFor="motivation">Motivation</Label>
                <textarea
                  id="motivation"
                  name="motivation"
                  value={form.motivation}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows="4"
                  required
                />
              </div>

              <div>
                <Label htmlFor="oeuvres_images">Œuvres (upload images)</Label>
                <Input
                  type="file"
                  name="oeuvres_images"
                  id="oeuvres_images"
                  onChange={handleImageUpload}
                  multiple
                  accept="image/*"
                />
                {oeuvres.length > 0 && (
                  <ul className="text-sm mt-2 text-gray-600 list-disc pl-5">
                    {Array.from(oeuvres).map((file, idx) => (
                      <li key={idx}>{file.name}</li>
                    ))}
                  </ul>
                )}
              </div>

              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-black mt-4">
                Finaliser l'inscription - {montantTotal} €
              </Button>
            </CardContent>
          </Card>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
