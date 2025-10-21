const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api'
export async function fetchProvinces(){ const r=await fetch(`${BASE}/provinces`); if(!r.ok) throw new Error('fail'); return r.json() }
export async function fetchNationalSummary(){ const r=await fetch(`${BASE}/summary/national`); if(!r.ok) throw new Error('fail'); return r.json() }
export async function fetchProvinceSummary(k:number){ const r=await fetch(`${BASE}/summary/province/${k}`); if(!r.ok) throw new Error('fail'); return r.json() }
export async function fetchDonut(k:'all'|string){ const r=await fetch(`${BASE}/chart/donut?kode_pro=${k}`); if(!r.ok) throw new Error('fail'); return r.json() }
export async function fetchTable(k:'all'|string){ const r=await fetch(`${BASE}/table/rekap?kode_pro=${k}`); if(!r.ok) throw new Error('fail'); return r.json() }
export async function fetchBarLine(){ const r=await fetch(`${BASE}/chart/barline`); if(!r.ok) throw new Error('fail'); return r.json() }
export async function fetchDistricts(k:number){ const r=await fetch(`${BASE}/districts?kode_pro=${k}`); if(!r.ok) throw new Error('fail'); return r.json() }
export async function fetchDistrictJenjang(k:number){ const r=await fetch(`${BASE}/district/${k}/jenjang`); if(!r.ok) throw new Error('fail'); return r.json() }
