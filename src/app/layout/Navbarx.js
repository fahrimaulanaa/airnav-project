import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbarx = () => {
  return (
    <nav
      className="bg-white h-16 shadow-md items-center justify-center"
      style={{ position: "sticky", top: 0 }}
    >
      <div className="items-center flex-shrink-0 justify-between">
        <Link href="/">
          <Image
            src="/logo_airnav.jpg"
            alt="AirNav Logo"
            width={150}
            height={100}
            className="p-4 ml-12"
          />    
        </Link>
      </div>
    </nav>
  );
};

export default Navbarx;
