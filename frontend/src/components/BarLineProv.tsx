import React from 'react'
import { ResponsiveContainer, CartesianGrid, Tooltip, Legend, Line, Bar, ComposedChart, XAxis, YAxis } from 'recharts'
const rup = (n:number)=> new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(n||0)
export default function BarLineProv({ data }:{ data:{provinsi:string; total_sekolah:number; total_anggaran:number}[] }){
  return (
    <div style={{height:380}}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="provinsi" interval={0} angle={-45} textAnchor="end" height={80} />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" tickFormatter={(v)=>rup(v)} />
          <Tooltip formatter={(value:any, name:any)=> name==='total_anggaran'? rup(value): value} />
          <Legend />
          <Bar yAxisId="left" dataKey="total_sekolah" name="Banyak Sekolah" />
          <Line yAxisId="right" type="monotone" dataKey="total_anggaran" name="Total Anggaran" dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
