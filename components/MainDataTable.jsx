import DataTable from "@/components/DataTable";

export default function MainDataTable({ data }) {
    return (
        <div>
            <div className="bg-gray-100 text-gray-600 p-2 rounded mt-2">
            <DataTable data={data} />
            </div>
        </div>
    );
}
