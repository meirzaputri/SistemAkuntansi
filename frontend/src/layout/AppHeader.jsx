import React from "react";
import logo from "../assets/logo.png";
import { MdDehaze } from 'react-icons/md';
import { useSidebar } from "../context/SidebarContext";

export default function AppHeader() {
    const { toggleSidebar, toggleMobileSidebar } = useSidebar();

    const handleToggle = () => {
        if (window.innerWidth >= 1024) toggleSidebar();
        else toggleMobileSidebar();
    };

    return (
        <header className="bg-white sticky top-0 z-20 flex w-full md:border-b lg:border-b md:border-gray-200 px-4 py-4">
            <div className="flex w-full items-center justify-between lg:justify-normal lg:px-6">
                <button onClick={handleToggle} className="p-2 rounded-lg lg:hidden">
                    <MdDehaze className="text-black" size={24} />
                </button>

                <div className="absolute left-1/2 -translate-x-1/2 lg:hidden">
                    <img
                        src={logo} 
                        alt="PT Permata Bukit Hijau"
                        className="w-20 h-9 lg:w-20 object-contain"
                    />
                </div>

                <div className="hidden lg:flex items-center">
                    <h1 className="text-lg font-semibold text-black">
                        Sistem Informasi Akuntansi
                    </h1>
                </div>
                
                <div className="flex-1 flex items-center justify-end gap-4">
                    <div className="hidden md:flex items-center"> 
                        <span className="block font-medium text-black text-sm">
                            Clara Melody
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
};