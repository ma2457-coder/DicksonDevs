import { useState } from 'react';
import { Leaf, Car, ShoppingBag, Zap, Plus, Moon, Sun, Settings, Award, LogOut, User } from 'lucide-react';
import MetricsCard from './MetricsCard';
import ActivityLogger from './ActivityLogger';
import Charts from './Charts';
import Insights from './Insights';
import {
  getEmissionsByPeriod,
  compareToAverage,
  getEmissionsBreakdown,
} from '../utils/carbonCalculator';

const Dashboard = ({ activities, onAddActivity, sleepMode, onToggleSleepMode, onLogout, username }) => {
  const [isLoggerOpen, setIsLoggerOpen] = useState(false);
  const [period, setPeriod] = useState('daily');

  const totalEmissions = getEmissionsByPeriod(activities, period);
  const comparison = compareToAverage(totalEmissions, period);
  const breakdown = getEmissionsBreakdown(activities);

  const periodData = {
    daily: { label: 'Today', multiplier: 1 },
    weekly: { label: 'This Week', multiplier: 7 },
    monthly: { label: 'This Month', multiplier: 30 },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Leaf className="text-green-600" size={28} />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">CarbonOS</h1>
            </div>

            <div className="flex items-center gap-4">
              {/* User Display */}
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                <User size={16} className="text-gray-600" />
                <span className="text-sm font-medium text-gray-700">{username}</span>
              </div>

              {/* Sleep Mode Toggle */}
              <button
                onClick={onToggleSleepMode}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  sleepMode
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {sleepMode ? <Moon size={18} /> : <Sun size={18} />}
                <span className="text-sm font-medium">
                  {sleepMode ? 'Sleep Mode' : 'Active'}
                </span>
              </button>

              {/* Add Activity Button */}
              <button
                onClick={() => setIsLoggerOpen(true)}
                disabled={sleepMode}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus size={18} />
                <span className="text-sm font-medium">Log Activity</span>
              </button>

              {/* Logout Button */}
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
              >
                <LogOut size={18} />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Sleep Mode Banner */}
        {sleepMode && (
          <div className="mb-6 bg-gray-800 text-white rounded-xl p-4 flex items-center gap-3">
            <Moon size={24} />
            <div>
              <h3 className="font-semibold">Sleep Mode Active</h3>
              <p className="text-sm text-gray-300">Activity tracking is paused</p>
            </div>
          </div>
        )}

        {/* Period Selector */}
        <div className="mb-6 flex gap-2">
          {['daily', 'weekly', 'monthly'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                period === p
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {periodData[p].label}
            </button>
          ))}
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricsCard
            title="Total Emissions"
            value={totalEmissions.toFixed(1)}
            unit="kg CO₂e"
            icon={Leaf}
            comparison={`${periodData[period].label}`}
          />
          <MetricsCard
            title="vs. National Avg"
            value={comparison.percentage}
            unit="%"
            icon={Award}
            comparison={
              comparison.betterThanAverage
                ? '✓ Below average!'
                : '↑ Above average'
            }
          />
          <MetricsCard
            title="Transportation"
            value={
              breakdown.find((b) => b.category === 'transportation')?.value.toFixed(1) || 0
            }
            unit="kg CO₂e"
            icon={Car}
          />
          <MetricsCard
            title="Shopping & Energy"
            value={(
              (breakdown.find((b) => b.category === 'shopping')?.value || 0) +
              (breakdown.find((b) => b.category === 'energy')?.value || 0)
            ).toFixed(1)}
            unit="kg CO₂e"
            icon={ShoppingBag}
          />
        </div>

        {/* Charts */}
        <Charts activities={activities} period={period} />

        {/* Insights */}
        <Insights
          activities={activities}
          totalEmissions={totalEmissions}
          comparison={comparison}
          breakdown={breakdown}
        />
      </main>

      {/* Activity Logger Modal */}
      <ActivityLogger
        isOpen={isLoggerOpen}
        onClose={() => setIsLoggerOpen(false)}
        onAddActivity={onAddActivity}
      />
    </div>
  );
};

export default Dashboard;
