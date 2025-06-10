import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

export default function BarChartPanel({ data, barChartCols }) {
  if (!data || !data.length || barChartCols.length !== 1) {
    return <div className="text-sm text-gray-500 p-2">Select one column to generate a bar chart.</div>;
  }

  const key = barChartCols[0];

  const groupedData = data.reduce((acc, row) => {
    const value = row[key];
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(groupedData).map(([name, value]) => ({ name, value }));

  return (
    <div className="h-50">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{left:0, right:0, top:0, bottom:0}}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis  width={30} tickMargin={2} />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

