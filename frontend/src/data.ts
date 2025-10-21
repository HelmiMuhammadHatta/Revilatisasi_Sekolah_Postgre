export const nationalStats = [
  { title: 'Total Revitalisasi Sekolah', value: '8.980' },
  { title: 'Total Anggaran Revitalisasi', value: 'Rp 8.316.121.095.256' },
  { title: 'Revitalisasi Sekolah PAUD', value: '866' },
  { title: 'Anggaran Revitalisasi Sekolah PAUD', value: 'Rp 330.409.135.700' },
  { title: 'Revitalisasi Sekolah SD', value: '3.901' },
  { title: 'Anggaran Revitalisasi Sekolah SD', value: 'Rp 2.565.969.815.110' },
  { title: 'Revitalisasi Sekolah SMP', value: '2.295' },
  { title: 'Anggaran Revitalisasi Sekolah SMP', value: 'Rp 3.208.266.905.543' },
  { title: 'Revitalisasi Sekolah SMA', value: '1.918' },
  { title: 'Anggaran Revitalisasi Sekolah SMA', value: 'Rp 2.211.475.238.903' },
]

export const donutData = [
  { name: 'PAUD', value: 330409135700 },
  { name: 'SD', value: 2565969815110 },
  { name: 'SMP', value: 3208266905543 },
  { name: 'SMA', value: 2211475238903 },
]

export type ProvinceRow = {
  provinsi: string
  bentuk: 'PAUD' | 'SD' | 'SMP' | 'SMA'
  banyak: number
  anggaran: number
}

// Data contoh ringkas; bisa diperluas dari DB nantinya
export const provinces: ProvinceRow[] = [
  { provinsi: 'Prov. Aceh', bentuk: 'PAUD', banyak: 26, anggaran: 17853326821 },
  { provinsi: 'Prov. Aceh', bentuk: 'SD', banyak: 138, anggaran: 95333835000 },
  { provinsi: 'Prov. Aceh', bentuk: 'SMA', banyak: 92, anggaran: 160000000000 },
  { provinsi: 'Prov. Aceh', bentuk: 'SMP', banyak: 96, anggaran: 139653000000 },

  { provinsi: 'Prov. Bali', bentuk: 'PAUD', banyak: 20, anggaran: 33033628500 },
  { provinsi: 'Prov. Bali', bentuk: 'SD', banyak: 80, anggaran: 23345000000 },
  { provinsi: 'Prov. Bali', bentuk: 'SMP', banyak: 83, anggaran: 33305000000 },
  { provinsi: 'Prov. Bali', bentuk: 'SMA', banyak: 23, anggaran: 85300000000 },

  { provinsi: 'Prov. Banten', bentuk: 'PAUD', banyak: 27, anggaran: 12564000000 },
  { provinsi: 'Prov. Banten', bentuk: 'SD', banyak: 45, anggaran: 22452000000 },
  { provinsi: 'Prov. Banten', bentuk: 'SMP', banyak: 70, anggaran: 35424000000 },
  { provinsi: 'Prov. Banten', bentuk: 'SMA', banyak: 22, anggaran: 26254000000 },

  { provinsi: 'Prov. Bengkulu', bentuk: 'PAUD', banyak: 9, anggaran: 8450000000 },
  { provinsi: 'Prov. Bengkulu', bentuk: 'SD', banyak: 59, anggaran: 37552000000 },
  { provinsi: 'Prov. Bengkulu', bentuk: 'SMP', banyak: 19, anggaran: 12055000000 },
  { provinsi: 'Prov. Bengkulu', bentuk: 'SMA', banyak: 16, anggaran: 18493000000 },
]
