import DataTable from "@/components/DataTable";
import {useEffect} from 'react';

export default function MainDataTable({ data, loadTable, visibleCols }) {

    useEffect(() => {
        if (localStorage.getItem("current_dataset") == null) {
            loadTable("medical.csv");
        } else {
            const dataset = JSON.parse(localStorage.getItem("current_dataset"));
            const filename = dataset.source_path[0];
            loadTable(filename);
        }
    },[]);

    return (
        <div>
            <div className="p-2 rounded mt-2">
            <DataTable data={data} visibleCols={visibleCols} />
            </div>
        </div>
    );

}
