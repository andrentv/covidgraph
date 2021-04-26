import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { icon } from 'leaflet';

const ICON = icon({
    iconUrl: "/public/location.svg",
    iconSize: [16,16],
})

export default function Map({ countryMonth }) {
    return (
        <MapContainer center={[countryMonth.Lat, countryMonth.Lon]} zoom={1} scrollWheelZoom={false} style={{height: 200, width: "100%"}}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[countryMonth.Lat, countryMonth.Lon]}>
            <Popup>
                {countryMonth.Coutry} is located here!
            </Popup>
            </Marker>
        </MapContainer>

    )
}