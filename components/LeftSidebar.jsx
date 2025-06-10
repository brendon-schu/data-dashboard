
import LocalDetails from "@/components/LocalDetails"
import ProfileDetails from "@/components/ProfileDetails"
import AnimatedDecoration from "@/components/AnimatedDecoration"
import DataFeed from "@/components/DataFeed"

export default function LeftSidebar({setActivePanel}) {
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
        <LocalDetails />
        <ProfileDetails />
        <AnimatedDecoration />
        <DataFeed />
        </>
    );
}

