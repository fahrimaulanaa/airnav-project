"use client";
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

const Navbar = () => {

    const [isClick, setisClick] = React.useState(false)

    const toogleNavbar = () => {
        setisClick(!isClick)
    }


  return (
    <nav className='bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex items-center justify-between h-16'>
                <div className='flex items-center'>
                    <div className='flex-shrink-0'>
                    <Link href='/'>
                        <Image 
                            src='/logo_airnav.jpg'
                            alt='AirNav Logo'
                            width={150}
                            height={100}
                            />
                    </Link>
                    </div>
                </div>
                <div className='hidden md:block'>
                    <div className='ml-4 flex items-center space-x-4'>
                        <Link href='/profile'>
                            <span className='text-[#343842] hover:text-white hover:bg-[#343842] hover:py-4 hover:px-6 hover:rounded-md transition duration-500 ease-in-out'>Data Pribadi</span>
                        </Link>
                        <Link href='/family'>
                            <span className='text-[#343842] hover:text-white hover:bg-[#343842] hover:py-4 hover:px-6 hover:rounded-md transition duration-500 ease-in-out'>Informasi Keluarga</span>
                        </Link>
                        <Link href='/education'>
                            <span className='text-[#343842] hover:text-white hover:bg-[#343842] hover:py-4 hover:px-6 hover:rounded-md transition duration-500 ease-in-out'>Informasi Pendidikan</span>
                        </Link>
                        <Link href='/jobdesc'>
                            <span className='text-[#343842] hover:text-white hover:bg-[#343842] hover:py-4 hover:px-6 hover:rounded-md transition duration-500 ease-in-out'>Deskripsi Tugas</span>
                        </Link>
                        <Link href='/document'>
                            <span className='text-[#343842] hover:text-white hover:bg-[#343842] hover:py-4 hover:px-6 hover:rounded-md transition duration-500 ease-in-out'>Dokumen Pendukung</span>
                        </Link>
                        <Link href='/login'>
                            <button className='bg-[#343842] text-white py-2 px-6 rounded-md'>
                                Masuk
                            </button>
                        </Link>
                        <Link href='/signup'>
                            <button className='bg-none text-[#343842] border border-[#343842] py-2 px-6 rounded-md'>
                                Daftar
                            </button>
                        </Link>
                    </div>
                </div>
                <div className='md:hidden flex items-center'>
                    <button className='inline-flex items-center justify-center p-2 rounded-md text-black' onClick={toogleNavbar}>
                        {isClick ? (
                            <svg  className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor" >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"/>
                              </svg>
                        ):(
                            <svg  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"/>
                    </svg>
                        )}
                    </button>
                </div>
            </div>
        </div>
        {isClick ? (
            <div className='md:hidden'>
                <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
                    <Link href='/profile'>
                        <span className='text-[#343842] block p-2 hover:text-white hover:bg-[#343842] rounded-lg transition duration-250'>Data Pribadi</span>
                    </Link>
                    <Link href='/family'>
                        <span className='text-[#343842] block p-2 hover:text-white hover:bg-[#343842] rounded-lg transition duration-250'>Informasi Keluarga</span>
                    </Link>
                    <Link href='/education'>
                        <span className='text-[#343842] block p-2 hover:text-white hover:bg-[#343842] rounded-lg transition duration-250'>Informasi Pendidikan</span>
                    </Link>
                    <Link href='/jobdesc'>
                        <span className='text-[#343842] block p-2 hover:text-white hover:bg-[#343842] rounded-lg transition duration-250'>Deskripsi Tugas</span>
                    </Link>
                    <Link href='/document'>
                        <span className='text-[#343842] block p-2 hover:text-white hover:bg-[#343842] rounded-lg transition duration-250 mb-6'>Dokumen Pendukung</span>
                    </Link>
                    <Link href='/'>
                        <button className='bg-[#343842] text-white py-2 px-6 rounded-md mr-6'>
                            Masuk
                        </button>
                    </Link>
                    <Link href='/'>
                        <button className='bg-none text-[#343842] border border-[#343842] py-2 px-6 rounded-md'>
                            Daftar
                        </button>
                    </Link>
                </div>
            </div>
        ):(
            <></>
        )}
    </nav>
  )
}

export default Navbar