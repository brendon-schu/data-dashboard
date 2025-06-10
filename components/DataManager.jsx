
export default function DataManager() {

    const data = [
        {name:"Medical Report",type:["CSV"],rows:8326},
        {name:"Cosmological",type:["CSV","SQL","JSON"],rows:3266}
    ];

    return (
        <div className="bg-gray-100 text-gray-600 p-2 mt-4 rounded">
        <div className="p-4">
            <div className="flex">
                <div className="flex-1 font-bold underline p-2">Name</div>
                <div className="flex-1 font-bold underline p-2">Type</div>
                <div className="flex-1 font-bold underline p-2">Rows</div>
                <div className="flex-1 font-bold underline p-2">Options</div>
            </div>
            {data.map((val,i) => (
                <div className="flex">
                    <div className="flex-1 p-2">
                    {val.name}
                    <div>
                        <div className="relative group inline-block">
                            <a className="text-gray-400 hover:underline cursor-pointer">Notes</a>
                            <div id={`notes_${i}`} className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg p-2 text-sm text-gray-700 hidden group-hover:block z-10">
                            Notes go here.
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="flex-1 p-2">{val.type.join(", ")}</div>
                    <div className="flex-1 p-2">{val.rows}</div>
                    <div className="flex-1 p-2">
                        <a className="text-blue-400 hover:underline cursor-pointer">Export</a>
                        <a className="text-green-400 hover:underline cursor-pointer ml-4">Edit</a>
                        <a className="text-red-400 hover:underline cursor-pointer ml-4">Delete</a>
                    </div>
                </div>
            ))};


        </div>
        <div className="p-4">
            <form>
            <div>
            <label className="font-bold pb-4">Name</label><br />
            <input type="text" className="input" />
            </div>
            <div className="mt-4">
            <label className="font-bold pb-4">Notes</label><br />
            <textarea className="textarea"></textarea>
            </div>
            <div className="mt-4">
            <label className="font-bold pb-4">Import Data (CSV, SQL, JSON)</label><br />
            <input type="file" className="file-input mt-4" />
            </div>
            <div className="mt-4">
            <input type="submit" value="Add Data" className="btn btn-primary" />
            </div>
            </form>
        </div>
        </div>
    );
}
