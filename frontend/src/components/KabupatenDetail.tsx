import React, { useEffect, useState } from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, ComposedChart } from 'recharts'
import { fetchDistrictJenjang } from '../services/api'
const rup = (n:number)=> new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(n||0)
type District = { kode_kab:number; nama:string; jenis:string }
export default function KabupatenDetail({ provinceName, districts }:{ provinceName:string; districts:District[] }){
  const [kodeKab, setKodeKab] = useState<number | null>(null)
  const [meta, setMeta] = useState<{provinsi:string; kabupaten:string; jenis:string} | null>(null)
  const [counts, setCounts] = useState<{name:string; value:number}[]>([])
  const [budgets, setBudgets] = useState<{name:string; value:number}[]>([])
  const [composed, setComposed] = useState<{jenjang:string; anggaran:number; jumlah:number}[]>([])
  useEffect(()=>{ setKodeKab(null); setMeta(null); setCounts([]); setBudgets([]); setComposed([]) }, [provinceName])
  const onPick = async (kode:number) => {
    const res = await fetchDistrictJenjang(kode)
    setMeta(res.meta); setCounts(res.counts); setBudgets(res.budgets); setComposed(res.composed)
    setKodeKab(kode)
  }
  return (
    <div>
      <div className="formRow">
        <label><b>Pilih Kabupaten/Kota:</b></label>
        <select onChange={e=>onPick(Number(e.target.value))} value={kodeKab ?? ''}>
          <option value='' disabled>-- pilih kab/kota --</option>
          {districts.map(d => (<option key={d.kode_kab} value={d.kode_kab}>{d.nama}</option>))}
        </select>
      </div>
      {meta && <p style={{marginTop:0, color:'#6b7280'}}>Grafik untuk <b>{meta.kabupaten}</b> ({meta.jenis}) – {meta.provinsi}</p>}
      <div style={{height:280, marginTop:10}}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={counts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" label={{ value:'Jenjang Pendidikan', position:'insideBottom', dy:10 }} />
            <YAxis label={{ value:'Jumlah Revitalisasi', angle:-90, position:'insideLeft' }} />
            <Tooltip /><Legend /><Bar dataKey="value" name="Jumlah Revitalisasi" fill="#1f77b4" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={{height:280, marginTop:18}}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={budgets}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" label={{ value:'Jenjang Pendidikan', position:'insideBottom', dy:10 }} />
            <YAxis tickFormatter={(v)=>rup(v)} label={{ value:'Anggaran (Rp)', angle:-90, position:'insideLeft' }} />
            <Tooltip formatter={(v:any)=>rup(v)} /><Legend />
            <Bar dataKey="value" name="Total Anggaran" fill="#1f77b4" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={{height:300, marginTop:18}}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={composed}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="jenjang" label={{ value:'Jenjang Pendidikan', position:'insideBottom', dy:10 }} />
            <YAxis yAxisId="left" tickFormatter={(v)=>rup(v)} label={{ value:'Anggaran (Rp)', angle:-90, position:'insideLeft' }} />
            <YAxis yAxisId="right" orientation="right" label={{ value:'Jumlah Revitalisasi', angle:90, position:'insideRight' }} />
            <Tooltip formatter={(v:any, name:any)=> name==='anggaran'? rup(v): v } />
            <Legend />
            <Bar yAxisId="left" dataKey="anggaran" name="Anggaran" fill="#1f77b4" /> 
            <Line yAxisId="right" type="monotone" dataKey="jumlah" name="Jumlah Revitalisasi" stroke="#d62728" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
