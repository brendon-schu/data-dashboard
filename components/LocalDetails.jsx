import { useEffect, useState } from "react";
import SidebarPanel from "@/components/SidebarPanel";

export default function LocalReportPanel() {

    const [report, setReport] = useState(null);

    const fetchData = async () => {
        const res = await fetch('/api/getuser');
        const data = await res.json();
        const lat = parseFloat(data.latitude);
        const lon = parseFloat(data.longitude);
        if (isNaN(lat) || isNaN(lon)) {
            setReport({
                city: "Unknown City",
                country: "N/A",
                date: "—",
                time: "—",
                temperature: "—",
                wind: "—",
                error: "Set Lat/Lon coords in Profile for weather data.",
            });
            return;
        }
        const weatherRes = await fetch("/api/weather?latitude="+data.latitude+"&longitude="+data.longitude);
        const weatherData = await weatherRes.json();
        setReport(weatherData);
    };

	useEffect(() => {
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

