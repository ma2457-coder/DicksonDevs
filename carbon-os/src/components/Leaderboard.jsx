import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Award, TrendingDown, Users } from 'lucide-react';
import { calculateTotalEmissions, getEmissionsByPeriod } from '../utils/carbonCalculator';

const Leaderboard = ({ currentUser, activities }) => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [currentUserRank, setCurrentUserRank] = useState(null);

  // Mock global leaderboard data - in production, this would come from an API
  const generateMockLeaderboard = () => {
    const mockUsers = [
      { username: 'EcoWarrior23', dailyEmissions: 8.5, location: 'Portland, OR' },
      { username: 'GreenCommuter', dailyEmissions: 9.2, location: 'Seattle, WA' },
      { username: 'SustainableSam', dailyEmissions: 10.1, location: 'Austin, TX' },
      { username: 'BikeLife47', dailyEmissions: 11.3, location: 'Denver, CO' },
      { username: 'ZeroWasteZoe', dailyEmissions: 12.7, location: 'San Francisco, CA' },
      { username: 'ClimateChamp', dailyEmissions: 13.4, location: 'Boston, MA' },
      { username: 'CarbonCrusher', dailyEmissions: 14.8, location: 'Chicago, IL' },
      { username: 'NatureLover88', dailyEmissions: 15.2, location: 'Minneapolis, MN' },
      { username: 'EarthFirst', dailyEmissions: 16.5, location: 'New York, NY' },
      { username: 'GreenThumb', dailyEmissions: 17.1, location: 'Phoenix, AZ' },
    ];

    // Calculate current user's daily emissions
    const todayEmissions = getEmissionsByPeriod(activities, 'daily');
    const currentUserData = {
      username: currentUser,
      dailyEmissions: todayEmissions,
      location: 'Your City',
      isCurrentUser: true
    };

    // Combine mock data with current user
    const allUsers = [...mockUsers, currentUserData];

    // Sort by emissions (lowest first)
    const sorted = allUsers.sort((a, b) => a.dailyEmissions - b.dailyEmissions);

    // Add rank to each user
    const ranked = sorted.map((user, index) => ({
      ...user,
      rank: index + 1
    }));

    // Find current user's rank
    const userRankData = ranked.find(user => user.username === currentUser);
    setCurrentUserRank(userRankData);

    // Return top 10 for display
    setLeaderboardData(ranked.slice(0, 10));
  };

  useEffect(() => {
    generateMockLeaderboard();
  }, [activities, currentUser]);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="text-yellow-500" size={24} />;
      case 2:
        return <Medal className="text-gray-400" size={24} />;
      case 3:
        return <Medal className="text-amber-600" size={24} />;
      default:
        return <span className="text-gray-600 font-bold text-lg">{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      case 3:
        return 'bg-gradient-to-r from-amber-500 to-amber-700 text-white';
      default:
        return 'bg-white';
    }
  };

  const getEmissionColor = (emissions) => {
    if (emissions < 10) return 'text-green-600 font-bold';
    if (emissions < 15) return 'text-yellow-600 font-bold';
    return 'text-orange-600 font-bold';
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-t-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <Trophy size={32} />
              Global Leaderboard
            </h2>
            <p className="text-green-100 mt-2">
              Top eco-champions with lowest daily carbon emissions
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-green-100">
              <Users size={20} />
              <span className="text-sm">1,247 active users</span>
            </div>
          </div>
        </div>
      </div>

      {/* Current User Rank Card */}
      {currentUserRank && (
        <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 mb-4 -mt-2 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
                #{currentUserRank.rank}
              </div>
              <div>
                <p className="text-sm text-gray-600">Your Rank</p>
                <p className="font-bold text-lg">{currentUserRank.username}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Daily Emissions</p>
              <p className={`text-2xl ${getEmissionColor(currentUserRank.dailyEmissions)}`}>
                {currentUserRank.dailyEmissions.toFixed(1)} kg
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard List */}
      <div className="bg-white rounded-b-lg shadow-lg overflow-hidden">
        <div className="divide-y divide-gray-200">
          {leaderboardData.map((user) => (
            <div
              key={user.username}
              className={`p-4 hover:bg-gray-50 transition-colors ${
                user.isCurrentUser ? 'bg-blue-50 border-l-4 border-blue-500' : ''
              } ${getRankBadgeColor(user.rank)}`}
            >
              <div className="flex items-center justify-between">
                {/* Rank and User Info */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 flex justify-center">
                    {getRankIcon(user.rank)}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className={`font-bold ${user.isCurrentUser ? 'text-blue-700' : 'text-gray-800'}`}>
                        {user.username}
                        {user.isCurrentUser && (
                          <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                            You
                          </span>
                        )}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <span>📍</span>
                      {user.location}
                    </p>
                  </div>
                </div>

                {/* Emissions */}
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="text-green-600" size={16} />
                    <span className={getEmissionColor(user.dailyEmissions)}>
                      {user.dailyEmissions.toFixed(1)} kg
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">CO₂e per day</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Award className="text-green-600 mt-1" size={20} />
          <div className="text-sm text-gray-700">
            <p className="font-semibold text-green-800 mb-1">How to climb the leaderboard:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Choose sustainable transportation (bike, walk, public transit)</li>
              <li>Reduce unnecessary shopping and deliveries</li>
              <li>Minimize home energy usage during peak hours</li>
              <li>Log your activities daily to track your progress</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mock Data Notice */}
      <div className="mt-3 text-center text-xs text-gray-500 italic">
        * Leaderboard currently displays mock data. Connect to API for real global rankings.
      </div>
    </div>
  );
};

export default Leaderboard;
