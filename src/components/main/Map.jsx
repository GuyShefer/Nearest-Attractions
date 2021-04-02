import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const Map = ({ userLocation }) => {

    return (
        <>
            {
                <MapContainer center={[userLocation.latitude, userLocation.longitude]} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[userLocation.latitude, userLocation.longitude]}>
                        <Popup>You Are Here!</Popup>
                    </Marker>
                </MapContainer>

            }
        </>
    )
}

export default Map;