"use client";
import { MapContainer, TileLayer, Circle, Marker, Popup } from "react-leaflet";
import L from "leaflet";  // Importing Leaflet to create custom icon
import styles from 'styles/map.module.css'

const center = [45.097972, 39.059341];

const MapComponent = () => {
  const handleMapClick = () => {
    window.open("https://yandex.ru/maps/?text=Лётчика%20Позднякова%2C%202%20помещение%20А", "_blank");
  };
  const customIcon = new L.Icon({
    iconUrl: "/photos/logo.jpg",
    iconSize: [20, 20],
    radius:'50px',
    className: styles.customMarker
  });

  return (
    <MapContainer center={center} zoom={11} style={{ height: "400px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Circle center={center} radius={1000} color="green" fillColor="green" fillOpacity={0.6} />
      <Circle center={center} radius={3000} color="red" fillColor="red" fillOpacity={0.3} />

      <Marker position={center} icon={customIcon}>
        <Popup>
          <div style={{ textAlign: 'center' }}>
            <h3 onClick={handleMapClick} style={{cursor:"pointer"}}>Наша пиццерия здесь📍</h3>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
