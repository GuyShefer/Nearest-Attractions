import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const Map = ({ location }) => {

    return (
        <>
            {
                location ?
                    <MapContainer center={[location.latitude, location.longitude]} zoom={13} scrollWheelZoom={false} style={{margin: '0px'}}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[location.latitude, location.longitude]}>
                            <Popup>Hotel is Here!</Popup>
                        </Marker>
                    </MapContainer>
                    : null
            }
        </>
    )
}

export default Map;