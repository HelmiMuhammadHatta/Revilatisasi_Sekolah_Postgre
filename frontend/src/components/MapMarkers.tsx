import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
type P = { onSelect:(kode:number,nama:string)=>void, provinces:{kode_pro:number; nama:string}[] }
const centroids: Record<number,[number,number]> = {
  11:[5.55,95.34],12:[2.11,99.07],13:[-0.78,100.32],14:[0.51,101.45],15:[-1.61,103.61],
  16:[-3.32,104.01],17:[-3.79,102.26],18:[-5.45,105.26],19:[-2.13,106.12],21:[3.85,108.16],
  31:[-6.2,106.85],32:[-6.9,107.6],33:[-7.25,110.2],34:[-7.78,110.37],35:[-7.8,112.0],36:[-6.35,106.14],
  51:[-8.34,115.09],52:[-8.52,117.24],53:[-8.66,121.08],61:[-0.15,109.33],62:[-1.61,113.91],
  63:[-3.32,114.59],64:[0.24,116.89],65:[3.0,116.0],71:[1.35,124.83],72:[-0.9,119.86],
  73:[-3.99,119.75],74:[-4.0,122.5],75:[0.7,122.97],76:[-2.55,119.23],81:[-3.24,128.08],
  82:[1.36,127.52],91:[-4.26,138.97],92:[-1.32,133.18]
}
const dot = L.divIcon({ className:'', html:'<div class="marker-dot"></div>', iconSize:[12,12], iconAnchor:[6,6] })
export default function MapMarkers({ onSelect, provinces }: P){
  return (
    <MapContainer center={[-2,118]} zoom={5} style={{height:'100%',width:'100%'}} scrollWheelZoom={false}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {provinces.map(p => { const c = centroids[p.kode_pro]; if(!c) return null;
        return <Marker key={p.kode_pro} position={[c[0],c[1]]} icon={dot} eventHandlers={{click:()=>onSelect(p.kode_pro,p.nama)}}>
          <Popup>{p.nama}</Popup>
        </Marker>
      })}
    </MapContainer>
  )
}
