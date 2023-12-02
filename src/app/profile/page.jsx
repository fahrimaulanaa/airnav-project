"use client";
import React, { useState, useEffect, useClient } from "react";
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

export default function Profile() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [instance, setInstance] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [position, setPosition] = useState("");
  const [workStatus, setWorkStatus] = useState("");
  const [address, setAddress] = useState("");
  const [workPeriod, setWorkPeriod] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [previousWorkplace, setPreviousWorkplace] = useState("");
  const [religion, setReligion] = useState("");

  // check login
  function checkLogin() {
    // Check if window is defined (client-side) before accessing document or window
    if (typeof window !== "undefined") {
      const loginStatus = localStorage.getItem("loginStatus");
      if (loginStatus !== "true") {
        window.location.href = "/login";
      } else {
        // Continue with your logic
      }
    }
  }
  checkLogin();

  async function setDisplayName() {
    if (userUid) {
      const docRef = doc(db, "users", userUid);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const data = docSnap.data();
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

  async function getInputValueFromFirebase() {
    if (userUid) {
      const docRef = doc(db, "users", userUid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists) {
        const data = docSnap.data();
        const profileData = data.profileData;
        const profileDataObj = profileData[0];
        setName(profileDataObj.name);
        setPhone(profileDataObj.phone);
        setBirthPlace(profileDataObj.birthPlace);
        setInstance(profileDataObj.instance);
        setBirthDate(profileDataObj.birthDate);
        setPosition(profileDataObj.position);
        setWorkStatus(profileDataObj.workStatus);
        setAddress(profileDataObj.address);
        setWorkPeriod(profileDataObj.workPeriod);
        setIdentityNumber(profileDataObj.identityNumber);
        setEmployeeNumber(profileDataObj.employeeNumber);
        setPreviousWorkplace(profileDataObj.previousWorkplace);
        setReligion(profileDataObj.religion);
      }
      if (typeof window !== "undefined") {
        const unsubscribe = onSnapshot(docRef, (doc) => {
          if (doc.exists()) {
            const data = doc.data();
            const profileData = data.profileData;
            const profileDataObj = profileData[0];
            setName(profileDataObj.name);
            setPhone(profileDataObj.phone);
            setBirthPlace(profileDataObj.birthPlace);
            setInstance(profileDataObj.instance);
            setBirthDate(profileDataObj.birthDate);
            setPosition(profileDataObj.position);
            setWorkStatus(profileDataObj.workStatus);
            setAddress(profileDataObj.address);
            setWorkPeriod(profileDataObj.workPeriod);
            setIdentityNumber(profileDataObj.identityNumber);
            setEmployeeNumber(profileDataObj.employeeNumber);
            setPreviousWorkplace(profileDataObj.previousWorkplace);
            setReligion(profileDataObj.religion);
          }
        });
        return unsubscribe;
      }
    }
  }

  // Call the function in a useEffect to ensure it runs after the initial render
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

  // Handle form submit
  async function handleSubmit(e) {
    e.preventDefault();
    const userDocRef = doc(db, "users", userUid);
    const docSnap = await getDoc(userDocRef);
    const profileData = [
      {
        name: name,
        phone: phone,
        birthPlace: birthPlace,
        instance: instance,
        birthDate: birthDate,
        position: position,
        workStatus: workStatus,
        address: address,
        workPeriod: workPeriod,
        identityNumber: identityNumber,
        employeeNumber: employeeNumber,
        previousWorkplace: previousWorkplace,
        religion: religion,
      },
    ];
    if (docSnap.exists()) {
      await updateDoc(userDocRef, {
        profileData: profileData,
      });
    } else {
      await setDoc(userDocRef, {
        profileData: profileData,
      });
    }
  }


  return (
    <main>
      <Navbarx />
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
                <p className="text-lg font-semibold" id="displayName">
                  --Display Name--
                </p>
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
        <div className="main-content block sm:block md:block">
          {/* Formulir */}
          <form className="form-container block " onSubmit={handleSubmit}>
            <div className="ml-12 mt-6 mb-6">
              <h1 className="text-black font-bold text-4xl">
                Data Pribadi Karyawan
              </h1>
              <p className="text-red-500">
                *Pastikan mengisi data dengan benar
              </p>
            </div>
            <div className="flex flex-row ml-12">
              <div className="flex flex-col">
                <label className="text-hint-dark font-semibold">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="name"
                  className="border border-gray-300 rounded-md px-4 py-2 w-96"
                  name="fullname"
                  placeholder="Isi nama disini"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col ml-12">
                <label className="text-hint-dark font-semibold">
                  Nomor Telefon
                </label>
                <input
                  type="number"
                  className="border border-gray-300 rounded-md px-4 py-2 w-96"
                  placeholder="Isi nomor telefon disini"
                  id="phone"
                  name="phonenumber"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex flex-row ml-12 mt-6">
              <div className="flex flex-col">
                <label className="text-hint-dark font-semibold">
                  Tempat Lahir
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-4 py-2 w-96"
                  placeholder="Isi tempat lahir disini"
                  id="birthPlace"
                  name="birthPlace"
                  value={birthPlace}
                  onChange={(e) => setBirthPlace(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col ml-12">
                <label className="text-hint-dark font-semibold">
                  Nama Instansi
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-4 py-2 w-96"
                  placeholder="Isi nama instansi disini"
                  id="instance"
                  name="Instance"
                  value={instance}
                  onChange={(e) => setInstance(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex flex-row ml-12 mt-6">
              <div className="flex flex-col">
                <label className="text-hint-dark font-semibold">
                  Tanggal Lahir
                </label>
                <input
                  type="date"
                  className="border border-gray-300 rounded-md px-4 py-2 w-96"
                  placeholder="Isi tanggal lahir disini"
                  id="birthdate"
                  name="birthdate"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col ml-12">
                <label className="text-hint-dark font-semibold">Jabatan</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-4 py-2 w-96"
                  placeholder="Isi jabatan disini"
                  id="position"
                  name="Position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex flex-row ml-12 mt-6">
              <div className="flex flex-col">
                <label className="text-hint-dark font-semibold">
                  Status Pekerjaan
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-4 py-2 w-96"
                  placeholder="Isi status pekerjaan disini"
                  id="workstatus"
                  name="workStatus"
                  value={workStatus}
                  onChange={(e) => setWorkStatus(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col ml-12">
                <label className="text-hint-dark font-semibold">Alamat</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-4 py-2 w-96"
                  placeholder="Isi alamat disini"
                  id="address"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
            </div>
            {/* masa kerja */}
            <div className="flex flex-row ml-12 mt-6">
              <div className="flex flex-col">
                <label className="text-hint-dark font-semibold">
                  Masa Kerja
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-4 py-2 w-96"
                  placeholder="Isi masa kerja disini"
                  id="workperiod"
                  name="workPeriod"
                  value={workPeriod}
                  onChange={(e) => setWorkPeriod(e.target.value)}
                  required
                />
              </div>
              {/* Nomor Identitas */}
              <div className="flex flex-col ml-12">
                <label className="text-hint-dark font-semibold">
                  Nomor Identitas (KTP/SIM/PASSPORT)
                </label>
                <input
                  type="number"
                  className="border border-gray-300 rounded-md px-4 py-2 w-96"
                  placeholder="Isi nomor identitas disini"
                  id="identitynumber"
                  name="identityNumber"
                  value={identityNumber}
                  onChange={(e) => setIdentityNumber(e.target.value)}
                  required
                />
              </div>
            </div>
            {/* nomor induk pegawai */}
            <div className="flex flex-row ml-12 mt-6">
              <div className="flex flex-col">
                <label className="text-hint-dark font-semibold">
                  Nomor Induk Pegawai
                </label>
                <input
                  type="number"
                  className="border border-gray-300 rounded-md px-4 py-2 w-96"
                  placeholder="Isi nomor induk pegawai disini"
                  id="employeenumber"
                  name="employeeNumber"
                  value={employeeNumber}
                  onChange={(e) => setEmployeeNumber(e.target.value)}
                  required
                />
              </div>
              {/* Tempat Bekerja Sebelumnya (opsional) */}
              <div className="flex flex-col ml-12">
                <label className="text-hint-dark font-semibold">
                  Tempat Bekerja Sebelumnya (opsional)
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-4 py-2 w-96"
                  placeholder="Isi tempat bekerja sebelumnya disini"
                  id="previousworkplace"
                  name="previousWorkplace"
                  value={previousWorkplace}
                  onChange={(e) => setPreviousWorkplace(e.target.value)}
                />
              </div>
            </div>
            {/* agama */}
            <div className="flex flex-row ml-12 mt-6">
              <div className="flex flex-col">
                <label className="text-hint-dark font-semibold">Agama</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-4 py-2 w-96"
                  placeholder="Isi agama disini"
                  id="religion"
                  name="religion"
                  value={religion}
                  onChange={(e) => setReligion(e.target.value)}
                  required
                />
              </div>
              {/* button simpan */}
              <div className="flex flex-col ml-12">
                <label className="text-white font-semibold">Simpan</label>
                <button
                  type="submit"
                  className="bg-airnav-blue px-4 py-2 w-96 rounded-md text-white hover:text-AirNav hover:bg-transparent hover:border-[#005CA1] hover:border transition duration-300"
                >
                  Simpan Data
                </button>
              </div>
            </div>
          </form>

          {/* Isi Konten Utama */}
          {/* ... */}
        </div>
      </div>
    </main>
  );
}
