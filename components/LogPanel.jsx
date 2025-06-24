
import { useEffect, useState } from 'react';
import { audit_log } from '@/utils/audit';

export default function LogPanel() {

    const [rows,setRows] = useState([]);

    const fetchData = async () => {
        const res = await fetch('/api/getaudit');
        const data = await res.json();
        const five = data.slice(0,5);
        for (let i=0; i<five.length; i++) {
            five[i].timestamp = new Date(five[i].timestamp).toLocaleDateString('en-US');
            console.log(five[i]);
        }
        setRows(five);
    }
    useEffect(() => {
        fetchData();
        audit_log(1,'Viewed audit log.');
    },[]);

    return (
        <div className="bg-gray-100 text-sm text-gray-600 p-2 mt-4 rounded h-[200px] overflow-auto">
        {rows.map((val,i) =>
            <div key={`div_${i}`} className='pb-4'>
                <div className='flex'>
                    <div className='flex-1 font-bold'>{val.timestamp}</div>
                    <div className='flex-1 text-right'>{val.username}</div>
                </div>
                <div className=''>{val.action}</div>
            </div>
        )}
        </div>
    );
}
