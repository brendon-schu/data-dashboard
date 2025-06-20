import Image from "next/image";
import { useState, useEffect, useMemo } from 'react';
import { Geist, Geist_Mono } from "next/font/google";
import LocalDetails from "@/components/LocalDetails";
import ProfileDetails from "@/components/ProfileDetails";
import AnimatedDecoration from "@/components/AnimatedDecoration";
import MainDataTable from "@/components/MainDataTable";
import Calculator from "@/components/Calculator";
import DataFeed from "@/components/DataFeed";
import DataManager from "@/components/DataManager";
import Profile from "@/components/Profile";
import Settings from "@/components/Settings";
import Log from "@/components/Log";
import LineChartPanel from "@/components/LineChartPanel";
import PieChartPanel from "@/components/PieChartPanel";
import BarChartPanel from "@/components/BarChartPanel";
import SumPanel from "@/components/SumPanel";
import AvgPanel from "@/components/AvgPanel";
import MedianPanel from "@/components/MedianPanel";
import ColumnSelector from "@/components/ColumnSelector"
import SidebarPanel from "@/components/SidebarPanel"
import ToolbarPanel from "@/components/ToolbarPanel"
import LeftSidebar from "@/components/LeftSidebar"
import RightSidebar from "@/components/RightSidebar"

// -- Login and Installation checks --

export async function getServerSideProps(context) {

	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
	const res = await fetch(`${baseUrl}/api/installCheck`);
	const { envOK, tablesOK } = await res.json();

	if (!envOK) {
		return { redirect: { destination: '/setup-env', permanent: false } };
	}

	if (!tablesOK) {
		return { redirect: { destination: '/setup-install', permanent: false } };
	}

	const cookie = context.req.headers.cookie || '';
	const session = cookie.split(';').find(c => c.trim().startsWith('session='));
	if (!session) {
		return { redirect: { destination: '/login', permanent: false } };
	}

	return { props: {} };

}

const handleLogout = async () => {
  await fetch('/api/logout');
  window.location.href = '/'; 
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {

    const [tableData, setDataTable] = useState([]);
    const [activePanel, setActivePanel] = useState('dashboard');
    const [visibleCols, setVisible] = useState(["name","email"]);
    const [lineChartCols, setLineChartCols] = useState([]);
    const [pieChartCols, setPieChartCols] = useState([]);
    const [barChartCols, setBarChartCols] = useState([]);
    const [sumCols, setSumCols] = useState([]);
    const [avgCols, setAvgCols] = useState([]);
    const [medianCols, setMedianCols] = useState([]);
    const [today, setToday] = useState("");

    const themes = ["light","dark","cupcake","bumblebee","emerald","corporate","retro","cyberpunk",
                    "garden","lofi","pastel","wireframe","luxury","autumn","business","lemonade",
                    "coffee","nord"];

    useEffect(() => {
        setToday(new Date().toLocaleDateString());
    }, []);

    function toggleLineChartCol(col) {
        setLineChartCols(prev => {
            if (prev.includes(col)) {
              return prev.filter(c => c !== col);
            } else if (prev.length < 2) {
              return [...prev, col];
            } else {
              return prev; // or show warning
            }
        });
    }

    function togglePieChartCol(col) {
        setPieChartCols(prev => {
            if (prev.includes(col)) return []; // deselect if already selected
            return [col]; // only allow one selection
        });
    }

    function toggleSumCol(col) {
        setSumCols(prev => {
            if (prev.includes(col)) return []; // deselect if already selected
            return [col]; // only allow one selection
        });
    }
    function toggleAvgCol(col) {
        setAvgCols(prev => {
            if (prev.includes(col)) return []; // deselect if already selected
            return [col]; // only allow one selection
        });
    }
    function toggleMedianCol(col) {
        setMedianCols(prev => {
            if (prev.includes(col)) return []; // deselect if already selected
            return [col]; // only allow one selection
        });
    }

    function toggleBarChartCol(col) {
        setBarChartCols(prev => {
            if (prev.includes(col)) return []; // deselect if already selected
            return [col]; // only allow one selection
        });
    }

	const pieChartData = useMemo(() => {
		if (tableData.length === 0 || pieChartCols.length !== 1) return [];

		const col = pieChartCols[0];
		const counts = {};

		tableData.forEach(row => {
			const val = row[col];
			counts[val] = (counts[val] || 0) + 1;
		});

		return Object.entries(counts).map(([name, value]) => ({ name, value }));
	}, [tableData, pieChartCols]);

	const barChartData = useMemo(() => {
		if (tableData.length === 0 || barChartCols.length !== 1) return [];

		const col = barChartCols[0];
		const counts = {};

		tableData.forEach(row => {
			const val = row[col];
			counts[val] = (counts[val] || 0) + 1;
		});

		return Object.entries(counts).map(([name, value]) => ({ name, value }));
	}, [tableData, barChartCols]);

    function toggleColumn(col) {
        setVisible(prev =>
            prev.includes(col)
                ? prev.filter(c => c !== col) : [...prev,col]
        );
    }

    const loadTable = async (id,num) => {
        try {
            const res = await fetch(`/api/load-data?id=${id}&num=${num}`);
            const json = await res.json();
            setDataTable(json);
            if (json.length > 0) {
                setVisible(Object.keys(json[0]));
            }
        } catch (err) {
            console.error('Failed to load data:', err);
        }
    };

    useEffect(() => {
        loadTable(0,0);
    }, []);

    useEffect(() => {
      const saved = localStorage.getItem("theme");
      if (saved) {
        document.documentElement.setAttribute("data-theme", saved);
      }
    }, []);

    return (
        <div className="h-screen flex flex-col bg-base-100">
            <header className="p-4">
				<div className="border border-primary shadow-xl rounded bg-base-300 px-6 py-4 flex items-center justify-between">
					<h1 className="text-xl font-bold text-base-content">📊 Data Dashboard</h1>
					<div className="flex gap-4 text-sm text-base-content">
						<select className="select select-sm select-bordered" onChange={(e) => { const selected = e.target.value; document.documentElement.setAttribute("data-theme", selected); localStorage.setItem("theme", selected); }}>
							{themes.map((theme) => (
								<option key={theme} value={theme}>{theme}</option>
							))}
						</select>
						<span>Version 1.0</span>
						<span>{today}</span>
						<button className="btn btn-info" onClick={handleLogout}>Logout</button>
					</div>
                </div>
            </header>

            <main className="flex flex-1">
                {/* Left Sidebar */}
				<div className="pl-4 pr-4">
                <div className="h-full w-64 bg-base-300 border border-primary shrink-0 rounded p-4 shadow-2xl">
					<div className="overflow-auto" style={{ height: 'calc(100vh - 250px)' }}>
					<LeftSidebar setActivePanel={setActivePanel} />
					</div>
                </div>
                </div>
                {/* Center Content */}
                <div className="flex flex-col flex-grow min-w-0">

					{/* Toolbar */}
					<div className="pb-4">
						<ToolbarPanel activePanel={activePanel} data={tableData} visibleCols={visibleCols} lineChartCols={lineChartCols} toggleLineChartCol={toggleLineChartCol} pieChartCols={pieChartCols} togglePieChartCol={togglePieChartCol} barChartCols={barChartCols} toggleBarChartCol={toggleBarChartCol} sumCols={sumCols} toggleSumCol={toggleSumCol} avgCols={avgCols} toggleAvgCol={toggleAvgCol} medianCols={medianCols} toggleMedianCol={toggleMedianCol} toggleColumn={toggleColumn} />
					</div>

                    {/* Data Display */}
					<div className="flex-grow shadow-2xl rounded border border-primary bg-base-300 text-base-content">
						<div className="p-4">
							{activePanel == "dashboard" && (
								<div className="overflow-auto" style={{ height: 'calc(100vh - 320px)' }}>
                                    <MainDataTable data={tableData} loadTable={loadTable} visibleCols={visibleCols} />
								</div>
							)}
							{activePanel == "data" && <DataManager setActivePanel={setActivePanel} />}
							{activePanel == "profile" && <Profile />}
							{activePanel == "settings" && <Settings themes={themes} />}
							{activePanel == "log" && <Log />}
						</div>
					</div>
                </div>
                {/* Right Sidebar */}
				<div className="pl-4 pr-4">
                <div className="h-full border border-primary bg-base-300 text-base-content w-64 shrink-0 rounded p-4 shadow-xl">
					<div className="overflow-auto" style={{ height: 'calc(100vh - 250px)' }}>
					<RightSidebar data={tableData} lineChartCols={lineChartCols} pieChartCols={pieChartCols} barChartCols={barChartCols} sumCols={sumCols} avgCols={avgCols} medianCols={medianCols} />
					</div>
                </div>
                </div>
            </main>
            <footer className="">
				<div className="p-4">
                <div className="border border-primary bg-base-300 text-base-content rounded p-4 shadow-xl">
                @copy; All Rights Reserved.
				</div>
				</div>
            </footer>
        </div>
    );
}
