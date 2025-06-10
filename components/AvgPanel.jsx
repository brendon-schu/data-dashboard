export default function AvgPanel({ data, avgCols }) {

    if (!data || !data.length || avgCols.length !== 1) {
        return <div className="text-sm text-gray-500 p-2">Select one column to average.</div>;
    }

    const key = avgCols[0];
    const values = data
        .map(row => parseFloat(row[key]))
        .filter(val => !isNaN(val));

    const average = values.length > 0
        ? values.reduce((acc, val) => acc + val, 0) / values.length
        : 0;

    return (
        <div className="p-2 text-sm text-gray-700">
            <strong>Average {key}:</strong> {average}
        </div>
    );
}

