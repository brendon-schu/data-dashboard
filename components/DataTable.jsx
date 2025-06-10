import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';

export default function DataTable({ data, visibleCols }) {
  // Dynamically create columns from keys in first data row
  const columnHelper = createColumnHelper();
  const allColumns = data[0]
    ? Object.keys(data[0]).map((key) =>
        columnHelper.accessor(key, {
            id: key,
          header: key.length > 6 ? key.slice(0,6) + '...' : key,
          cell: info => info.getValue(),
        })
      )
    : [];

  const columns = allColumns.filter(col => visibleCols.includes(col.id));

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="table-auto w-full border border-gray-300 text-sm">
      <thead className="bg-base-100 text-base-content">
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id} className="pl-1 pr-1 border">
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id} className="bg-base-200 text-base-content pl-1 pr-1 border">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

