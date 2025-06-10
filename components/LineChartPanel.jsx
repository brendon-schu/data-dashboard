import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

export default function LineChartPanel({ data, columns=[] }) {

    if (columns.length !== 2) {
        return <div className="text-sm text-gray-500 p-2">Select two numeric columns to plot a line chart.</div>;
    }

    const [xKey, yKey] = columns;

    const sortedData = [...data]
      .map(row => ({
        ...row,
        [xKey]: parseFloat(row[xKey]),
        [yKey]: parseFloat(row[yKey])
      }))
      .filter(row => !isNaN(row[xKey]) && !isNaN(row[yKey])) // remove bad rows
      .sort((a, b) => a[xKey] - b[xKey]);

    const isNumeric = val => !isNaN(parseFloat(val));
    const hasNumeric = sortedData.every(row => isNumeric(row[xKey]) && isNumeric(row[yKey]));

    if (!hasNumeric) {
        return (
            <div className="bg-red-100 text-red-600 p-2 mt-4 rounded">
            Columns must contain only numbers to render a line chart.
            </div>
        );
    }

    return (
        <div className="h-50">
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sortedData} margin={{left:0, right:0, top:0, bottom:0}}>
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey={xKey} hide={true} />
            <YAxis width={45} tickMargin={2} domain={['dataMin - 10', 'dataMax - 10']} />
            <Tooltip />
            <Line type="monotone" dataKey={yKey} stroke="#8884d8" strokeWidth={2} dot={false} />
            </LineChart>
        </ResponsiveContainer>
        </div>
    );
}
