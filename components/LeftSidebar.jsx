import {useEffect, useState} from 'react';
import LocalDetails from "@/components/LocalDetails"
import ProfileDetails from "@/components/ProfileDetails"
import AmbientPanel from "@/components/AmbientPanel"
import DataFeed from "@/components/DataFeed"

export default function LeftSidebar({setActivePanel}) {

    // for reference
    //const panels = ["Local","Profile","Ambience","Links","Line Chart","Pie Chart","Bar Chart","Sum","Average","Median","Calculator","Log"];
    const [leftbarPanels,setLeftbarPanels] = useState([]);
    const fetchData = async () => {
        const s_res = await fetch('/api/getsettings');
        const data = await s_res.json();
        setLeftbarPanels(data.left_bar_panels);
    }

    useEffect(() => {
        fetchData();
    },[]);

    return (
        <>
        <div className="bg-base-200 border border-base-100 text-base-content p-2 rounded mb-4">
            <ul className="space-y-2 text-base-content">
            <li className="bg-base-100 text-base-content hover:bg-primary hover:text-primary-content p-2 rounded cursor-pointer" onClick={()=> setActivePanel('dashboard')}>Dashboard</li>
            <li className="bg-base-100 text-base-content hover:bg-primary hover:text-primary-content  p-2 rounded cursor-pointer" onClick={()=> setActivePanel('data')}>Data</li>
            <li className="bg-base-100 text-base-content hover:bg-primary hover:text-primary-content  p-2 rounded cursor-pointer" onClick={()=> setActivePanel('profile')}>Profile</li>
            <li className="bg-base-100 text-base-content hover:bg-primary hover:text-primary-content  p-2 rounded cursor-pointer" onClick={()=> setActivePanel('settings')}>Settings</li>
            <li className="bg-base-100 text-base-content hover:bg-primary hover:text-primary-content  p-2 rounded cursor-pointer" onClick={()=> setActivePanel('log')}>Log</li>
            </ul>
        </div>
        {leftbarPanels.includes("Local") && 
            <LocalDetails />
        }
        {leftbarPanels.includes("Profile") && 
            <ProfileDetails />
        }
        {leftbarPanels.includes("Ambience") && 
            <AmbientPanel />
        }
        {leftbarPanels.includes("Links") && 
            <DataFeed />
        }
        </>
    );
}

