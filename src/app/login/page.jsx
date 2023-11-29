"use client";

import Image from "next/image";
import React from "react";
import { auth } from "../firebaseConfig";
import { db } from "../firebaseConfig";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { collection, addDoc, updateDoc, setDoc, doc } from "firebase/firestore";

export default function Login() {
  function googleLogin() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        localStorage.setItem("user", JSON.stringify(user));

        storeUserInfoToFirestore(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  async function storeUserInfoToFirestore(user) {
    const userDocRef = doc(collection(db, 'users'), user.uid);
  
    await setDoc(userDocRef, {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      providerId: user.providerId,
      emailVerified: user.emailVerified,
    });
  }


  return (
    <main>
      <div className="flex bg-airnav-bgy h-screen items-center justify-center">
        <div
          className="flex flex-wrap items-center justify-center max-w-2xl w-full"
          style={{
            backdropFilter: "blur(80px)",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            opacity: "0.9",
          }}
        >
          <h2 className="lg:text-4xl md:text-3xl sm:text-2xl font-bold text-airnav-blue pt-4">
            Masuk ke Platform
          </h2>
          <button
            className="bg-white p-3 mt-6 mr-12 ml-12 text-black font-medium w-full rounded-full lg:text-base sm:text-sm"
            type="button"
            onClick={googleLogin}
          >
            <div className="flex items-center justify-center px-12">
              <Image
                src="/google_logo.png"
                alt="Google Icon"
                width={35}
                height={35}
              />
              <span className="ml-2">Masuk dengan Google</span>
            </div>
          </button>
          <Image
            src="/ic_Separator.png"
            alt="Separator"
            width={500}
            height={30}
            className="pt-6"
          />
          {/* Form */}
          <form className="mt-5 w-full">
            <div className="flex flex-wrap mb-6">
              <div className="w-full px-12">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded-md py-4 pl-4 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 shadow-md"
                  id="email"
                  type="email"
                  placeholder="Masukkan email anda"
                />
              </div>
            </div>
            {/* Add more form fields here */}
            <div className="flex flex-wrap mb-6">
              <div className="w-full px-12">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded-md py-4 pl-4 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 shadow-md"
                  id="password"
                  type="password"
                  placeholder="Masukkan password anda"
                />
              </div>
            </div>
            <div className="flex flex-wrap mb-6 items-center justify-center text-center">
              <div className="w-full px-12">
                <button
                  className="bg-airnav-blue p-4 text-white font-medium w-full rounded-full"
                  type="button"
                >
                  Masuk ke Platform
                </button>
              </div>
            </div>
          </form>
          <div className="flex items-center justify-center px-12">
            <p className="text-black mr-3">Belum punya akun? </p>
            <a
              href="/register"
              className="text-blue-900 text-lg font-semibold underline"
            >
              Daftar Sekarang
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
