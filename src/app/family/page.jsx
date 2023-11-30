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
  const [dadName, setDadName] = React.useState("");
  const [momName, setMomName] = React.useState("");
  const [parentAddress, setParentAddress] = React.useState("");
  const [wifeOrHusbandName, setWifeOrHusbandName] = React.useState("");
  const [wifeOrHusbandAddress, setWifeOrHusbandAddress] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");

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

  async function getInputValueFromFirebase(){
    if(userUid){
      const docRef = doc(db, "users", userUid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setDadName(data.dadName);
        setMomName(data.momName);
        setParentAddress(data.parentAddress);
        setWifeOrHusbandName(data.wifeOrHusbandName);
        setWifeOrHusbandAddress(data.wifeOrHusbandAddress);
        setPhoneNumber(data.phoneNumber);
      }
      if(typeof window !== "undefined"){
        const unsubscribe = onSnapshot(doc(db, "users", userUid), (doc) => {
          if(doc.exists()){
            const data = doc.data();
            setDadName(data.dadName);
            setMomName(data.momName);
            setParentAddress(data.parentAddress);
            setWifeOrHusbandName(data.wifeOrHusbandName);
            setWifeOrHusbandAddress(data.wifeOrHusbandAddress);
            setPhoneNumber(data.phoneNumber);
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

// function to handle submit
async function handleSubmit(e) {
  e.preventDefault();
  const docRef = doc(db, "users", userUid);
  await updateDoc(docRef, {
    dadName: dadName,
    momName: momName,
    parentAddress: parentAddress,
    wifeOrHusbandName: wifeOrHusbandName,
    wifeOrHusbandAddress: wifeOrHusbandAddress,
    phoneNumber: phoneNumber,
  });
  window.location.href = "/family";
}

  return (
    <main>
      <Navbarx />
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
          <form className="form-container flex-col" onSubmit={handleSubmit}>
            <div className="ml-12 mt-6 mb-6">
              <h1 className="text-black font-bold text-4xl">
                Informasi Keluarga
              </h1>
              <p className="text-red-500">
                *Pastikan mengisi data dengan benar
              </p>
            </div>
            <div className="flex flex-row ml-12">
              <div className="flex flex-col">
                <label className="text-hint-dark font-semibold">
                  Nama Bapak
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-4 py-2 w-96"
                  placeholder="Isi nama bapak disini"
                  value={dadName}
                  onChange={(e) => setDadName(e.target.value)}
                />
              </div>
              <div className="flex flex-col ml-12">
                <label className="text-hint-dark font-semibold">Nama Ibu</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-4 py-2 w-96"
                  placeholder="Isi nama ibu disini"
                  value={momName}
                  onChange={(e) => setMomName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-row ml-12 mt-6">
              <div className="flex flex-col">
                <label className="text-hint-dark font-semibold">
                  Alamat OrangTua
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-4 py-2 w-96"
                  placeholder="Isi alamat ortu disini disini"
                  value={parentAddress}
                  onChange={(e) => setParentAddress(e.target.value)}
                />
              </div>
              <div className="flex flex-col ml-12">
                <label className="text-hint-dark font-semibold">
                  Nama Suami / Istri
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-4 py-2 w-96"
                  placeholder="Isi nama suami/istri disini"
                  value={wifeOrHusbandName}
                  onChange={(e) => setWifeOrHusbandName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-row ml-12 mt-6">
              <div className="flex flex-col">
                <label className="text-hint-dark font-semibold">
                  Alamat Suami / Istri
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-4 py-2 w-96"
                  placeholder="Isi alamat suami / istri disini"
                  value={wifeOrHusbandAddress}
                  onChange={(e) => setWifeOrHusbandAddress(e.target.value)}
                />
              </div>
              {/* nomor telefon */}
              <div className="flex flex-col ml-12">
                <label className="text-hint-dark font-semibold">
                  Nomor Telepon
                </label>
                <input
                  type="number"
                  className="border border-gray-300 rounded-md px-4 py-2 w-96"
                  placeholder="Isi nomor telepon disini"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>
            {/* full width button */}
            <div className="flex flex-row ml-12 mt-6">
              <button className="bg-airnav-blue text-white font-semibold py-3 px-4 rounded-md w-full">
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