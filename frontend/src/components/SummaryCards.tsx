import React from 'react'
import type { Summary } from '../App'
const num = (n:number)=> new Intl.NumberFormat('id-ID').format(n||0)
const rup = (n:number)=> new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(n||0)
export default function SummaryCards({ summary }: { summary: Summary | null }){
  const s = summary
  return (
    <div className="statgrid">
      <div className="stat"><h4>Total Revitalisasi Sekolah</h4><div className="val">{num(s?.total_sekolah||0)}</div></div>
      <div className="stat"><h4>Total Anggaran Revitalisasi</h4><div className="val">{rup(s?.total_anggaran||0)}</div></div>
      <div className="stat"><h4>Revitalisasi PAUD</h4><div className="val">{num(s?.total_paud||0)}</div></div>
      <div className="stat"><h4>Anggaran Revitalisasi PAUD</h4><div className="val">{rup(s?.total_anggaran_paud||0)}</div></div>
      <div className="stat"><h4>Revitalisasi SD</h4><div className="val">{num(s?.total_sd||0)}</div></div>
      <div className="stat"><h4>Anggaran Revitalisasi SD</h4><div className="val">{rup(s?.total_anggaran_sd||0)}</div></div>
      <div className="stat"><h4>Revitalisasi SMP</h4><div className="val">{num(s?.total_smp||0)}</div></div>
      <div className="stat"><h4>Anggaran Revitalisasi SMP</h4><div className="val">{rup(s?.total_anggaran_smp||0)}</div></div>
      <div className="stat"><h4>Revitalisasi SMA</h4><div className="val">{num(s?.total_sma||0)}</div></div>
      <div className="stat"><h4>Anggaran Revitalisasi SMA</h4><div className="val">{rup(s?.total_anggaran_sma||0)}</div></div>
    </div>
  )
}
