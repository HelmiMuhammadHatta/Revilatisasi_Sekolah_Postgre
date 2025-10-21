import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts'
import type { Summary } from '../App'

const currency = (n: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n || 0)

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div className='statbox'>
      <h3>{title}</h3>
      <div className='value'>{value}</div>
    </div>
  )
}

export default function Dashboard({ summary, donut }: { summary: Summary | null; donut: {name: string; value: number}[] }) {
  const COLORS = ['#93c5fd', '#fbbf24', '#60a5fa', '#fb7185']
  const totalAnggaran = donut.reduce((a, b) => a + (b.value || 0), 0)

  return (
    <div>
      <div className='stats' style={{ marginBottom: 16 }}>
        <Stat title='Revitalisasi PAUD' value={(summary?.total_paud ?? 0).toString()} />
        <Stat title='Revitalisasi SD' value={(summary?.total_sd ?? 0).toString()} />
        <Stat title='Revitalisasi SMP' value={(summary?.total_smp ?? 0).toString()} />
        <Stat title='Revitalisasi SMA' value={(summary?.total_sma ?? 0).toString()} />
        <Stat title='Total Revitalisasi Sekolah' value={(summary?.total_sekolah ?? 0).toString()} />
        <Stat title='Total Anggaran Revitalisasi' value={currency(summary?.total_anggaran ?? 0)} />
      </div>

      <div style={{ height: 360 }}>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Pie data={donut} innerRadius={72} outerRadius={120} dataKey='value' nameKey='name'>
              {donut.map((_, idx) => (<Cell key={idx} fill={COLORS[idx % COLORS.length]} />))}
              <Label value={currency(totalAnggaran)} position='center' style={{ fontWeight: 800 }} />
            </Pie>
            <Tooltip formatter={(v: any) => currency(v as number)} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <small className='subtle'>*Data dari API v2 (view `v_summary_provinsi`).</small>
    </div>
  )
}