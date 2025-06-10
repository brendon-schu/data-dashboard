import DataTable from "@/components/DataTable";

export default function MainDataTable({ data, visibleCols }) {
    return (
        <div>
            <div className="p-2 rounded mt-2">
            <DataTable data={data} visibleCols={visibleCols} />
            </div>
        </div>
    );
}
