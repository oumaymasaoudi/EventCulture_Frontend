import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { User, KeyRound, Mail, Building, UserPlus, LogIn, Users, Briefcase, Phone, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { GoogleLogin } from '@react-oauth/google';

// Schémas de validation
const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

const baseRegisterSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(10, 'Numéro de téléphone invalide'),
  address: z.string().min(5, 'Adresse trop courte'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  confirmPassword: z.string(),
  userType: z.enum(['participant', 'professionnel']),
  agreeTerms: z.boolean().refine(val => val === true, 'Vous devez accepter les conditions'),
});

const handleGoogleLogin = () => {
  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=237657974922-02gqtemj5st5ugofq55lbn90onuaeqmb.apps.googleusercontent.com&redirect_uri=http://localhost:8080/auth/callback&response_type=token&scope=email profile`;
};


const professionalRegisterSchema = baseRegisterSchema.extend({
  organization: z.string().min(2, 'Nom de l\'organisation requis'),
  siret: z.string().length(14, 'Le SIRET doit contenir 14 chiffres'),
  description: z.string().min(10, 'Description trop courte'),
});

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userType, setUserType] = useState('participant');

  // Formulaire de connexion
  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  // Formulaire d'inscription
  const registerForm = useForm({
    resolver: zodResolver(userType === 'professionnel' ? professionalRegisterSchema : baseRegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      password: '',
      confirmPassword: '',
      userType: 'participant',
      agreeTerms: false,
      ...(userType === 'professionnel' && {
        organization: '',
        siret: '',
        description: '',
      })
    }
  });

  const handleLogin = async (data) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Identifiants invalides');

      const result = await res.json();
      console.log('Utilisateur connecté :', result);

      toast({ title: 'Connexion réussie', description: 'Bienvenue !' });

      // Stocker le token ou l'utilisateur si besoin
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));

      navigate('/dashboard');
    } catch (err) {
      toast({
        title: 'Erreur de connexion',
        description: err.message,
        variant: 'destructive',
      });
    }
  };

  const handleRegister = async (data) => {
    console.log("handleRegister déclenché avec les données :", data);

    if (data.password !== data.confirmPassword) {
      toast({
        title: "Erreur d'inscription",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: data.name,
          last_name: "", // pour ne pas bloquer Sequelize si c’est requis
          email: data.email,
          password: data.password,
          phone: data.phone,
          role: data.userType,
          organization: data.userType === 'professionnel' ? data.organization : null
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de l’inscription');
      }

      const result = await response.json();
      console.log('Utilisateur créé :', result);

      toast({
        title: "Inscription réussie",
        description: `Bienvenue ${data.name} !`,
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Erreur d’enregistrement :', error.message);
      toast({
        title: "Erreur d'inscription",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-nude-50 via-stone-50 to-nude-100">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              Bienvenue sur EventCulture
            </h1>
            <p className="text-slate-600">
              Connectez-vous ou créez un compte pour découvrir le patrimoine culturel
            </p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-nude-100">
            <TabsTrigger 
              value="login" 
              className="flex items-center gap-2 text-black bg-white hover:bg-blue-500 hover:text-white data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              <LogIn className="w-4 h-4" />
              Se connecter
            </TabsTrigger>

            

            <TabsTrigger 
              value="register" 
              className="flex items-center gap-2 text-black bg-white hover:bg-blue-500 hover:text-white data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              <UserPlus className="w-4 h-4" />
              S'inscrire
            </TabsTrigger>
          </TabsList>

            <TabsContent value="login">
              <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-nude-200">
                <CardHeader>
                  <CardTitle className="text-xl text-slate-800 mx-auto">Connexion</CardTitle>
                  <CardDescription className="text-black">
                    Entrez vos identifiants pour accéder à votre compte
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-6">
                      <FormField
                        control={loginForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-medium">Email</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                <Input
                                  placeholder="votre@email.com"
                                  className="pl-10 border-violet-700 focus:border-violet-800 focus:ring-violet-700 placeholder:text-violet-700
"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center justify-between">
                              <FormLabel className="text-slate-700 font-medium">Mot de passe</FormLabel>
                              <a href="#" className="text-sm text-violet-600 hover:underline">
                                Mot de passe oublié ?
                              </a>
                            </div>
                            <FormControl>
                              <div className="relative">
                                <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                <Input
                                  type="password"
                                  placeholder="••••••••"
                                  className="pl-10 border-violet-700 focus:border-violet-800 focus:ring-violet-700 placeholder:text-violet-700
"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-black shadow-lg"
                      >
                        Se connecter
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="register">
  <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-nude-200">
    <CardHeader>
      <CardTitle className="text-xl text-slate-800">Inscription</CardTitle>
      
      <CardDescription className="text-slate-600">
        Créez votre compte pour accéder à toutes les fonctionnalités
      </CardDescription>
      
    </CardHeader>
    <CardContent>

                  <Form {...registerForm}>
                    <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-6">
                      {/* Type d'utilisateur */}
                      <FormField
                        control={registerForm.control}
                        name="userType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-medium">Type de compte</FormLabel>
                            <FormControl>
                              <RadioGroup
                                value={field.value}
                                onValueChange={(value) => {
                                  field.onChange(value);
                                  setUserType(value);
                                }}
                                className="grid grid-cols-2 gap-4"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="participant" id="participant" />
                                  <Label htmlFor="participant" className="flex items-center gap-2 cursor-pointer">
                                    <Users className="w-4 h-4 text-violet-500" />
                                    Participant
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="professionnel" id="professionnel" />
                                  <Label htmlFor="professionnel" className="flex items-center gap-2 cursor-pointer">
                                    <Briefcase className="w-4 h-4 text-violet-500" />
                                    Professionnel
                                  </Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Informations de base */}
                      <FormField
                        control={registerForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-medium">
                              {userType === 'professionnel' ? 'Nom du responsable' : 'Nom complet'}
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                <Input
                                  placeholder={userType === 'professionnel' ? 'Nom du responsable' : 'Votre nom complet'}
                                  className="pl-10 border-violet-700 focus:border-violet-800 focus:ring-violet-700 placeholder:text-violet-700
"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={registerForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-medium">Email</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                <Input
                                  type="email"
                                  placeholder="votre@email.com"
                                  className="pl-10 border-violet-700 focus:border-violet-800 focus:ring-violet-700 placeholder:text-violet-700
"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Champs spécifiques aux professionnels */}
                      {userType === 'professionnel' && (
                        <>
                          <FormField
                            control={registerForm.control}
                            name="organization"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-700 font-medium">Nom de l'organisation</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                    <Input
                                      placeholder="Nom de votre institution"
                                      className="pl-10 border-violet-700 focus:border-violet-800 focus:ring-violet-700 placeholder:text-violet-700
"
                                      {...field}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={registerForm.control}
                            name="siret"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-700 font-medium">Numéro SIRET</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="14 chiffres"
                                    className="border-nude-200 focus:border-violet-300 focus:ring-violet-200"
                                    maxLength={14}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={registerForm.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-700 font-medium">Description de l'organisation</FormLabel>
                                <FormControl>
                                  <textarea
                                    placeholder="Décrivez votre organisation et vos activités..."
                                    className="w-full px-3 py-2 border border-nude-200 rounded-md focus:border-violet-300 focus:ring-violet-200 resize-none"
                                    rows={3}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </>
                      )}

                      {/* Informations de contact */}
                      <FormField
                        control={registerForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-medium">Téléphone</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                <Input
                                  placeholder="06 12 34 56 78"
                                  className="pl-10 border-violet-700 focus:border-violet-800 focus:ring-violet-700 placeholder:text-violet-700
"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={registerForm.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-medium">Adresse</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                <Input
                                  placeholder="Votre adresse complète"
                                  className="pl-10 border-violet-700 focus:border-violet-800 focus:ring-violet-700 placeholder:text-violet-700
"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Mots de passe */}
                      <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-medium">Mot de passe</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                <Input
                                  type="password"
                                  placeholder="••••••••"
                                  className="pl-10 border-violet-700 focus:border-violet-800 focus:ring-violet-700 placeholder:text-violet-700
"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={registerForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-medium">Confirmer le mot de passe</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                <Input
                                  type="password"
                                  placeholder="••••••••"
                                  className="pl-10 border-violet-700 focus:border-violet-800 focus:ring-violet-700 placeholder:text-violet-700
"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Conditions générales */}
                      <FormField
  control={registerForm.control}
  name="agreeTerms"
  render={({ field }) => (
    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
      <FormControl>
        <Checkbox
  checked={field.value}
  onCheckedChange={field.onChange}
  className="w-5 h-5 border border-gray-400 text-black"
  style={{
    accentColor: 'black'
  }}
/>

      </FormControl>
      <div className="space-y-1 leading-none">
        <FormLabel className="text-slate-700 text-sm">
          J'accepte les conditions générales et la politique de confidentialité
        </FormLabel>
        <FormMessage />
      </div>
    </FormItem>
  )}
/>


                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-black shadow-lg"
                      >
                        Créer mon compte {userType}
                      </Button>
                    </form>
                  </Form>
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

export default Auth;