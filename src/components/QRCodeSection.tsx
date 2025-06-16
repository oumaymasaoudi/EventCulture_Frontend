
import React from 'react';
import { QrCode, Smartphone, MapPin, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

const QRCodeSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center bg-blue-100 rounded-full px-4 py-2 mb-6">
            <QrCode className="w-5 h-5 mr-2 text-blue-600" />
            <span className="text-blue-800 font-medium">Innovation numérique</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-cultural-900 mb-6">
            QR Codes interactifs sur le terrain
          </h2>
          
          <p className="text-lg text-cultural-600 mb-12 max-w-2xl mx-auto">
            Chaque lieu culturel dispose de son QR code unique. Scannez-le pour accéder instantanément 
            à des contenus enrichis, des audioguides et des informations historiques détaillées.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-cultural-900 mb-3">Scannez simplement</h3>
              <p className="text-cultural-600">
                Utilisez l'appareil photo de votre smartphone pour scanner le QR code présent sur chaque lieu
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-heritage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Info className="w-8 h-8 text-heritage-600" />
              </div>
              <h3 className="text-xl font-semibold text-cultural-900 mb-3">Découvrez l'histoire</h3>
              <p className="text-cultural-600">
                Accédez à des contenus exclusifs : audioguides, vidéos, photos d'archives et anecdotes
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-cultural-900 mb-3">Naviguez facilement</h3>
              <p className="text-cultural-600">
                Visualisez votre position dans le parcours et découvrez les prochaines étapes recommandées
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-cultural-900 mb-4">
                  Exemple de QR Code
                </h3>
                <p className="text-cultural-600 mb-6">
                  Voici un exemple de QR code que vous trouverez devant le Château de Versailles. 
                  Scannez-le pour découvrir l'histoire de cette merveille architecturale.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <QrCode className="w-5 h-5 mr-2" />
                  Tester le scan
                </Button>
              </div>
              <div className="flex justify-center">
                <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-cultural-200">
                  <div className="w-48 h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <QrCode className="w-24 h-24 text-black" />
                  </div>
                  <div className="text-center mt-4">
                    <p className="text-sm text-cultural-500">Château de Versailles</p>
                    <p className="text-xs text-cultural-400">Parcours Royal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QRCodeSection;
