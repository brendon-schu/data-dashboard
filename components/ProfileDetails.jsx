import { useEffect, useState } from "react";
import SidebarPanel from "@/components/SidebarPanel";

export default function ProfileDetails() {

    const [user,setUser] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch('/api/getuser');
			const data = await res.json();
            setUser(data);
		};
		fetchData();
	},[]);


    return (
        <SidebarPanel>
        {user ? (
            <>
            {user.username}<br />
            {user.name}<br />
            {user.job_title}<br />
            </>
        ) : (
            <div>Loading...</div>
        )}
        </SidebarPanel>
    );
}
