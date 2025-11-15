import { Lightbulb, Award, TrendingDown } from 'lucide-react';
import { useState, useEffect } from 'react';

const ACHIEVEMENTS = [
  {
    id: 'first_day',
    name: 'First Steps',
    description: 'Completed your first day of tracking',
    icon: '🌱',
    requirement: (activities) => activities.length >= 1,
  },
  {
    id: 'low_carbon_day',
    name: 'Low Carbon Day',
    description: 'Kept emissions below national average',
    icon: '🌿',
    requirement: (activities, comparison) => comparison.betterThanAverage,
  },
  {
    id: 'week_streak',
    name: 'Week Warrior',
    description: 'Logged activities for 7 days',
    icon: '⭐',
    requirement: (activities) => {
      const days = new Set(activities.map(a => new Date(a.timestamp).toDateString()));
      return days.size >= 7;
    },
  },
  {
    id: 'eco_commuter',
    name: 'Eco Commuter',
    description: 'Used bike or walking 5 times',
    icon: '🚴',
    requirement: (activities) => {
      const ecoTrips = activities.filter(
        a => a.category === 'transportation' && (a.type === 'bike' || a.type === 'walk')
      );
      return ecoTrips.length >= 5;
    },
  },
];

const getTips = (breakdown, totalEmissions, comparison) => {
  const tips = [];

  const transportation = breakdown.find(b => b.category === 'transportation')?.value || 0;
  const shopping = breakdown.find(b => b.category === 'shopping')?.value || 0;
  const energy = breakdown.find(b => b.category === 'energy')?.value || 0;

  if (transportation > totalEmissions * 0.5) {
    tips.push({
      category: 'Transportation',
      tip: 'Transportation is your largest source of emissions. Consider using public transit, biking, or walking for short trips.',
      icon: '🚗',
    });
  }

  if (shopping > totalEmissions * 0.3) {
    tips.push({
      category: 'Shopping',
      tip: 'Consolidate shopping trips and consider buying local products to reduce delivery emissions.',
      icon: '🛍️',
    });
  }

  if (energy > totalEmissions * 0.3) {
    tips.push({
      category: 'Energy',
      tip: 'Reduce home energy usage by turning off lights, using energy-efficient appliances, and adjusting your thermostat.',
      icon: '💡',
    });
  }

  if (comparison.betterThanAverage) {
    tips.push({
      category: 'Great Job!',
      tip: "You're doing better than the national average! Keep up the great work and inspire others.",
      icon: '🎉',
    });
  } else {
    tips.push({
      category: 'Room for Improvement',
      tip: `You're currently at ${comparison.percentage}% of the national average. Small changes can make a big difference!`,
      icon: '📈',
    });
  }

  return tips.slice(0, 3);
};

const Insights = ({ activities, totalEmissions, comparison, breakdown }) => {
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const tips = getTips(breakdown, totalEmissions, comparison);

  useEffect(() => {
    const unlocked = ACHIEVEMENTS.filter(achievement =>
      achievement.requirement(activities, comparison)
    );
    setUnlockedAchievements(unlocked);
  }, [activities, comparison]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Tips & Recommendations */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="text-yellow-500" size={24} />
          <h3 className="text-lg font-semibold text-gray-800">
            Personalized Tips
          </h3>
        </div>
        <div className="space-y-4">
          {tips.map((tip, index) => (
            <div key={index} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-2xl">{tip.icon}</span>
              <div>
                <h4 className="font-medium text-gray-800 text-sm">{tip.category}</h4>
                <p className="text-sm text-gray-600 mt-1">{tip.tip}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <Award className="text-green-500" size={24} />
          <h3 className="text-lg font-semibold text-gray-800">
            Achievements
          </h3>
        </div>
        <div className="space-y-3">
          {ACHIEVEMENTS.map((achievement) => {
            const isUnlocked = unlockedAchievements.some(a => a.id === achievement.id);
            return (
              <div
                key={achievement.id}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  isUnlocked
                    ? 'bg-green-50 border-2 border-green-200'
                    : 'bg-gray-50 opacity-60'
                }`}
              >
                <span className="text-3xl">{achievement.icon}</span>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 text-sm">
                    {achievement.name}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    {achievement.description}
                  </p>
                </div>
                {isUnlocked && (
                  <div className="text-green-600 font-semibold text-xs">
                    ✓ Unlocked
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Insights;
