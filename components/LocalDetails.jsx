import { useEffect, useState } from "react";
import SidebarPanel from "@/components/SidebarPanel";

export default function LocalReportPanel() {

    const [report, setReport] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch('/api/getuser');
			const data = await res.json();
			fetch("/api/weather?latitude="+data.latitude+"&longitude="+data.longitude)
			.then((res) => res.json())
			.then(setReport)
			.catch(() => setReport({ error: "Unavailable" }));
		};
		fetchData();
	},[]);

    if (!report) return <div className="p-4">Loading weather…</div>;

	return (
		<SidebarPanel>
			{report.error ? ( <div>{report.error}</div>) : (
				<>
				<div>{report.city}, {report.country}</div>
				<div>{report.date}</div>
				<div>{report.time}</div>
				<div>Temp: {report.temperature}</div>
				<div>Wind: {report.wind}</div>
				</>
			)}
		</SidebarPanel>
	);

}

