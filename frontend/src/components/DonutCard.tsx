import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Label, ResponsiveContainer, Legend } from 'recharts'
const currency = (n:number)=> new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(n||0)
export default function DonutCard({ data }:{ data:{name:string;value:number}[] }){
  const COLORS = ['#93c5fd','#fbbf24','#60a5fa','#fb7185']
  const total = data.reduce((a,b)=>a+(b.value||0),0)
  return (
    <div style={{height:360}}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} innerRadius={72} outerRadius={120} dataKey="value" nameKey="name">
            {data.map((_,i)=>(<Cell key={i} fill={COLORS[i % COLORS.length]} />))}
            <Label position="center" value={currency(total)} style={{fontWeight:800}}/>
          </Pie>
          <Tooltip formatter={(v:any)=>currency(v as number)} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <div style={{marginTop:6,fontSize:12,color:'#6b7280'}}>PAUD • SD • SMP • SMA</div>
    </div>
  )
}
