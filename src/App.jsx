import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import CreateProgram from './pages/CreateProgram.jsx';
import CreateSite from '@/pages/CreateSite';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CreateLieu from './pages/CreateLieu';

import Index from "./pages/Index.jsx";
import Events from "./pages/Events.jsx";
import EventDetail from "./pages/EventDetail";
import Register from "./pages/Register";
import PaymentConfirmation from "./pages/PaymentConfirmation";
import CreateEvent from "./pages/CreateEvent";
import CreateLocation from "./pages/CreateLocation";
import CreateParcours from "./pages/CreateParcours";
import Parcours from "./pages/Parcours.jsx";
import ParcoursDetail from "./pages/ParcoursDetail";
import Pricing from "./pages/Pricing.jsx";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth.jsx";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound.jsx";
import UserSettings from './pages/UserSettings.jsx';

import Lieux from "./pages/Lieux.jsx";
import Sites from "./pages/Sites.jsx";
import Programs from "./pages/Programs.jsx";

// React Query Client
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Pages principales */}
          <Route path="/" element={<Index />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/events/:id/register" element={<Register />} />
          <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
          <Route path="/payment-confirmation/:id" element={<PaymentConfirmation />} />

          {/* Création */}
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/events/edit/:id" element={<CreateEvent />} />

          <Route path="/create-location" element={<CreateLocation />} />
          <Route path="/create-parcours" element={<CreateParcours />} />

          {/* Parcours */}
          <Route path="/parcours" element={<Parcours />} />
          <Route path="/parcours/:id" element={<ParcoursDetail />} />

          {/* Programmes → attention à l'ordre des routes */}
          <Route path="/create-program/event/:eventId" element={<CreateProgram />} />
          <Route path="/create-program/edit/:programId" element={<CreateProgram />} />
          <Route path="/create-program" element={<CreateProgram />} />
          <Route path="/programs" element={<Programs />} />

          {/* Lieux */}
          <Route path="/create-lieu" element={<CreateLieu />} />
          <Route path="/create-lieu/:id" element={<CreateLieu />} />
          <Route path="/lieux" element={<Lieux />} />

          {/* Sites */}
          <Route path="/create-site" element={<CreateSite />} />
          <Route path="/create-site/:id" element={<CreateSite />} />
          <Route path="/sites" element={<Sites />} />

          {/* Autres pages */}
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings/:id" element={<UserSettings />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
