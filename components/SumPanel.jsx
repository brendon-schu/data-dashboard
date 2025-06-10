export default function SumPanel({ data, sumCols }) {
  if (!data || !data.length || sumCols.length !== 1) {
    return <div className="text-sm text-gray-500 p-2">Select one column to sum.</div>;
  }

  const key = sumCols[0];
  const sum = data.reduce((acc, row) => {
    const val = parseFloat(row[key]);
    return acc + (isNaN(val) ? 0 : val);
  }, 0);

  return (
    <div className="p-2 text-sm text-gray-700">
      <strong>Total {key}:</strong> {sum}
    </div>
  );
}

