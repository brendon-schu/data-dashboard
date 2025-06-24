
import { useEffect, useState } from 'react';
import { audit_log } from '@/utils/audit';

export default function Log() {

    const [rows,setRows] = useState([]);

    const fetchData = async () => {
        const res = await fetch('/api/getaudit');
        const data = await res.json();
        setRows(data);
    }
    useEffect(() => {
        fetchData();
        audit_log(1,'Viewed audit log.');
    },[]);

    return (
        <div className="bg-gray-100 text-gray-600 p-2 mt-4 rounded">
        {rows.map((val,i) =>
            <div key={`div_${i}`} className='flex'>
                <div className='flex-1'>{val.timestamp}</div>
                <div className='flex-1'>{val.username}</div>
                <div className='flex-1'>{val.action}</div>
            </div>
        )}
        </div>
    );
}
