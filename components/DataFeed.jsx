
import {useEffect, useState} from 'react';
import SidebarPanel from "@/components/SidebarPanel";

export default function DataFeed() {

    const [links,setLinks] = useState([]);

    const fetchData = async () => {
        const res = await fetch('/api/getsettings');
        const data = await res.json();
        setLinks(data.reference_links);
    };

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <SidebarPanel>
        {links.map((val,i) => (
            <div key={`ref_${i}}`}>
            <a href={`${val}?=${Date.now()}`} target='_blank' rel='noopener noreferrer'>{val}</a>
            </div>
        ))}
        </SidebarPanel>
    );
}
