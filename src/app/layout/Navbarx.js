import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbarx = () => {

  const logoutUser = async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userData");
    localStorage.setItem("loginStatus", false);

    window.location.href = "/";
  }
  return (
    <nav
      className="bg-white h-16x  shadow-md items-center justify-center w-screen"
      style={{ 
        position: "sticky", top: 0, zIndex: 1000
     }}>
      <div className="items-center flex">
        <Link href="/">
          <Image
            src="/logo_airnav.jpg"
            alt="AirNav Logo"
            width={150}
            height={100}
            className="p-4 mr-96 ml-12"
          />    
        </Link>
        <div className="flex items-center rounded-md shadow-md px-3 ml-96 hover:cursor-grab" onClick={logoutUser}>
          <Image
          src="/ic_logout.png"
          alt="logout Logo"
          width={30}
          height={30}
          className="m-2"
          />
          <p className="text-md font-semibold text-AirNav">Logout</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbarx;
