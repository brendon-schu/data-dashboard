import Image from "next/image";
import { useState, useEffect } from 'react';
import { Geist, Geist_Mono } from "next/font/google";
import LocalDetails from "@/components/LocalDetails";
import ProfileDetails from "@/components/ProfileDetails";
import AnimatedDecoration from "@/components/AnimatedDecoration";
import MainDataTable from "@/components/MainDataTable";
import Calculator from "@/components/Calculator";
import DataFeed from "@/components/DataFeed";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/api/load-csv?name=medical.csv')
            .then((res) => res.json())
            .then((json) => setData(json))
            .catch((err) => console.error('Failed to load data:', err));
    }, []);
    return (
    <div className="h-screen flex flex-col">
        <header className="p-4">
        <h1>Data Dashboard</h1>
        </header>
        <main className="flex flex-1 overflow-hidden">
            {/* Left Sidebar */}
            <div className="w-64 shrink-0 bg-gray-200 rounded m-4 p-4">
                <aside className="bg-gray-400 text-white p-2">
                    <ul className="space-y-2">
                    <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Dashboard</li>
                    <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Data</li>
                    <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Profile</li>
                    <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Settings</li>
                    <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Log</li>
                    </ul>
                </aside>
                <LocalDetails />
                <ProfileDetails />
                <AnimatedDecoration />
                <DataFeed />
            </div>
            {/* Main contet */}
            <div className="flex flex-col flex-grow overflow-hidden">
                <div className="bg-gray-100 text-gray-600 m-4 p-2 rounded">
                Filters go here.
                </div>
                {/* Scrollable panel */}
                <div className="overflow-auto ml-4 mr-4">
                    <div className="min-w-full inline-block bg-gray-200 p-4 rounded">
                        <MainDataTable data={data} />
                    </div>
                </div>
            </div>
            {/* Right sidebar */}
            <div className="w-64 shrink-0 bg-gray-200 rounded m-4 p-4">
                <div className="bg-gray-100 text-gray-600 p-2 mt-4 rounded">
                Chart
                </div>
                <div className="bg-gray-100 text-gray-600 p-2 mt-4 rounded">
                Chart
                </div>
                <Calculator />
                <div className="bg-gray-100 text-gray-600 p-2 mt-4 rounded">
                Log
                </div>
            </div>
        </main>
        <footer className="p-4">
            @copy; All Rights Reserved.
        </footer>
    </div>
  );
}
