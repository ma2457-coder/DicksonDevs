import { TrendingDown, TrendingUp } from 'lucide-react';

const MetricsCard = ({ title, value, unit, comparison, icon: Icon, trend }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-green-100 rounded-lg">
          {Icon && <Icon className="text-green-600" size={24} />}
        </div>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 text-sm ${trend < 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend < 0 ? <TrendingDown size={16} /> : <TrendingUp size={16} />}
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>

      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>

      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-3xl font-bold text-gray-800">{value}</span>
        <span className="text-gray-500 text-sm">{unit}</span>
      </div>

      {comparison && (
        <p className="text-sm text-gray-500">{comparison}</p>
      )}
    </div>
  );
};

export default MetricsCard;
