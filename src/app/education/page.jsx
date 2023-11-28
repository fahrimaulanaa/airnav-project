// Import yang diperlukan
"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import mongoose from "mongoose";
import { Schema } from "mongoose";

// Komponen Profile
const Profile = () => {
  const router = useRouter();

  return (
    <div className="flex">
      <div className="sidebar flex flex-col bg-airnav-dark w-64 h-screen">
        <div className="sidebar-header">
          <div className="sidebar-profile-picture rounded-circle p-6 flex">
            <Image
              src="/ic_user.png"
              alt="profile"
              width={60}
              height={60}
              className="rounded-circle"
            />
            <div className="sidebar-profile-name text-white ml-4 mt-2">
              <p className="text-lg font-semibold">Fahri Maulana</p>
              <p>Teknisi Teknik</p>
            </div>
          </div>
          <div className="sidebar-subtitle text-white pl-6 mt-6 py-2 flex items-center hover:bg-white hover:bg-opacity-20">
            <Link className="flex" href="/profile">
              <Image
                src="/ic_profile.png"
                alt="profile"
                width={30}
                height={30}
                className="mr-4"
              />
              <p className="pt-1">Data Pribadi</p>
            </Link>
          </div>
          <div className="sidebar-subtitle text-white pl-6 py-2 mt-12 flex items-center hover:bg-white hover:bg-opacity-20">
            <Link className="flex" href="/family">
              <Image
                src="/ic_family.png"
                alt="profile"
                width={30}
                height={30}
                className="mr-4"
              />
              <p className="pt-1">Informasi Keluarga</p>
            </Link>
          </div>
          <div className="sidebar-subtitle text-white pl-6 py-2 mt-12 flex items-center hover:bg-white hover:bg-opacity-20">
            <Link className="flex" href="/education">
              <Image
                src="/ic_education.png"
                alt="profile"
                width={30}
                height={30}
                className="mr-4"
              />
              <p className="pt-1">Informasi Pendidikan</p>
            </Link>
          </div>
          <div className="sidebar-subtitle text-white pl-6 py-2 mt-12 flex items-center hover:bg-white hover:bg-opacity-20">
            <Link className="flex" href="/jobdesc">
              <Image
                src="/ic_jobdesc.png"
                alt="profile"
                width={30}
                height={30}
                className="mr-4"
              />
              <p className="pt-1">Informasi Pekerjaan</p>
            </Link>
          </div>
          <div className="sidebar-subtitle text-white pl-6 py-2 mt-12 flex items-center hover:bg-white hover:bg-opacity-20">
            <Link className="flex" href="/document">
              <Image
                src="/ic_document.png"
                alt="profile"
                width={30}
                height={30}
                className="mr-4"
              />
              <p className="pt-1">Informasi Dokumen</p>
            </Link>
          </div>
          <Link href="/">
            <div className="sidebar-subtitle text-white pl-6 py-2 mt-12 flex items-center hover:bg-white hover:bg-opacity-20">
              <Image
                src="/logo_airnav.jpg"
                alt="profile"
                width={200}
                height={60}
                className="mr-4"
              />
            </div>
          </Link>
        </div>
      </div>
      <div className="main-content flex">
        {/* Formulir */}
        <form className="form-container flex-col w-max">
          <div className="ml-12 mt-6 mb-6">
            <h1 className="text-black font-bold text-4xl">
              Informasi Pendidikan
            </h1>
            <p className="text-red-500">*Pastikan mengisi data dengan benar</p>
          </div>
          <div className="flex flex-row">
            {/* jenjang pendidikan SD/MI */}
            <div className="flex flex-col justify-center w-64 ml-12 border p-6 rounded-md border-black">
              <h1 className="font-bold text-lg">Jenjang Pendidikan SD/MI</h1>
              <div className="flex flex-col mt-3">
                <label className="text-hint-dark">Nama Sekolah</label>
                <input
                  type="text"
                  className="border border-gray-400 rounded-md px-4 py-2 mt-2"
                  placeholder="Nama Sekolah"
                />
              </div>
              <div className="flex flex-col w-200">
                <label className="text-hint-dark">Lokasi</label>
                <input
                  type="text"
                  className="border border-gray-400 rounded-md px-4 py-2 mt-2"
                  placeholder="Lokasi"
                />
              </div>
              <div className="flex flex-col w-200">
                <label className="text-hint-dark">Tahun Lulus</label>
                <input
                  type="number"
                  className="border border-gray-400 rounded-md px-4 py-2 mt-2"
                  placeholder="Tahun Lulus"
                />
              </div>
            </div>
            {/* jenjang pendidikan SMP/MTS */}
            <div className="flex flex-col justify-center w-64 ml-12 border p-6 rounded-md border-black">
              <h1 className="font-bold text-lg">Jenjang Pendidikan SMP/MTs</h1>
              <div className="flex flex-col mt-3">
                <label className="text-hint-dark">Nama Sekolah</label>
                <input
                  type="text"
                  className="border border-gray-400 rounded-md px-4 py-2 mt-2"
                  placeholder="Nama Sekolah"
                />
              </div>
              <div className="flex flex-col w-200">
                <label className="text-hint-dark">Lokasi</label>
                <input
                  type="text"
                  className="border border-gray-400 rounded-md px-4 py-2 mt-2"
                  placeholder="Lokasi"
                />
              </div>
              <div className="flex flex-col w-200">
                <label className="text-hint-dark">Tahun Lulus</label>
                <input
                  type="number"
                  className="border border-gray-400 rounded-md px-4 py-2 mt-2"
                  placeholder="Tahun Lulus"
                />
              </div>
            </div>
            {/* jenjang pendidikan SMA/SMK */}
            <div className="flex flex-col justify-center w-64 ml-12 border p-6 rounded-md border-black">
              <h1 className="font-bold text-lg">Jenjang Pendidikan SMA/SMK</h1>
              <div className="flex flex-col mt-3">
                <label className="text-hint-dark">Nama Sekolah</label>
                <input
                  type="text"
                  className="border border-gray-400 rounded-md px-4 py-2 mt-2"
                  placeholder="Nama Sekolah"
                />
              </div>
              <div className="flex flex-col w-200">
                <label className="text-hint-dark">Lokasi</label>
                <input
                  type="text"
                  className="border border-gray-400 rounded-md px-4 py-2 mt-2"
                  placeholder="Lokasi"
                />
              </div>
              <div className="flex flex-col w-200">
                <label className="text-hint-dark">Tahun Lulus</label>
                <input
                  type="number"
                  className="border border-gray-400 rounded-md px-4 py-2 mt-2"
                  placeholder="Tahun Lulus"
                />
              </div>
            </div>
            {/* jenjang pendidikan tinggi */}
            <div className="flex flex-col justify-center w-64 ml-12 border p-6 rounded-md border-black">
              <h1 className="font-bold text-lg">Jenjang Pendidikan Tinggi</h1>
              <div className="flex flex-col mt-3">
                <label className="text-hint-dark">Nama Sekolah</label>
                <input
                  type="text"
                  className="border border-gray-400 rounded-md px-4 py-2 mt-2"
                  placeholder="Nama Sekolah"
                />
              </div>
              <div className="flex flex-col w-200">
                <label className="text-hint-dark">Lokasi</label>
                <input
                  type="text"
                  className="border border-gray-400 rounded-md px-4 py-2 mt-2"
                  placeholder="Lokasi"
                />
              </div>
              <div className="flex flex-col w-200">
                <label className="text-hint-dark">Tahun Lulus</label>
                <input
                  type="number"
                  className="border border-gray-400 rounded-md px-4 py-2 mt-2"
                  placeholder="Tahun Lulus"
                />
              </div>
            </div>
          </div>
          <div className="ml-12 mt-6 flex flex-row">
            <h1 className="font-medium text-xl">Ada Pendidikan Lain?</h1>
            <Link href="/otheredu">
                <h1 className=" text-lg ml-4 underline text-AirNav">
                    Tambah Disini
                </h1>
            </Link>
          </div>
          <button className="bg-airnav-blue text-white ml-12 mt-4 p-3 w-96 rounded-md hover:text-AirNav hover:bg-transparent hover:rounded-md hover:border-AirNav hover:border transition duration-300">
            Simpan Data
          </button>
        </form>
        {/* Isi Konten Utama */}
        {/* ... */}
      </div>
    </div>
  );
};

export default Profile;

// CSS untuk styling
<style jsx>{`
  .flex {
    display: flex;
  }

  .main-content {
    flex-grow: 1;
  }

  .form-container {
    background-color: #fff;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .text-hint-dark {
    color: #4e4e4e;
  }

  .w-200 {
    width: 27rem;
  }

  /* Sesuaikan dengan gaya sidebar yang sudah Anda tentukan */
  .sidebar {
    /* Gaya sisi, atur sesuai kebutuhan Anda */
  }
`}</style>;
