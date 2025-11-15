import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { getChartData, getEmissionsBreakdown } from '../utils/carbonCalculator';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b'];

const Charts = ({ activities }) => {
  const chartData = getChartData(activities, 7);
  const breakdownData = getEmissionsBreakdown(activities);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Emissions Over Time */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Emissions Over Time (Last 7 Days)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis label={{ value: 'kg CO₂e', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="emissions"
              stroke="#10b981"
              strokeWidth={2}
              name="Your Emissions"
            />
            <Line
              type="monotone"
              dataKey="average"
              stroke="#ef4444"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="National Average"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Emissions by Category */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Emissions by Category
        </h3>
        {breakdownData.every(d => d.value === 0) ? (
          <div className="h-[300px] flex items-center justify-center text-gray-400">
            <p>No activities logged yet</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={breakdownData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, percent }) =>
                  percent > 0 ? `${category}: ${(percent * 100).toFixed(0)}%` : null
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {breakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default Charts;
