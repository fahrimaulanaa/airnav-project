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
import { Input } from "postcss";
import { getStorage, uploadBytes, uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";

// Komponen Profile
export default function Profile() {

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
        // Include setDisplayName in the dependency array
        unsubscribe = setDisplayName();
    } catch (error) {
        console.error("Error setting up subscription:", error);
    }
}, [setDisplayName]); // Add setDisplayName to the dependency array


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

      var fileName;
      var ktpURL;
      var kartuPegawaiDepanURL;
      var kartuPegawaiBelakangURL;
      var passPhotoURL;

      function getFile(event){
        fileName = event.target.files[0].name;
        console.log(fileName);
        uploadKTP(event.target.files[0]);
      }

      var fileNameKartuPegawaiDepan;
      function getFileKartuPegawaiDepan(event){
        fileNameKartuPegawaiDepan = event.target.files[0].name;
        console.log(fileNameKartuPegawaiDepan);
        uploadKartuPegawaiDepan(event.target.files[0]);
      }

      var fileNameKartuPegawaiBelakang;
      function getFileKartuPegawaiBelakang(event){
        fileNameKartuPegawaiBelakang = event.target.files[0].name;
        console.log(fileNameKartuPegawaiBelakang);
        uploadKartuPegawaiBelakang(event.target.files[0]);
      }

      var fileNamePassPhoto;
      function getFilePassPhoto(event){
        fileNamePassPhoto = event.target.files[0].name;
        console.log(fileNamePassPhoto);
        uploadPassPhoto(event.target.files[0]);
      }

      async function uploadPassPhoto(file) {
        const storage = getStorage();
        const newFileName = `${userUid}.jpg`; // Change the file name as needed
        const storageRef = ref(storage, 'userDoc/' + 'passPhoto/' + newFileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        console.log('uploading...');

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            console.error('Error during upload:', error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            console.log('Upload complete');
          }
        );

        uploadTask.then((snapshot) => {
          console.log('Uploaded a blob or file!');
          getDownloadURL(snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            passPhotoURL = downloadURL;
            localStorage.setItem("passPhotoURL", passPhotoURL);
          });
        });
      }

      async function uploadKartuPegawaiBelakang(file) {
        const storage = getStorage();
        const newFileName = `${userUid}.jpg`; // Change the file name as needed
        const storageRef = ref(storage, 'userDoc/' + 'kartuPegawaiBelakang/' + newFileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        console.log('uploading...');

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            console.error('Error during upload:', error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            console.log('Upload complete');
          }
        );

        uploadTask.then((snapshot) => {
          console.log('Uploaded a blob or file!');
          getDownloadURL(snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            kartuPegawaiBelakangURL = downloadURL;
            localStorage.setItem("kartuPegawaiBelakangURL", kartuPegawaiBelakangURL);
          });
        });
      }


      async function uploadKartuPegawaiDepan(file) {
        const storage = getStorage();
        const newFileName = `${userUid}.jpg`; // Change the file name as needed
        const storageRef = ref(storage, 'userDoc/' + 'kartuPegawaiDepan/' + newFileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        console.log('uploading...');

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            console.error('Error during upload:', error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            console.log('Upload complete');
          }
        );

        uploadTask.then((snapshot) => {
          console.log('Uploaded a blob or file!');
          getDownloadURL(snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            kartuPegawaiDepanURL = downloadURL;
            localStorage.setItem("kartuPegawaiDepanURL", kartuPegawaiDepanURL);
          });
        });
      }

      async function uploadKTP(file) {
        const storage = getStorage();
        const newFileName = `${userUid}.jpg`; // Change the file name as needed
        const storageRef = ref(storage, 'userDoc/' + 'ktp/' + newFileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        console.log('uploading...');
      
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            console.error('Error during upload:', error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            console.log('Upload complete');
          }
        );

        uploadTask.then((snapshot) => {
          console.log('Uploaded a blob or file!');
          getDownloadURL(snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            ktpURL = downloadURL;
            localStorage.setItem("ktpURL", ktpURL);
          });
        });
      } 

  return (
    <main>
      <Navbarx />
    <div className="flex">
      <div className="sidebar flex flex-col bg-airnav-dark w-70 h-screen">
        <div className="sidebar-header">
          <div className="sidebar-profile-picture rounded-circle p-6 flex">
            <Image
            src={localStorage.getItem("passPhotoURL") ? localStorage.getItem("passPhotoURL") : "/placeholder_profile.png"}
              alt="profile"
              id="profilePicture"
              width={60}
              height={60}
              className="mr-4 mt-1 rounded-full overflow-hidden"
              style={{ objectFit: "cover", objectPosition: "centerCrop", width: "80px", height: "80px" }}              
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
                className="mr-4" />
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
                className="mr-4" />
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
                className="mr-4" />
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
                className="mr-4" />
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
                className="mr-4" />
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
        <form className="form-container flex-col w-max">
          <div className="ml-12 mt-6 mb-6">
            <h1 className="text-black font-bold text-4xl">
              Dokumen Pendukung
            </h1>
            <p className="text-red-500">*Pastikan mengisi data dengan benar</p>
          </div>
          <div className="flex flex-row ml-12">
            <div className="flex flex-col">
              <h2 className="text-md font-semibold">E-KTP</h2>
              <Image
                src={localStorage.getItem("ktpURL") ? localStorage.getItem("ktpURL") : "/placeholder_document.png"}
                alt="placeholder"
                width={204}
                height={275}
                className="mr-4 mt-1"
                style={{ objectFit: "cover", objectPosition: "centerCrop", width: "204px", height: "275px" }}
                />
            </div>
            <div className="flex flex-col ml-8">
              <h2 className="text-md font-semibold">Kartu Pegawai (Depan)</h2>
              <Image
                src={localStorage.getItem("kartuPegawaiDepanURL") ? localStorage.getItem("kartuPegawaiDepanURL") : "/placeholder_document.png"}
                alt="placeholder"
                width={204}
                height={275}
                className="mr-4 mt-1" 
                style={{ objectFit: "cover", objectPosition: "centerCrop", width: "204px", height: "275px" }}
                />
            </div>
            <div className="flex flex-col ml-8">
              <h2 className="text-md font-semibold">Kartu Pegawai (Belakang)</h2>
              <Image
                src={localStorage.getItem("kartuPegawaiBelakangURL") ? localStorage.getItem("kartuPegawaiBelakangURL") : "/placeholder_document.png"}
                alt="placeholder"
                width={204}
                height={275}
                className="mr-4 mt-1" 
                style={{ objectFit: "cover", objectPosition: "centerCrop", width: "204px", height: "275px" }}
                />
            </div>
            <div className="flex flex-col ml-8">
              <h2 className="text-md font-semibold">Pass Photo</h2>
              <Image
                src={localStorage.getItem("passPhotoURL") ? localStorage.getItem("passPhotoURL") : "/placeholder_document.png"}
                alt="placeholder"
                width={204}
                height={275}
                className="mr-4 mt-1" 
                style={{ objectFit: "cover", objectPosition: "centerCrop", width: "204px", height: "275px" }}
                />
            </div>
          </div>
          <div className="flex flex-row ml-12 mt-8">
  {/* Input for E-KTP */}
  <div className="flex flex-col">
    <label htmlFor="eKtpInput" className="text-md font-semibold">
      E-KTP
    </label>
    <input
      onChange={getFile}
      type="file"
      id="eKtpInput"
      className="hidden"
      accept="image/*"
    />
    <label
      htmlFor="eKtpInput"
      className="cursor-pointer bg-gray-200 p-2 mt-1 rounded">
      No File Chosen
    </label>
  </div>
  {/* Input for Kartu Pegawai (Depan) */}
  <div className="flex flex-col ml-32">
    <label htmlFor="kartuPegawaiDepanInput" className="text-md font-semibold">
      Kartu Pegawai (Depan)
    </label>
    <input
      type="file"
      id="kartuPegawaiDepanInput"
      className="hidden"
      accept="image/*"
      onChange={getFileKartuPegawaiDepan}
    />
    <label
      htmlFor="kartuPegawaiDepanInput"
      className="cursor-pointer bg-gray-200 p-2 mt-1 rounded">
      No File Chosen
    </label>
    </div>
  {/* Input for Kartu Pegawai (Belakang) */}
  <div className="flex flex-col ml-20">
    <label htmlFor="kartuPegawaiBelakangInput" className="text-md font-semibold">
      Kartu Pegawai (Belakang)
    </label>
    <input
      type="file"
      id="kartuPegawaiBelakangInput"
      className="hidden"
      accept="image/*"
      onChange={getFileKartuPegawaiBelakang}
    />
    <label
      htmlFor="kartuPegawaiBelakangInput"
      className="cursor-pointer bg-gray-200 p-2 mt-1 rounded">
      No File Chosen
    </label>
    </div>
  {/* Input for Pass Photo */}
  <div className="flex flex-col ml-16 w-48">
    <label htmlFor="passPhotoInput" className="text-md font-semibold">
      Pass Photo
    </label>
    <input
      type="file"
      id="passPhotoInput"
      className="hidden"
      accept="image/*"
      onChange={getFilePassPhoto}
    />
    <label
      htmlFor="passPhotoInput"
      className="cursor-pointer bg-gray-200 p-2 mt-1 rounded">
      No File Chosen
    </label>
    </div>
  </div>
        </form>
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
