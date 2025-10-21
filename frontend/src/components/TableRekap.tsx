import React from 'react'
const rup = (n:number)=> new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(n||0)
export default function TableRekap({ rows }:{ rows:{provinsi:string;jenjang:string;jumlah:number;anggaran:number}[] }){
  return (
    <div className="tableWrap">
      <table>
        <thead>
          <tr><th>Provinsi</th><th>Bentuk Pendidikan</th><th>Banyak Sekolah akan Direvitalisasi</th><th>Anggaran</th></tr>
        </thead>
        <tbody>
          {rows.map((r,i)=>(
            <tr key={i}>
              <td>{r.provinsi}</td>
              <td>{r.jenjang}</td>
              <td>{r.jumlah}</td>
              <td>{rup(r.anggaran||0)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
