import { Flame, Trophy, TrendingUp, Gift } from 'lucide-react';

const PointsWidget = ({ currentStreak, longestStreak, availablePoints, onClick }) => {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl shadow-lg p-5 text-white cursor-pointer hover:shadow-xl transition-all" onClick={onClick}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Gift size={24} />
          <h3 className="font-bold text-lg">Rewards</h3>
        </div>
        <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">
          Click to redeem
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white bg-opacity-10 rounded-lg p-3">
          <div className="flex items-center gap-1 mb-1">
            <Flame size={16} />
            <span className="text-xs opacity-90">Streak</span>
          </div>
          <p className="text-2xl font-bold">{currentStreak}</p>
          <p className="text-xs opacity-75">days</p>
        </div>

        <div className="bg-white bg-opacity-10 rounded-lg p-3">
          <div className="flex items-center gap-1 mb-1">
            <Trophy size={16} />
            <span className="text-xs opacity-90">Best</span>
          </div>
          <p className="text-2xl font-bold">{longestStreak}</p>
          <p className="text-xs opacity-75">days</p>
        </div>

        <div className="bg-white bg-opacity-10 rounded-lg p-3">
          <div className="flex items-center gap-1 mb-1">
            <TrendingUp size={16} />
            <span className="text-xs opacity-90">Points</span>
          </div>
          <p className="text-2xl font-bold">{availablePoints}</p>
          <p className="text-xs opacity-75">available</p>
        </div>
      </div>
    </div>
  );
};

export default PointsWidget;
