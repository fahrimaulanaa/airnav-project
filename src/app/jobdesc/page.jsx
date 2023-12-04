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

  //state untuk menyimpan data
  const [airportActivity, setAirportActivity] = React.useState("");
  const [airportArea, setAirportArea] = React.useState("");
  const [airportFrequency, setAirportFrequency] = React.useState("");

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


    //handleSubmit
    async function handleSubmit(e){
      e.preventDefault();
      const userDocRef = doc(db, "users", userUid);
      const docSnap = await getDoc(userDocRef);
      const airportActivityData = [
        {
          airportActivity: airportActivity,
          airportArea: airportArea,
          airportFrequency: airportFrequency,
        },
      ];
      if(docSnap.exists()){
        await updateDoc(userDocRef, {
          airportActivity: airportActivityData,
        });
      }else{
        await setDoc(userDocRef, {
          airportActivity: airportActivityData,
        });
      }
    }

    //getInput
    async function getInputValueFromFirebase(){
      if(userUid){
        const docRef = doc(db, "users", userUid);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
          const data = docSnap.data();
          const airportActivityData = data.airportActivity;
          const airportActivity = airportActivityData[0].airportActivity;
          const airportArea = airportActivityData[0].airportArea;
          const airportFrequency = airportActivityData[0].airportFrequency;
          setAirportActivity(airportActivity || "");
          setAirportArea(airportArea || "");
          setAirportFrequency(airportFrequency || "");
        }else{

        }
        if(typeof window !== "undefined"){
          const unsubscribe = onSnapshot(docRef, (doc) => {
            const data = doc.data();
            const airportActivityData = data.airportActivity;
            const airportActivity = airportActivityData[0].airportActivity;
            const airportArea = airportActivityData[0].airportArea;
            const airportFrequency = airportActivityData[0].airportFrequency;
            setAirportActivity(airportActivity || "");
            setAirportArea(airportArea || "");
            setAirportFrequency(airportFrequency || "");
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
        <form className="form-container flex-col w-full" onSubmit={handleSubmit}>
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
                <textarea
                    className="border-2 border-gray-300 rounded-md p-2"
                    rows={2}
                    id="jobdescription"
                    name="jobdesc"
                    type="text"
                    placeholder="isi data disini"
                    value={airportActivity}
                    onChange={(e) => setAirportActivity(e.target.value)}
                ></textarea>
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
                    value={airportArea}
                    onChange={(e) => setAirportArea(e.target.value)}>
                    </input>
                </div>
            </div>
            <div className="flex flex-col ml-12 mt-12">
                <div className="flex flex-col w-200">
                <label htmlFor="jobdesc" className="text-hint-dark pb-1 font-semibold">
                Frekuensi Ke Bandara
                </label>
                <select
                    className="border-2 border-gray-300 rounded-md p-2"
                    id="jobdesc"
                    name="jobdesc"
                    type="text"
                    placeholder="isi data disini"
                    value={airportFrequency}
                    onChange={(e) => setAirportFrequency(e.target.value)}>
                      <option value="--Pilih frekuensi--">--Pilih Frekuensi--</option>
                      <option value="Sangat Jarang">Sangat Jarang</option>
                      <option value="Jarang">Jarang</option>
                      <option value="Cukup Sering">Cukup Sering</option>
                      <option value="Sering">Sering</option>
                      <option value="Sangat Sering">Sangat Sering</option>
                </select>
                </div>
            </div>
            {/* button simpan data */}
            <div className="flex flex-row ml-12 mt-12">
                <button type="submit" className="bg-airnav-blue text-white p-3 w-full rounded-md hover:bg-transparent hover:text-AirNav hover:border-AirNav hover:border transition duration-300 ease-in-out border">
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
