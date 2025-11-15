// Carbon emission factors (kg CO2e)
export const EMISSION_FACTORS = {
  transportation: {
    car: 0.4,      // kg CO2 per mile
    bus: 0.1,      // kg CO2 per mile
    train: 0.08,   // kg CO2 per mile
    plane: 0.25,   // kg CO2 per mile
    bike: 0,       // zero emissions
    walk: 0,       // zero emissions
  },
  shopping: {
    online: 0.5,   // kg CO2 per package
    inStore: 0.2,  // kg CO2 per trip
    foodDelivery: 0.5, // kg CO2 per delivery
  },
  energy: {
    homeHour: 0.5, // kg CO2 per hour at home (average)
  },
};

// US national average: ~16 tons CO2 per year = ~44 kg per day
export const NATIONAL_AVERAGE_DAILY = 44;

/**
 * Calculate CO2 emissions for a transportation activity
 */
export function calculateTransportationEmissions(mode, distance) {
  const factor = EMISSION_FACTORS.transportation[mode] || 0;
  return factor * distance;
}

/**
 * Calculate CO2 emissions for a shopping activity
 */
export function calculateShoppingEmissions(type) {
  return EMISSION_FACTORS.shopping[type] || 0;
}

/**
 * Calculate CO2 emissions for energy usage
 */
export function calculateEnergyEmissions(hours) {
  return EMISSION_FACTORS.energy.homeHour * hours;
}

/**
 * Calculate total emissions for an activity
 */
export function calculateActivityEmissions(activity) {
  const { category, type, distance, hours } = activity;

  switch (category) {
    case 'transportation':
      return calculateTransportationEmissions(type, distance || 0);
    case 'shopping':
      return calculateShoppingEmissions(type);
    case 'energy':
      return calculateEnergyEmissions(hours || 0);
    default:
      return 0;
  }
}

/**
 * Calculate total emissions from an array of activities
 */
export function calculateTotalEmissions(activities) {
  return activities.reduce((total, activity) => {
    return total + (activity.emissions || 0);
  }, 0);
}

/**
 * Get emissions by time period
 */
export function getEmissionsByPeriod(activities, period = 'daily') {
  const now = new Date();
  const filtered = activities.filter(activity => {
    const activityDate = new Date(activity.timestamp);

    switch (period) {
      case 'daily':
        return activityDate.toDateString() === now.toDateString();
      case 'weekly': {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return activityDate >= weekAgo;
      }
      case 'monthly': {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        return activityDate >= monthAgo;
      }
      default:
        return true;
    }
  });

  return calculateTotalEmissions(filtered);
}

/**
 * Compare user emissions to national average
 */
export function compareToAverage(userEmissions, period = 'daily') {
  let average = NATIONAL_AVERAGE_DAILY;

  if (period === 'weekly') {
    average = NATIONAL_AVERAGE_DAILY * 7;
  } else if (period === 'monthly') {
    average = NATIONAL_AVERAGE_DAILY * 30;
  }

  const percentage = ((userEmissions / average) * 100).toFixed(1);
  return {
    average,
    userEmissions,
    percentage,
    betterThanAverage: userEmissions < average,
  };
}

/**
 * Get chart data for visualizations
 */
export function getChartData(activities, days = 7) {
  const data = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    const dayActivities = activities.filter(activity => {
      const activityDate = new Date(activity.timestamp);
      return activityDate.toDateString() === date.toDateString();
    });

    const emissions = calculateTotalEmissions(dayActivities);

    data.push({
      date: dateStr,
      emissions: parseFloat(emissions.toFixed(2)),
      average: NATIONAL_AVERAGE_DAILY,
    });
  }

  return data;
}

/**
 * Get emissions breakdown by category
 */
export function getEmissionsBreakdown(activities) {
  const breakdown = {
    transportation: 0,
    shopping: 0,
    energy: 0,
  };

  activities.forEach(activity => {
    if (breakdown.hasOwnProperty(activity.category)) {
      breakdown[activity.category] += activity.emissions || 0;
    }
  });

  return Object.entries(breakdown).map(([category, value]) => ({
    category,
    value: parseFloat(value.toFixed(2)),
  }));
}
