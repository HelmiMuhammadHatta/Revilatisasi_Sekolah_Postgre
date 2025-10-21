import React, { useEffect, useState } from 'react'
import { fetchProvinces, fetchNational, fetchDonut, fetchBarLine, fetchTable, fetchSummaryProvince } from '../data/api'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Line, Legend } from 'recharts'

const COLORS = ['#22c55e','#3b82f6','#f59e0b','#ef4444']

type Prov = { kode_pro:number, nama:string }
type Row = { provinsi:string, jenjang:'PAUD'|'SD'|'SMP'|'SMA', jumlah:number, anggaran:number }

export default function App(){
  const [provs, setProvs] = useState<Prov[]>([])
  const [kodePro, setKodePro] = useState<string>('all')
  const [national, setNational] = useState<any>({})
  const [donut, setDonut] = useState<any[]>([])
  const [barline, setBarline] = useState<any[]>([])
  const [table, setTable] = useState<Row[]>([])
  const [summaryProv, setSummaryProv] = useState<any|null>(null)

  useEffect(() => { (async () => {
    setProvs(await fetchProvinces())
    setNational(await fetchNational())
    setDonut(await fetchDonut('all'))
    setBarline(await fetchBarLine())
    setTable(await fetchTable('all'))
  })() }, [])

  useEffect(() => { (async () => {
    if(kodePro==='all'){
      setSummaryProv(null)
      setDonut(await fetchDonut('all'))
      setTable(await fetchTable('all'))
    }else{
      setSummaryProv(await fetchSummaryProvince(kodePro))
      setDonut(await fetchDonut(kodePro))
      setTable(await fetchTable(kodePro))
    }
  })() }, [kodePro])

  return (
    <div className="container">
      <div className="card">
        <div className="title">Filter Provinsi</div>
        <select value={kodePro} onChange={(e)=>setKodePro(e.target.value)}>
          <option value="all">Semua Provinsi</option>
          {provs.map(p => <option key={p.kode_pro} value={p.kode_pro}>{p.nama}</option>)}
        </select>

        <div style={{marginTop:12}} className="kpis">
          <div className="kpi"><div className="title">Total Sekolah</div><div style={{fontSize:20,fontWeight:700}}>{(summaryProv?.total_sekolah ?? national.total_sekolah ?? 0).toLocaleString('id-ID')}</div></div>
          <div className="kpi"><div className="title">Total Anggaran</div><div style={{fontSize:20,fontWeight:700}}>Rp {(summaryProv?.total_anggaran ?? national.total_anggaran ?? 0).toLocaleString('id-ID')}</div></div>
          <div className="kpi"><div className="title">Total Unit (PAUD+SD+SMP+SMA)</div><div>{((summaryProv?.total_paud ?? national.total_paud ?? 0)+(summaryProv?.total_sd ?? national.total_sd ?? 0)+(summaryProv?.total_smp ?? national.total_smp ?? 0)+(summaryProv?.total_sma ?? national.total_sma ?? 0)).toLocaleString('id-ID')}</div></div>
          <div className="kpi"><div className="title">Provinsi</div><div>{summaryProv?.provinsi ?? 'Nasional'}</div></div>
        </div>
      </div>

      <div className="card">
        <div className="title">Anggaran Revitalisasi Sekolah Berdasarkan Jenjang</div>
        <div style={{width:'100%', height:280}}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={donut} dataKey="value" nameKey="name" outerRadius={110} label>
                {donut.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(val:number)=>['Rp '+val.toLocaleString('id-ID'),'Anggaran']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card" style={{gridColumn:'1 / span 2'}}>
        <div className="title">Tabel Rekap</div>
        <div style={{overflowX:'auto'}}>
          <table>
            <thead><tr><th>Provinsi</th><th>Jenjang</th><th>Jumlah</th><th>Anggaran</th></tr></thead>
            <tbody>
              {table.map((r,i)=>(
                <tr key={i}>
                  <td>{r.provinsi}</td>
                  <td>{r.jenjang}</td>
                  <td>{Number(r.jumlah).toLocaleString('id-ID')}</td>
                  <td>Rp {Number(r.anggaran).toLocaleString('id-ID')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card" style={{gridColumn:'1 / span 2'}}>
        <div className="title">Komposisi Nasional (Total Sekolah vs Anggaran)</div>
        <div style={{width:'100%', height:360}}>
          <ResponsiveContainer>
            <BarChart data={barline}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="provinsi" hide />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="total_sekolah" name="Total Sekolah" />
              <Line yAxisId="right" type="monotone" dataKey="total_anggaran" name="Total Anggaran" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
