import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const ProgramListView = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [programs, setPrograms] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resEvent = await fetch(`http://localhost:5000/api/events/${eventId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dataEvent = await resEvent.json();
        setEvent(dataEvent);

        const resProg = await fetch(`http://localhost:5000/api/programs/event/${eventId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dataProg = await resProg.json();
        setPrograms(dataProg);
      } catch (err) {
        console.error("Erreur lors du chargement :", err);
      }
    };
    fetchData();
  }, [eventId, token]);

  const handleEdit = (programId) => {
    navigate(`/create-program/edit/${programId}`);
  };

  const handleDelete = async (programId) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce programme ?")) {
      try {
        await fetch(`http://localhost:5000/api/programs/${programId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        setPrograms(programs.filter((p) => p.id !== programId));
      } catch (err) {
        console.error("Erreur lors de la suppression :", err);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto my-10">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              {event?.title}{" "}
              <span className="text-sm font-normal text-gray-500">
                ({event?.category})
              </span>
            </CardTitle>
            <p className="text-center text-gray-600">
              {event?.date_start} - {event?.date_end}
            </p>
          </CardHeader>

          <CardContent>
            <table className="w-full table-auto border-collapse border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Heure</th>
                  <th className="border p-2">Catégorie</th>
                  <th className="border p-2">Description</th>
                  <th className="border p-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {programs.map((prog) => (
                  <tr key={prog.id} className="hover:bg-gray-50">
                    <td className="border p-2">
                      {prog.start_time} - {prog.end_time}
                    </td>
                    <td className="border p-2">{prog.category}</td>
                    <td className="border p-2">{prog.description}</td>
                    <td className="border p-2 text-right">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => handleEdit(prog.id)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Modifier"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(prog.id)}
                          className="text-red-600 hover:text-red-800"
                          title="Supprimer"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default ProgramListView;
