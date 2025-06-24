import DataTable from "@/components/DataTable";
import {useEffect} from 'react';
import { audit_log } from '@/utils/audit';

export default function MainDataTable({ data, loadTable, visibleCols }) {

    useEffect(() => {
       loadTable(0,0);
        audit_log(1,"Viewed Main Table.");
    },[]);

    return (
        <div>
            <div className="p-2 rounded mt-2">
            <DataTable data={data} visibleCols={visibleCols} />
            </div>
        </div>
    );

}
