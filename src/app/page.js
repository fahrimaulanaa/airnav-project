import Image from 'next/image'
import Navbar from './layout/Navbar'

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="bg-airnav-bg h-[685px]">
        <h1 className="text-white text-5xl font-bold text-center pt-32 mb-6">Selamat Datang di E-Form</h1>
        <h1 className="text-white text-5xl font-bold text-center">AirNav Yogayakarta</h1>
        <div className="flex justify-center mt-12">
          <input type="text" placeholder="Masukkan Nama Anda" className="border border-gray-300 rounded-l px-4 py-2" />
          <button  className="bg-airnav-dark hover:bg-transparent hover:rounded-r hover:border-[#343842] border border-[#343842] text-white rounded-r px-8 py-2 ml-1 transition duration-500">Cari Data</button>
        </div>
      </div>
    </main> 
  )
}
