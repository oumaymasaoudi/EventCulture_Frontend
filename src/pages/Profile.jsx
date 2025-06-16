import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Settings, Calendar, CreditCard, MapPin, Users } from 'lucide-react';

const Profile = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [userType, setUserType] = useState(storedUser?.role || 'participant');
  const [profile, setProfile] = useState({
    name: storedUser?.first_name || '',
    email: storedUser?.email || '',
    phone: storedUser?.phone || '',
    city: '',
    organization: storedUser?.organization || '',
    siret: ''
  });

  const participatedEvents = [];
  const organizedEvents = [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Mon Profil</h1>
            <p className="text-slate-600">Gérez vos informations et vos événements</p>
          </div>
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white/70 backdrop-blur-sm">
              <TabsTrigger value="profile" className="flex items-center gap-2"><User className="w-4 h-4" />Profil</TabsTrigger>
              <TabsTrigger value="events" className="flex items-center gap-2"><Calendar className="w-4 h-4" />Événements</TabsTrigger>
              <TabsTrigger value="account" className="flex items-center gap-2"><Settings className="w-4 h-4" />Compte</TabsTrigger>
              <TabsTrigger value="payment" className="flex items-center gap-2"><CreditCard className="w-4 h-4" />Paiement</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <Card className="bg-white/70 backdrop-blur-sm shadow-lg border-white/50">
                <CardHeader><CardTitle className="text-xl text-slate-800">Mes informations</CardTitle></CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2"><Label htmlFor="name">Nom complet</Label><Input id="name" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} /></div>
                      <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} /></div>
                      <div className="space-y-2"><Label htmlFor="phone">Téléphone</Label><Input id="phone" value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} /></div>
                      <div className="space-y-2"><Label htmlFor="city">Ville</Label><Input id="city" value={profile.city} onChange={(e) => setProfile({...profile, city: e.target.value})} /></div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="userType">Type d'utilisateur</Label>
                        <select id="userType" value={userType} onChange={(e) => setUserType(e.target.value)} className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500">
                          <option value="participant">Participant</option>
                          <option value="professionnel">Professionnel</option>
                        </select>
                      </div>
                      {userType === 'professionnel' && (
                        <>
                          <div className="space-y-2"><Label htmlFor="organization">Organisation</Label><Input id="organization" value={profile.organization} onChange={(e) => setProfile({...profile, organization: e.target.value})} /></div>
                          <div className="space-y-2"><Label htmlFor="siret">SIRET</Label><Input id="siret" value={profile.siret} onChange={(e) => setProfile({...profile, siret: e.target.value})} /></div>
                        </>
                      )}
                    </div>
                    <div className="flex justify-end">
                      <Button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-black shadow-lg">
                        Enregistrer les modifications
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;