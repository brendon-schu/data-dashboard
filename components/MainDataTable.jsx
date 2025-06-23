import DataTable from "@/components/DataTable";
import {useEffect} from 'react';

export default function MainDataTable({ data, loadTable, visibleCols }) {

    useEffect(() => {
       loadTable(0,0);
    },[]);

    return (
        <div>
            <div className="p-2 rounded mt-2">
            <DataTable data={data} visibleCols={visibleCols} />
            </div>
        </div>
    );

}
