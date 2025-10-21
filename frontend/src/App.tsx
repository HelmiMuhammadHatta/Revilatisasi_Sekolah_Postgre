import React, { useEffect, useState } from 'react'
import MapMarkers from './components/MapMarkers'
import SummaryCards from './components/SummaryCards'
import DonutCard from './components/DonutCard'
import TableRekap from './components/TableRekap'
import BarLineProv from './components/BarLineProv'
import KabupatenDetail from './components/KabupatenDetail'
import { fetchNationalSummary, fetchProvinceSummary, fetchDonut, fetchTable, fetchProvinces, fetchBarLine, fetchDistricts } from './services/api'

export type Summary = {
  kode_pro?: number | string; provinsi?: string;
  total_paud: number; total_sd: number; total_smp: number; total_sma: number;
  total_sekolah: number;
  total_anggaran_paud: number; total_anggaran_sd: number; total_anggaran_smp: number; total_anggaran_sma: number;
  total_anggaran: number;
}

export default function App(){
  const [selected, setSelected] = useState<{ kode: number | 'all'; nama: string }>({ kode:'all', nama:'NASIONAL' })
  const [summary, setSummary] = useState<Summary | null>(null)
  const [donut, setDonut] = useState<{ name: string; value: number }[]>([])
  const [rows, setRows] = useState<any[]>([])
  const [prov, setProv] = useState<{kode_pro:number; nama:string}[]>([])
  const [barline, setBarline] = useState<{provinsi:string; total_sekolah:number; total_anggaran:number}[]>([])
  const [districts, setDistricts] = useState<{kode_kab:number; nama:string; jenis:string}[]>([])

  const loadAll = async () => {
    const s = await fetchNationalSummary()
    const d = await fetchDonut('all')
    const t = await fetchTable('all')
    const p = await fetchProvinces()
    const bl = await fetchBarLine()
    setSummary(s); setDonut(d); setRows(t); setProv(p); setBarline(bl)
  }

  const onPick = async (kode:number, nama:string) => {
    const s = await fetchProvinceSummary(kode)
    const d = await fetchDonut(String(kode))
    const t = await fetchTable(String(kode))
    const ds = await fetchDistricts(kode)
    setSummary(s); setDonut(d); setRows(t); setDistricts(ds)
    setSelected({ kode, nama: nama.toUpperCase() })
  }

  useEffect(()=>{ loadAll() }, [])

  return (
    <div className="app">
      <aside className="sidebar"><div className="badge">ID</div><div className="navbtn">☰</div></aside>
      <main className="content">
        <div className="header">
          <h1>Revitalisasi Sarana Belajar Mengajar</h1>
          <small>Klik provinsi pada peta untuk memfilter dashboard berdasarkan provinsi. Untuk kabupaten/kota gunakan dropdown di bawah.</small>
        </div>

        <section className="grid">
          <div className="card">
            <h3 className="sectionTitle">Persebaran Program Revitalisasi Sekolah Nasional</h3>
            <div className="mapWrap"><MapMarkers onSelect={onPick} provinces={prov}/></div>
            <div className="legend" />
          </div>
          <div className="card">
            <h3 className="sectionTitle">{selected.nama}</h3>
            <SummaryCards summary={summary}/>
          </div>
        </section>

        <section className="row2">
          <div className="card">
            <h3 className="sectionTitle">Tabel Revitalisasi Sekolah Berdasarkan Provinsi</h3>
            <TableRekap rows={rows}/>
          </div>
          <div className="card">
            <h3 className="sectionTitle">Anggaran Revitalisasi Sekolah Berdasarkan Bentuk Pendidikan</h3>
            <DonutCard data={donut}/>
          </div>
        </section>

        <section className="row3">
          <div className="card">
            <h3 className="sectionTitle">Banyaknya Revitalisasi Sekolah berdasarkan Anggaran Revitalisasi Berdasarkan Provinsi</h3>
            <BarLineProv data={barline}/>
          </div>
          <div className="card">
            <KabupatenDetail provinceName={selected.nama} districts={districts}/>
          </div>
        </section>
      </main>
    </div>
  )
}
