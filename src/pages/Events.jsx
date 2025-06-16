import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import EventFilters from "@/components/EventFilters";
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/events")

      .then((res) => setEvents(res.data))
      .catch((err) => console.error("Erreur lors du chargement des événements :", err));
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-rose-50 to-teal-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
              Événements Culturels
            </h1>
            <p className="text-slate-600">
              Découvrez tous les événements culturels près de chez vous
            </p>
          </div>

          <Button
            className="mt-4 lg:mt-0 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-black shadow-lg"
            onClick={() => navigate("/create-event")}
          >
            <Plus className="w-4 h-4 mr-2" />
            Créer un événement
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-1/4">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Recherche & Filtres</h3>

              <div className="relative mb-6">
                <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Rechercher un événement..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-slate-200 focus:border-violet-300 focus:ring-violet-200"
                />
              </div>

              <EventFilters
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>
          </aside>

          <main className="lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
                  <p className="text-slate-600 text-lg">
                    Aucun événement trouvé pour votre recherche.
                  </p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Events;
