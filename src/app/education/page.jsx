// Import yang diperlukan
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbarx from "../layout/Navbarx";
import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  updateDoc,
  setDoc,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Cookie } from "next/font/google";

// Komponen Profile
export default function Profile() {

  // State untuk menyimpan data
  const [sdName, setSdName] = React.useState("");
  const [sdLocation, setSdLocation] = React.useState("");
  const [sdGradYear, setSdGradYear] = React.useState("");

  const [smpName, setSmpName] = React.useState("");
  const [smpLocation, setSmpLocation] = React.useState("");
  const [smpGradYear, setSmpGradYear] = React.useState("");

  const [smaName, setSmaName] = React.useState("");
  const [smaLocation, setSmaLocation] = React.useState("");
  const [smaGradYear, setSmaGradYear] = React.useState("");

  const [ptName, setPtName] = React.useState("");
  const [ptLocation, setPtLocation] = React.useState("");
  const [ptGradYear, setPtGradYear] = React.useState("");

  //function check if user is logged in
  function checkLogin() {
    // Check if window is defined (client-side) before accessing document or window
    if (typeof window !== "undefined") {
      const loginStatus = localStorage.getItem("loginStatus");
      if (loginStatus != "true") {
        window.location.href = "/login";
      } else {
      }
    }
  }
  checkLogin();

    // user handler
    let userUid;
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("userData");
      if (user) {
        const userObj = JSON.parse(user);
        userUid = userObj.uid;
      } else {
        // Handle the case where user data is not available in localStorage
      }
    }

  //handle submit
  async function handleSubmit(e) {
    const sdData = {
      sdName: sdName,
      sdLocation: sdLocation,
      sdGradYear: sdGradYear,
    };
    e.preventDefault();
    const userDocRef = doc(collection(db, "users"), userUid);
    const docSnap = await getDoc(userDocRef);
    //make array of education
    const education = [
      {
        sdName: sdName,
        sdLocation: sdLocation,
        sdGradYear: sdGradYear,
        smpName: smpName,
        smpLocation: smpLocation,
        smpGradYear: smpGradYear,
        smaName: smaName,
        smaLocation: smaLocation,
        smaGradYear: smaGradYear,
        ptName: ptName,
        ptLocation: ptLocation,
        ptGradYear: ptGradYear,
      },
    ];
    if (docSnap.exists()) {
      await updateDoc(userDocRef, {
        education: education,
      });
    } else {
      await setDoc(userDocRef, {
        education: education,
      });
    }
  }

  async function getInputValueFromFirebase() {
    if(userUid){
      const docRef = doc(db, "users", userUid);
      const docSnap = await getDoc(docRef);
      if(docSnap.exists){
        const data = docSnap.data();
        const education = data.education;
        const sdName = education[0].sdName;
        const sdLocation = education[0].sdLocation;
        const sdGradYear = education[0].sdGradYear;
        const smpName = education[0].smpName;
        const smpLocation = education[0].smpLocation;
        const smpGradYear = education[0].smpGradYear;
        const smaName = education[0].smaName;
        const smaLocation = education[0].smaLocation;
        const smaGradYear = education[0].smaGradYear;
        const ptName = education[0].ptName;
        const ptLocation = education[0].ptLocation;
        const ptGradYear = education[0].ptGradYear;
        setSdName(sdName);
        setSdLocation(sdLocation);
        setSdGradYear(sdGradYear);
        setSmpName(smpName);
        setSmpLocation(smpLocation);
        setSmpGradYear(smpGradYear);
        setSmaName(smaName);
        setSmaLocation(smaLocation);
        setSmaGradYear(smaGradYear);
        setPtName(ptName);
        setPtLocation(ptLocation);
        setPtGradYear(ptGradYear);
      }
      if(typeof window !== "undefined"){
        const unsubscribe = onSnapshot(doc(db, "users", userUid), (doc) => {
          if(doc.exists()){
            const data = doc.data();
            const education = data.education;
            const sdName = education[0].sdName;
            const sdLocation = education[0].sdLocation;
            const sdGradYear = education[0].sdGradYear;
            const smpName = education[0].smpName;
            const smpLocation = education[0].smpLocation;
            const smpGradYear = education[0].smpGradYear;
            const smaName = education[0].smaName;
            const smaLocation = education[0].smaLocation;
            const smaGradYear = education[0].smaGradYear;
            const ptName = education[0].ptName;
            const ptLocation = education[0].ptLocation;
            const ptGradYear = education[0].ptGradYear;
            setSdName(sdName);
            setSdLocation(sdLocation);
            setSdGradYear(sdGradYear);
            setSmpName(smpName);
            setSmpLocation(smpLocation);
            setSmpGradYear(smpGradYear);
            setSmaName(smaName);
            setSmaLocation(smaLocation);
            setSmaGradYear(smaGradYear);
            setPtName(ptName);
            setPtLocation(ptLocation);
            setPtGradYear(ptGradYear);
          }
        });
        return unsubscribe;
      }
    }
  }

  useEffect(() => {
    let unsubscribe;
  
    // Wrap the call to getInputValueFromFirebase in a try-catch block
    try {
      unsubscribe = getInputValueFromFirebase();
    } catch (error) {
      console.error("Error setting up subscription:", error);
    }
  
    // Cleanup the subscription when the component unmounts
    return () => {
      // Check if unsubscribe is a function before calling it
      if (unsubscribe && typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, []);

  async function setDisplayName() {
    if (userUid) {
      const docRef = doc(db, "users", userUid);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const data =  onSnapshot(docRef, (doc) => {
          if (doc.exists()) {
            const data = doc.data();
            const displayName = data.profileData;
            const displayNameObj = displayName[0];
            const fullName = displayNameObj.name;
  
            // Split the full name into an array of words
            const words = fullName.split(" ");
  
            // Take the first two words
            const firstTwoWords = words.slice(0, 2);
  
            // Join the first two words into a single string
            const displayedName = firstTwoWords.join(" ");
  
            // Set the innerHTML to the displayed name
            document.getElementById("displayName").innerHTML = displayedName;
          }
        });
      }
  
      if (typeof window !== "undefined") {
        const unsubscribe = onSnapshot(docRef, (doc) => {
          if (doc.exists()) {
            const data = doc.data();
            const displayName = data.profileData;
            const displayNameObj = displayName[0];
            const fullName = displayNameObj.name;
  
            // Split the full name into an array of words
            const words = fullName.split(" ");
  
            // Take the first two words
            const firstTwoWords = words.slice(0, 2);
  
            // Join the first two words into a single string
            const displayedName = firstTwoWords.join(" ");
  
            // Set the innerHTML to the displayed name
            document.getElementById("displayName").innerHTML = displayedName;
          }
        });
  
        return unsubscribe;
      }
    }
  }
  
  useEffect(() => {
    let unsubscribe;
  
    try {
      unsubscribe = setDisplayName();
    } catch (error) {
      console.error("Error setting up subscription:", error);
    }
  }, []);

  return (
    <main>
        <Navbarx/>
    <div className="flex">
      <div className="sidebar flex flex-col bg-airnav-dark w-70 h-screen">
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
              <p className="text-lg font-semibold" id="displayName">Fahri Maulana</p>
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
        <form className="form-container flex-col w-max" onSubmit={handleSubmit}>
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
                  value={sdName}
                  onChange={(e) => setSdName(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-200">
                <label className="text-hint-dark">Lokasi</label>
                <input
                  type="text"
                  className="border border-gray-400 rounded-md px-4 py-2 mt-2"
                  placeholder="Lokasi"
                  value={sdLocation}
                  onChange={(e) => setSdLocation(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-200">
                <label className="text-hint-dark">Tahun Lulus</label>
                <input
                  type="number"
                  className="border border-gray-400 rounded-md px-4 py-2 mt-2"
                  placeholder="Tahun Lulus"
                  value={sdGradYear}
                  onChange={(e) => setSdGradYear(e.target.value)}
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
                  value={smpName}
                  onChange={(e) => setSmpName(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-200">
                <label className="text-hint-dark">Lokasi</label>
                <input
                  type="text"
                  className="border border-gray-400 rounded-md px-4 py-2 mt-2"
                  placeholder="Lokasi"
                  value={smpLocation}
                  onChange={(e) => setSmpLocation(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-200">
                <label className="text-hint-dark">Tahun Lulus</label>
                <input
                  type="number"
                  className="border border-gray-400 rounded-md px-4 py-2 mt-2"
                  placeholder="Tahun Lulus"
                  value={smpGradYear}
                  onChange={(e) => setSmpGradYear(e.target.value)}
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
                  value={smaName}
                  onChange={(e) => setSmaName(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-200">
                <label className="text-hint-dark">Lokasi</label>
                <input
                  type="text"
                  className="border border-gray-400 rounded-md px-4 py-2 mt-2"
                  placeholder="Lokasi"
                  value={smaLocation}
                  onChange={(e) => setSmaLocation(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-200">
                <label className="text-hint-dark">Tahun Lulus</label>
                <input
                  type="number"
                  className="border border-gray-400 rounded-md px-4 py-2 mt-2"
                  placeholder="Tahun Lulus"
                  value={smaGradYear}
                  onChange={(e) => setSmaGradYear(e.target.value)}
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
                  value={ptName}
                  onChange={(e) => setPtName(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-200">
                <label className="text-hint-dark">Lokasi</label>
                <input
                  type="text"
                  className="border border-gray-400 rounded-md px-4 py-2 mt-2"
                  placeholder="Lokasi"
                  value={ptLocation}
                  onChange={(e) => setPtLocation(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-200">
                <label className="text-hint-dark">Tahun Lulus</label>
                <input
                  type="number"
                  className="border border-gray-400 rounded-md px-4 py-2 mt-2"
                  placeholder="Tahun Lulus"
                  value={ptGradYear}
                  onChange={(e) => setPtGradYear(e.target.value)}
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
