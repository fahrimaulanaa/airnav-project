// Import yang diperlukan
"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbarx from "../layout/Navbarx";

// Komponen Profile
export default function Profile() {

  return (
    <main>
        <Navbarx/>
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
              <div className="rounded-md pl-6 mt-12 flex bg-white p-2 w-48 ml-6">
                <Image
                  src="/ic_printer.png"
                  alt="printer logo"
                  width={20}
                  height={20}
                  className="mr-4"
                />
                <p className="pt-1">Cetak Dokumen</p>
              </div>
            </Link>
        </div>
      </div>
      <div className="main-content flex">
        {/* Formulir */}
        <form className="form-container flex-col w-full">
          <div className="ml-12 mt-6 mb-6">
            <h1 className="text-black font-bold text-4xl">
              Deskripsi Tugas dan Pekerjaan
            </h1>
            <p className="text-red-500">*Pastikan mengisi data dengan benar</p>
          </div>
            <div className="flex flex-col ml-12">
                <div className="flex flex-col w-200">
                <label htmlFor="jobdesc" className="text-hint-dark pb-1 font-semibold">
                Jenis Kegiatan Yang Dilakukan di Bandara
                </label>
                <input
                    className="border-2 border-gray-300 rounded-md p-2"
                    id="jobdescription"
                    name="jobdesc"
                    type="text"
                    placeholder="isi data disini"
                ></input>
                </div>
            </div>
            <div className="flex flex-col ml-12 mt-12">
                <div className="flex flex-col w-200">
                <label htmlFor="jobdesc" className="text-hint-dark pb-1 font-semibold">
                Area Yang Dituju di Bandara
                </label>
                <input
                    className="border-2 border-gray-300 rounded-md p-2"
                    id="jobdesc"
                    name="jobdesc"
                    type="text"
                    placeholder="isi data disini"
                ></input>
                </div>
            </div>
            <div className="flex flex-col ml-12 mt-12">
                <div className="flex flex-col w-200">
                <label htmlFor="jobdesc" className="text-hint-dark pb-1 font-semibold">
                Frekuensi Ke Bandara
                </label>
                <input
                    className="border-2 border-gray-300 rounded-md p-2"
                    id="jobdesc"
                    name="jobdesc"
                    type="text"
                    placeholder="isi data disini"
                ></input>
                </div>
            </div>
            {/* button simpan data */}
            <div className="flex flex-row ml-12 mt-12">
                <button className="bg-airnav-blue text-white p-3 w-full rounded-md hover:bg-transparent hover:text-AirNav hover:border-AirNav hover:border transition duration-300 ease-in-out border">
                Simpan Data
                </button>
            </div>
        </form>

        {/* Isi Konten Utama */}
        {/* ... */}
      </div>
    </div>
    </main>
  );
};

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
