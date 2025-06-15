import {useRef, useEffect, useState} from 'react';

export default function DataManager({setActivePanel}) {

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const formData = new FormData(e.target);
        const res = await fetch('/api/upload-data', {
            method: 'POST',
            body: formData,
        });
        const result = await res.json();
        console.log(result);
    };

    const handleView = (dataset,index) => {
        let json = JSON.stringify(dataset);
        localStorage.setItem('current_dataset',json);
        setActivePanel("dashboard");
    }

    const [rows, setRows] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const res = await fetch('/api/getdatasets');
        const data = await res.json();
        setRows(data || []);
      };
      fetchData();
    }, []);

    return (
        <div className="bg-gray-100 text-gray-600 p-2 mt-4 rounded">
        <div className="p-4">
            <div className="flex">
                <div className="flex-1 font-bold underline p-2">Name</div>
                <div className="flex-1 font-bold underline p-2">Type</div>
                <div className="flex-1 font-bold underline p-2">Rows</div>
                <div className="flex-1 font-bold underline p-2">Options</div>
            </div>
            {rows.map((val,i) => (
                <div className="flex" key={i}>
                    <div className="flex-1 p-2">
                    {val.name}
                    <div>
                        <div className="relative group inline-block">
                            <a className="text-gray-400 hover:underline cursor-pointer">Notes</a>
                            <div id={`notes_${i}`} className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg p-2 text-sm text-gray-700 hidden group-hover:block z-10">
                            {val.notes}
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="flex-1 p-2">{val.source_type.join(", ")}</div>
                    <div className="flex-1 p-2">0</div>
                    <div className="flex-1 p-2">
                        <a className="text-purple-400 hover:underline cursor-pointer" onClick={() => handleView(val,i)} >View</a>
                        <a className="text-blue-400 hover:underline cursor-pointer ml-4">Export</a>
                        <a className="text-green-400 hover:underline cursor-pointer ml-4">Edit</a>
                        <a className="text-red-400 hover:underline cursor-pointer ml-4">Delete</a>
                    </div>
                </div>
            ))}


        </div>
        <div className="p-4">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div>
            <label className="font-bold pb-4">Name</label><br />
            <input type="text" name="name" className="input" />
            </div>
            <div className="mt-4">
            <label className="font-bold pb-4">Notes</label><br />
            <textarea className="textarea" name="notes"></textarea>
            </div>
            <div className="mt-4">
            <label className="font-bold pb-4">Import Data (CSV, JSON)</label><br />
            <input type="file" name="file" className="file-input mt-4" />
            </div>
            <div className="mt-4">
            <input type="submit" value="Add Data" className="btn btn-primary" />
            </div>
            </form>
        </div>
        </div>
    );
}
