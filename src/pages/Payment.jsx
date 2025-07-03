import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Payment = () => {
  const { id } = useParams(); // id de l'événement
  const [montant, setMontant] = useState(0);
  const [participation, setParticipation] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
  const fetchParticipation = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/participations?user_id=${user.id}`);
      console.log(">>> Participations reçues :", res.data); // 👈 AJOUT

      const p = res.data.find(p => Number(p.event_id) === Number(id));
      if (p) {
        console.log(">>> Participation trouvée :", p); // 👈 AJOUT
        setParticipation(p);
        setMontant(parseFloat(p.montant_paye || 0));
      } else {
        console.warn("❌ Aucune participation trouvée pour event_id =", id);
      }
    } catch (error) {
      console.error("Erreur lors du chargement de la participation :", error);
    }
  };

  fetchParticipation();
}, [id, user.id]);


  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded">
      <h2 className="text-xl font-bold text-center mb-4">Paiement de votre inscription</h2>

      <form>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Nom sur la carte</label>
          <input type="text" className="w-full border rounded p-2" placeholder="Oumayma Saoudi" />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Numéro</label>
          <input type="text" className="w-full border rounded p-2" placeholder="1234 5678 9012 3456" />
        </div>

        <div className="flex space-x-4 mb-4">
          <div className="flex-1">
            <label className="block mb-1 font-semibold">Expiration</label>
            <input type="text" className="w-full border rounded p-2" placeholder="MM/AA" />
          </div>
          <div className="w-1/3">
            <label className="block mb-1 font-semibold">Code</label>
            <input type="text" className="w-full border rounded p-2" placeholder="123" />
          </div>
        </div>

        <div className="text-center font-semibold text-purple-800 border border-purple-200 bg-purple-50 p-3 rounded">
          Montant à payer : {montant} €
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 mt-4 rounded"
          disabled={!participation}
          onClick={async (e) => {
            e.preventDefault();
            try {
              await axios.put(`http://localhost:5000/api/participations/${participation.id}`, {
                payment_status: "payé"
              });
              alert("Paiement simulé avec succès !");
            } catch (err) {
              console.error("Erreur paiement :", err);
              alert("Erreur lors du paiement.");
            }
          }}
        >
          Valider le paiement - {montant} €
        </button>
      </form>
    </div>
  );
};

export default Payment;
