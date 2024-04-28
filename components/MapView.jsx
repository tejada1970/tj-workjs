import React from 'react';
import { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";
import { textObject } from '@/utils/scripts-js/textObject';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import { FaLocationDot } from 'react-icons/fa6';

L.Marker.prototype.options.icon = L.icon({
  // iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconUrl: '/images/marker-icons/leaf-orange.png',
  iconSize: [1, 1],
  draggable: false
});

const MapView = ({lat, lng, titleStartingPoint, titleFinalPoint}) => {

  // const destination = [38.99998, -0.16316];
  const destination = [lat, lng];
  const [userLocation, setUserLocation] = useState([0, 0]);
  const mapRef = useRef(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setUserLocation([latitude, longitude]);
        },
        (err) => {
          console.warn(`ERROR(${err.code}): ${err.message}`);
        }
      );
    } else {
      console.warn(textObject.mapWiew.map.msgWarn);
    }
  }, []);

  const UserIcon = new L.icon({
    iconUrl: '/images/marker-icons/leaf-orange.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowUrl: '/images/marker-icons/leaf-shadow.png',
    shadowSize: [50, 64],
    shadowAnchor: [4, 62],
  });

  const destinationIcon = new L.icon({
    iconUrl: '/images/marker-icons/leaf-green.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowUrl: '/images/marker-icons/leaf-shadow.png',
    shadowSize: [50, 64],
    shadowAnchor: [4, 62],
  });

  const LocationMarker = () => {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        console.log(e.latlng);
        if (map) {
          map.flyTo(e.latlng, map.getZoom());
        }
      },
    });
    return position === null ? null : (
      <Marker position={position} icon={UserIcon} draggable={false}>
        <Popup>
          {textObject.mapWiew.map.titleStartingPoint}
        </Popup>
      </Marker>
    );
  };

  const handleButtonClick = () => {
    const map = mapRef.current;
    if (map) {
      map.locate();
    }
  };

  function Routing() {

    const map = useMap();
    const routingControlRef = useRef(null);

    useEffect(() => {
      if (!map) return;
      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(userLocation),
          L.latLng(destination)
        ],
        routeWhileDragging: true,
        collapsible: true,
        lineOptions: {
          styles: [
            { color: 'blue', opacity: 0.7, weight: 5 }
          ]
        },
        language: textObject.mapWiew.map.languageMapRouting
        /* Aquí debes proporcionar tu propia URL de servidor OSRM */
        // serviceUrl: "http://my-custom-osrm-server.com/route/v1" 
      }).addTo(map);

      /* Almacena la referencia al control de enrutamiento */
      routingControlRef.current = routingControl;

      return () => {
        if (routingControlRef.current) {
          map.removeControl(routingControlRef.current);
        }
      };
    }, [map, userLocation]);
    return null;
  }

  return (
    <div style={{ height: "500px", position: "relative"}}>
      {/* Button Mí Ubicación */}
      <button 
        className='
          rounded-xl p-2 bg-blue-700 text-slate-200 text-sm 
          tracking-widest shadow-custom focus:outline-none flex gap-2 
          hover:bg-orange-700 active:scale-90 m-2
        '
        onClick={handleButtonClick}
      >
        <FaLocationDot size='20' />
        {textObject.mapWiew.map.textBtn}
      </button>
      {userLocation[0] !== 0 && (
        <MapContainer
          ref={mapRef}
          style={{ height: "100%", width: "100%"}}
          center={destination}
          zoom={13}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
          <Marker position={userLocation} icon={UserIcon} >
            <Popup>{titleStartingPoint}</Popup>
          </Marker>
          <Marker position={destination} icon={destinationIcon} draggable={false}>
            <Popup>{titleFinalPoint}</Popup>
          </Marker>
          <Routing />
        </MapContainer>
      )}
    </div>
  );
}
export default MapView