import React, { useState } from "react";
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
    nombre_places: "1",
    demandes_speciales: "",
    motivation: "",
    montant_paye: 25, // montant simulé
    payment_status: "paid", // simulé comme payé
    nom_carte: "",
    numero_carte: "",
    date_expiration: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await axios.post(`http://localhost:5000/api/participations`, {
        nom: form.nom,
        prenom: form.prenom,
        email: form.email,
        telephone: form.telephone,
        nombre_places: form.nombre_places,
        demandes_speciales: form.demandes_speciales,
        motivation: form.motivation,
        montant_paye: form.montant_paye,
        payment_status: form.payment_status,
        user_id: user?.id,
        event_id: id,
      });

      toast({
        title: "Inscription réussie 🎉",
        description: `Merci ${form.prenom}, votre participation et paiement ont bien été enregistrés.`,
      });

      navigate("/payment");

    } catch (error) {
      console.error(error);
      toast({
        title: "Erreur",
        description: "Impossible de finaliser le paiement.",
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

        {/* Card Informations Participant */}
        <Card className="bg-white rounded-xl shadow-lg border border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-800">Informations participant</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="prenom">Prénom</Label>
              <Input
                type="text"
                id="prenom"
                name="prenom"
                value={form.prenom}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="nom">Nom</Label>
              <Input
                type="text"
                id="nom"
                name="nom"
                value={form.nom}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Adresse e-mail</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="telephone">Téléphone</Label>
              <Input
                type="text"
                id="telephone"
                name="telephone"
                value={form.telephone}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="nombre_places">Nombre de places</Label>
              <select
                id="nombre_places"
                name="nombre_places"
                value={form.nombre_places}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="1">1 place</option>
                <option value="2">2 places</option>
                <option value="3">3 places</option>
                <option value="4">4 places</option>
              </select>
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
                placeholder="Pourquoi souhaitez-vous participer ?"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Card Paiement sécurisé */}
        <form onSubmit={handleSubmit}>
          <Card className="bg-white rounded-xl shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-800">Paiement sécurisé</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="nom_carte">Nom sur la carte</Label>
                <Input
                  type="text"
                  id="nom_carte"
                  name="nom_carte"
                  value={form.nom_carte}
                  onChange={handleChange}
                  placeholder="Nom du titulaire"
                  required
                />
              </div>

              <div>
                <Label htmlFor="numero_carte">Numéro de carte</Label>
                <Input
                  type="text"
                  id="numero_carte"
                  name="numero_carte"
                  value={form.numero_carte}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>

              <div className="flex space-x-4">
                <div className="flex-1">
                  <Label htmlFor="date_expiration">Date d'expiration</Label>
                  <Input
                    type="text"
                    id="date_expiration"
                    name="date_expiration"
                    value={form.date_expiration}
                    onChange={handleChange}
                    placeholder="MM/AA"
                    required
                  />
                </div>
                <div className="w-24">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={form.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    required
                  />
                </div>
              </div>

              <div className="bg-green-50 text-green-700 p-4 rounded-md border border-green-200 text-center font-semibold">
                Montant à payer : {form.montant_paye} €
              </div>

              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-black mt-4"
              >
                Finaliser le paiement - {form.montant_paye} €
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
