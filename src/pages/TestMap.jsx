import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const TestMap = () => {
  return (
    <div style={{ height: "500px", width: "100%" }}>
      <MapContainer
        center={[48.8566, 2.3522]} // Paris
        zoom={12}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <Marker position={[48.8566, 2.3522]} icon={markerIcon}>
          <Popup>Paris</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default TestMap;
