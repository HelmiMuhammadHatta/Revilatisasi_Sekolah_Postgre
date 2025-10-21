import axios from 'axios'
const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:4000/api' })
export async function fetchProvinces(){ const { data } = await api.get('/provinces'); return data }
export async function fetchNational(){ const { data } = await api.get('/summary/national'); return data }
export async function fetchSummaryProvince(kode_pro:string){ const { data } = await api.get(`/summary/province/${kode_pro}`); return data }
export async function fetchDonut(kode_pro:string|'all'='all'){ const { data } = await api.get('/chart/donut', { params:{ kode_pro } }); return data }
export async function fetchBarLine(){ const { data } = await api.get('/chart/barline'); return data }
export async function fetchTable(kode_pro:string|'all'='all'){ const { data } = await api.get('/table/rekap', { params:{ kode_pro } }); return data }
