// Rewards and points calculation utilities

import { getEmissionsByPeriod, NATIONAL_AVERAGE_DAILY } from './carbonCalculator';

/**
 * Calculate points based on streak length
 */
export function getPointsForDay(streakLength) {
  if (streakLength <= 7) return 2;
  if (streakLength <= 30) return 5;
  return 10;
}

/**
 * Calculate user's weekly average emissions
 */
export function getUserWeeklyAverage(activities) {
  const weeklyEmissions = getEmissionsByPeriod(activities, 'weekly');
  return weeklyEmissions / 7; // Daily average from weekly total
}

/**
 * Check if a day qualifies for streak (below user's weekly average)
 */
export function isDayQualifying(dayActivities, userWeeklyAvg) {
  const dayTotal = dayActivities.reduce((sum, activity) => sum + (activity.emissions || 0), 0);
  return dayTotal > 0 && dayTotal < userWeeklyAvg;
}

/**
 * Calculate current streak and total points
 */
export function calculateStreakAndPoints(activities) {
  if (!activities || activities.length === 0) {
    return { currentStreak: 0, longestStreak: 0, totalPoints: 0 };
  }

  const userWeeklyAvg = getUserWeeklyAverage(activities);

  // Group activities by date
  const activityByDate = {};
  activities.forEach(activity => {
    const date = new Date(activity.timestamp).toDateString();
    if (!activityByDate[date]) {
      activityByDate[date] = [];
    }
    activityByDate[date].push(activity);
  });

  // Get sorted dates (newest first)
  const dates = Object.keys(activityByDate).sort((a, b) => new Date(b) - new Date(a));

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  let totalPoints = 0;

  // Calculate from most recent day backwards
  for (let i = 0; i < dates.length; i++) {
    const date = dates[i];
    const dayActivities = activityByDate[date];

    if (isDayQualifying(dayActivities, userWeeklyAvg)) {
      tempStreak++;

      // Current streak is only from today backwards without gaps
      if (i === 0 || currentStreak === i) {
        currentStreak = tempStreak;
      }

      // Track longest streak ever
      if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
      }

      // Add points for this qualifying day
      totalPoints += getPointsForDay(tempStreak);
    } else {
      tempStreak = 0;
    }
  }

  return {
    currentStreak,
    longestStreak,
    totalPoints,
  };
}

/**
 * Sample local businesses data
 */
export const SAMPLE_BUSINESSES = [
  {
    id: 'biz_001',
    name: 'Green Thread Clothing',
    category: 'fashion',
    sustainable: true,
    description: '100% organic cotton, carbon-neutral shipping',
    location: 'Downtown',
    sustainabilityPractices: 'Zero-waste packaging, renewable energy powered',
    logo: '👕',
    coupons: [
      { points: 15, discount: '10% off', tier: 'bronze' },
      { points: 30, discount: '15% off', tier: 'silver' },
      { points: 50, discount: '25% off', tier: 'gold' },
    ]
  },
  {
    id: 'biz_002',
    name: 'Sprout Organic Cafe',
    category: 'food',
    sustainable: true,
    description: 'Farm-to-table organic meals, compostable packaging',
    location: 'City Center',
    sustainabilityPractices: 'Local sourcing, zero food waste program',
    logo: '🌱',
    coupons: [
      { points: 15, discount: '10% off meal', tier: 'bronze' },
      { points: 30, discount: 'Free coffee with meal', tier: 'silver' },
      { points: 50, discount: '20% off', tier: 'gold' },
    ]
  },
  {
    id: 'biz_003',
    name: 'EcoCycle Bike Shop',
    category: 'transport',
    sustainable: true,
    description: 'Bike repairs, refurbished bikes, eco-friendly accessories',
    location: 'Northside',
    sustainabilityPractices: 'Bike recycling program, solar-powered workshop',
    logo: '🚴',
    coupons: [
      { points: 20, discount: 'Free bike tune-up', tier: 'bronze' },
      { points: 40, discount: '15% off accessories', tier: 'silver' },
      { points: 100, discount: '30% off refurbished bike', tier: 'gold' },
    ]
  },
  {
    id: 'biz_004',
    name: 'Refill Station',
    category: 'household',
    sustainable: true,
    description: 'Package-free cleaning products, personal care items',
    location: 'West End',
    sustainabilityPractices: 'Zero plastic packaging, bulk refills only',
    logo: '🧴',
    coupons: [
      { points: 10, discount: '10% off refills', tier: 'bronze' },
      { points: 25, discount: 'Free reusable container', tier: 'silver' },
      { points: 50, discount: '20% off entire purchase', tier: 'gold' },
    ]
  },
  {
    id: 'biz_005',
    name: 'Solar Sips Coffee',
    category: 'food',
    sustainable: true,
    description: 'Fair-trade coffee, 100% renewable energy powered',
    location: 'Downtown',
    sustainabilityPractices: 'Compostable cups, solar panels on roof',
    logo: '☕',
    coupons: [
      { points: 12, discount: 'Free pastry with coffee', tier: 'bronze' },
      { points: 25, discount: '15% off', tier: 'silver' },
      { points: 45, discount: 'Free drink on us', tier: 'gold' },
    ]
  },
  {
    id: 'biz_006',
    name: 'Thrift Haven',
    category: 'fashion',
    sustainable: true,
    description: 'Second-hand clothing, vintage finds, upcycled fashion',
    location: 'South District',
    sustainabilityPractices: 'Circular economy, clothing donation program',
    logo: '👗',
    coupons: [
      { points: 15, discount: '15% off', tier: 'bronze' },
      { points: 35, discount: '25% off', tier: 'silver' },
      { points: 60, discount: 'Buy 2 Get 1 Free', tier: 'gold' },
    ]
  },
];

/**
 * Generate unique coupon code
 */
export function generateCouponCode() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `ECO-${timestamp}-${random}`;
}

/**
 * Create redeemed coupon object
 */
export function createRedeemedCoupon(business, coupon, userPoints) {
  const now = new Date();
  const expiresDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days from now

  return {
    id: `coup_${Date.now()}`,
    businessId: business.id,
    businessName: business.name,
    businessLogo: business.logo,
    businessLocation: business.location,
    code: generateCouponCode(),
    discount: coupon.discount,
    pointsCost: coupon.points,
    redeemedDate: now.toISOString(),
    expiresDate: expiresDate.toISOString(),
    used: false,
  };
}

/**
 * Check if coupon is expired
 */
export function isCouponExpired(coupon) {
  return new Date() > new Date(coupon.expiresDate);
}

/**
 * Get days until coupon expires
 */
export function getDaysUntilExpiration(coupon) {
  const now = new Date();
  const expires = new Date(coupon.expiresDate);
  const diffTime = expires - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
}

/**
 * Filter businesses by category
 */
export function filterBusinessesByCategory(businesses, category) {
  if (!category || category === 'all') return businesses;
  return businesses.filter(b => b.category === category);
}

/**
 * Get unique categories from businesses
 */
export function getCategories(businesses) {
  const categories = [...new Set(businesses.map(b => b.category))];
  return ['all', ...categories];
}
