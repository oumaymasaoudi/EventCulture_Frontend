import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Calendar, MapPin, Clock, Users, QrCode } from 'lucide-react';

const PaymentConfirmation = () => {
  const confirmation = {
    orderId: 'ORD-2024-15762',
    eventTitle: 'Festival de Jazz de Montmartre',
    date: '15 Juillet 2024',
    time: '19h00',
    location: 'Place du Tertre, Paris',
    quantity: 2,
    price: 25,
    totalAmount: 50,
    paymentMethod: 'Carte Visa •••• 4242',
    buyer: {
      name: 'Marie Dubois',
      email: 'marie.dubois@email.com'
    },
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=EVENT12345'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex justify-center items-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-4">
              <CheckCircle className="text-black w-8 h-8" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
              Confirmation de Paiement
            </h1>
            <p className="text-slate-600">
              Merci pour votre achat ! Votre réservation est confirmée.
            </p>
          </div>

          <Card className="bg-white/70 backdrop-blur-sm shadow-xl border border-white/50 mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 space-y-4">
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">
                    Détails de la réservation
                  </h3>

                  <div>
                    <div className="text-sm text-slate-500">Numéro de commande</div>
                    <div className="font-medium text-slate-800">{confirmation.orderId}</div>
                  </div>

                  <div>
                    <div className="text-sm text-slate-500">Événement</div>
                    <div className="font-medium text-slate-800">{confirmation.eventTitle}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-slate-500">Date</div>
                      <div className="font-medium text-slate-800 flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-emerald-500" />
                        {confirmation.date}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">Heure</div>
                      <div className="font-medium text-slate-800 flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-emerald-500" />
                        {confirmation.time}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-slate-500">Lieu</div>
                    <div className="font-medium text-slate-800 flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-emerald-500" />
                      {confirmation.location}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-slate-500">Quantité</div>
                      <div className="font-medium text-slate-800 flex items-center">
                        <Users className="w-4 h-4 mr-2 text-emerald-500" />
                        {confirmation.quantity} {confirmation.quantity > 1 ? 'places' : 'place'}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">Montant total</div>
                      <div className="font-bold text-emerald-600">{confirmation.totalAmount} €</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-slate-500">Moyen de paiement</div>
                    <div className="font-medium text-slate-800">{confirmation.paymentMethod}</div>
                  </div>

                  <div>
                    <div className="text-sm text-slate-500">Acheteur</div>
                    <div className="font-medium text-slate-800">{confirmation.buyer.name}</div>
                    <div className="text-sm text-slate-500">{confirmation.buyer.email}</div>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="text-center mb-4">
                    <h4 className="font-medium text-slate-800 mb-1 flex items-center justify-center">
                      <QrCode className="w-4 h-4 mr-2 text-emerald-500" />
                      Votre billet
                    </h4>
                    <p className="text-sm text-slate-600">Présentez ce QR code à l'entrée</p>
                  </div>
                  <img
                    src={confirmation.qrCode}
                    alt="QR Code du billet"
                    className="max-w-[200px] border-4 border-white shadow-md rounded-md"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 mb-8">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">Informations importantes</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="bg-emerald-100 text-emerald-700 rounded-full p-1 mr-2">
                  <CheckCircle className="w-3 h-3" />
                </span>
                <span className="text-sm text-slate-600">
                  Une confirmation a été envoyée à votre adresse email.
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-emerald-100 text-emerald-700 rounded-full p-1 mr-2">
                  <CheckCircle className="w-3 h-3" />
                </span>
                <span className="text-sm text-slate-600">
                  Vous pouvez retrouver vos billets dans votre espace personnel.
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-emerald-100 text-emerald-700 rounded-full p-1 mr-2">
                  <CheckCircle className="w-3 h-3" />
                </span>
                <span className="text-sm text-slate-600">
                  L'annulation est gratuite jusqu'à 48h avant l'événement.
                </span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-black shadow-lg">
              <Link to="/dashboard">Mon espace personnel</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-slate-300 text-slate-600 hover:bg-slate-50"
            >
              <Link to="/events">Découvrir d'autres événements</Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentConfirmation;
