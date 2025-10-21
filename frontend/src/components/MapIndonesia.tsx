import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import { fetchChoropleth } from '../services/api'

type Props = { onSelect: (kodePro: number, nama: string) => void }

export default function MapIndonesia({ onSelect }: Props) {
  const [geo, setGeo] = useState<any>(null)
  const [choro, setChoro] = useState<any[]>([])

  useEffect(() => {
    fetch('/geo/provinces.json').then(r => r.json()).then(setGeo)
    fetchChoropleth().then(setChoro)
  }, [])

  const getColor = (kode: number) => {
    const p = choro.find(x => Number(x.kode_pro) === Number(kode))
    const v = p?.total || 0
    if (v > 1000) return '#1d4ed8'
    if (v > 500) return '#3b82f6'
    if (v > 100) return '#93c5fd'
    if (v > 0) return '#dbeafe'
    return '#e5e7eb'
  }

  const style = (feature: any) => ({
    fillColor: getColor(feature.properties.kode_pro),
    weight: 1,
    color: 'white',
    opacity: 1,
    fillOpacity: .75,
  })

  const onEachFeature = (feature: any, layer: any) => {
    const { nama, kode_pro } = feature.properties
    layer.bindTooltip(nama, { sticky: true })
    layer.on('click', () => onSelect(Number(kode_pro), String(nama)))
  }

  return (
    <MapContainer center={[-2, 118]} zoom={5} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {geo && <GeoJSON data={geo as any} style={style} onEachFeature={onEachFeature} />}
    </MapContainer>
  )
}
