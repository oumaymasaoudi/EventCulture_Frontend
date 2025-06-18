import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useParams, useNavigate } from 'react-router-dom';


const CreateProgram = () => {
const { toast } = useToast();
const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

const { eventId, programId } = useParams(); // 🟣 Ajout programId
const navigate = useNavigate(); // ✅ Cette ligne est manquante

const [selectedEventId, setSelectedEventId] = useState(eventId || '');
const [programs, setPrograms] = useState([{
  date: '',
  start_time: '',
  end_time: '',
  title: '',
  description: '',
  category: ''
}]);

const [events, setEvents] = useState([]);


// 👉 useEffect pour charger les événements + éventuellement le programme
useEffect(() => {
  const fetchEvents = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/events/user/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Erreur lors du chargement des événements');

      const data = await response.json();
      setEvents(data);
    } catch (err) {
      console.error('❌ Erreur chargement events:', err);
      toast({
        title: 'Erreur',
        description: err.message,
        variant: 'destructive',
      });
    }
  };

  const fetchProgram = async () => {
    if (!programId) return; // pas en mode edit

    try {
      const response = await fetch(`http://localhost:5000/api/programs/${programId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Erreur lors de la récupération du programme');

      const data = await response.json();

      // On remplit le formulaire avec les données du programme
      setPrograms([{
        date: data.date || '',
        start_time: data.start_time || '',
        end_time: data.end_time || '',
        title: data.title || '',
        description: data.description || '',
        category: data.category || ''
      }]);

      // On remplit aussi l'event sélectionné
      setSelectedEventId(data.event_id);

    } catch (error) {
      console.error("❌ Erreur chargement programme :", error);
      toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
    }
  };

  // On lance les 2 en parallèle
  fetchEvents().then(() => {
    fetchProgram();
  });

}, [programId, user.id, token, toast]);


      
  const handleChange = (index, field, value) => {
    const newPrograms = [...programs];
    newPrograms[index][field] = value;
    setPrograms(newPrograms);
  };

  const handleAddLine = () => {
    setPrograms([
      ...programs,
      {
        date: '',
        start_time: '',
        end_time: '',
        title: '',
        description: '',
        category: ''
      }
    ]);
  };

  
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!selectedEventId) {
    toast({
      title: 'Erreur',
      description: 'Veuillez sélectionner un événement.',
      variant: 'destructive',
    });
    return;
  }

  // Vérifier les champs requis pour chaque programme
  for (const prog of programs) {
    if (!prog.date || !prog.start_time || !prog.end_time || !prog.title) {
      toast({
        title: 'Erreur',
        description: 'Tous les champs requis doivent être remplis (Date, Heure de début, Heure de fin, Titre).',
        variant: 'destructive',
      });
      return;
    }
  }

  try {
    if (programId) {
      // 🟣 Mode EDITION → PUT
      const prog = programs[0]; // on n'édite qu'un seul programme
      const response = await fetch(`http://localhost:5000/api/programs/${programId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...prog,
          event_id: selectedEventId,
        }),
      });

      if (!response.ok) {
        let errMessage = 'Erreur serveur';
        try {
          const err = await response.json();
          errMessage = err.message || err.error || 'Erreur serveur';
        } catch (errParse) {
          console.warn('Impossible de parser le JSON d\'erreur');
        }
        throw new Error(errMessage);
      }

      toast({
        title: 'Succès',
        description: 'Le programme a été modifié avec succès.',
      });

    } else {
      // 🟣 Mode CREATION → POST
      for (const prog of programs) {
        const response = await fetch('http://localhost:5000/api/programs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...prog,
            event_id: selectedEventId,
          }),
        });

        if (!response.ok) {
          let errMessage = 'Erreur serveur';
          try {
            const err = await response.json();
            errMessage = err.message || err.error || 'Erreur serveur';
          } catch (errParse) {
            console.warn('Impossible de parser le JSON d\'erreur');
          }

          throw new Error(errMessage);
        }
      }

      toast({
        title: 'Succès',
        description: 'Tous les programmes ont été enregistrés.',
      });

      navigate(`/program/list/${selectedEventId}`);

      // Réinitialiser le formulaire
      setPrograms([{
        date: '',
        start_time: '',
        end_time: '',
        title: '',
        description: '',
        category: ''
      }]);
      if (!eventId) {
        setSelectedEventId('');
      }
    }
  } catch (err) {
    console.error('❌ Erreur ajout/modification programme :', err);
    toast({
      title: 'Erreur',
      description: err.message,
      variant: 'destructive',
    });
  }
};


  return (
    <>
      <Header />
      <Card className="my-8 container mx-auto">
        <CardHeader>
          <CardTitle>Ajouter des Programmes pour l'Événement</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* 🟣 Select événements */}
            <div>
              <Label>Choisir un événement</Label>
              <select
                className="w-full p-2 border rounded-md"
                value={selectedEventId}
                onChange={(e) => setSelectedEventId(e.target.value)}
              >
                <option value="">-- Sélectionner un événement --</option>
                {events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.title} ({event.date_start})
                  </option>
                ))}
              </select>
            </div>

            {/* Formulaire Program */}
            {programs.map((program, index) => (
              <div key={index} className="border p-4 rounded-md bg-white shadow-sm space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Date</Label>
                    <Input type="date" value={program.date} onChange={(e) => handleChange(index, 'date', e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label>Début</Label>
                      <Input type="time" value={program.start_time} onChange={(e) => handleChange(index, 'start_time', e.target.value)} />
                    </div>
                    <div>
                      <Label>Fin</Label>
                      <Input type="time" value={program.end_time} onChange={(e) => handleChange(index, 'end_time', e.target.value)} />
                    </div>
                  </div>
                </div>
                <div>
                  <Label>Titre de l'activité</Label>
                  <Input value={program.title} onChange={(e) => handleChange(index, 'title', e.target.value)} />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea value={program.description} onChange={(e) => handleChange(index, 'description', e.target.value)} />
                </div>
                <div>
                  <Label>Catégorie</Label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={program.category}
                    onChange={(e) => handleChange(index, 'category', e.target.value)}
                  >
                    <option value="">-- Choisir --</option>
                    <option value="Atelier">Atelier</option>
                    <option value="Action">Action</option>
                    <option value="Pause">Pause</option>
                    <option value="Repas">Repas</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center">
              <Button type="button" onClick={handleAddLine} className="bg-orange-500 text-black">
                + Ajouter une ligne
              </Button>
              <Button type="submit" className="bg-red-600 text-black">
                Enregistrer tous les programmes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Footer />
    </>
  );
};

export default CreateProgram;
