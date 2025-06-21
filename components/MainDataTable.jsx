import DataTable from "@/components/DataTable";
import {useEffect} from 'react';

export default function MainDataTable({ data, loadTable, visibleCols }) {

    useEffect(() => {
        var data = localStorage.getItem("current_dataset");
        if (data) {
            const data = JSON.parse(localStorage.getItem("current_dataset"));
            const dataset = data.dataset;
            const sets = dataset.source_type;
            const type = data.type;
            const num = sets.indexOf(type);
            loadTable(dataset.id,num);
        } else {
            loadTable(0,0);
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
