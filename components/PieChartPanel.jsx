import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1', '#a4de6c', '#d0ed57', '#ffc0cb'];

export default function PieChartPanel({ data, pieChartCols }) {
  if (!data || !data.length || pieChartCols.length !== 1) {
    return <div className="text-sm text-gray-500 p-2">Select one column to generate a pie chart.</div>;
  }

  const key = pieChartCols[0];

  // Group data by key and count occurrences
  const groupedData = data.reduce((acc, row) => {
    const value = row[key];
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(groupedData).map(([name, value]) => ({
    name,
    value,
  }));

  return (
	<div className="h-50">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius="80%"
            fill="#8884d8"
            label
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

