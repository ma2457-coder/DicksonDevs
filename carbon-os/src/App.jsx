import { useState, useEffect } from 'react';
import LoginSignup from './components/LoginSignup';
import OnboardingSurvey from './components/OnboardingSurvey';
import Dashboard from './components/Dashboard';
import {
  getCurrentUser,
  setCurrentUser,
  getUserProfile,
  saveUserProfile,
  getActivities,
  saveActivities,
  getSleepMode,
  setSleepMode,
  isOnboardingComplete,
  setOnboardingComplete,
  logout,
  getRedeemedCoupons,
  addRedeemedCoupon,
  markCouponAsUsed,
  getRewardsData,
  saveRewardsData,
} from './utils/storage';
import { calculateActivityEmissions } from './utils/carbonCalculator';
import { calculateStreakAndPoints } from './utils/rewardsCalculator';

function App() {
  const [currentUser, setCurrentUserState] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [activities, setActivities] = useState([]);
  const [sleepMode, setSleepModeState] = useState(false);
  const [rewardsData, setRewardsData] = useState({ currentStreak: 0, longestStreak: 0, totalPoints: 0, spentPoints: 0 });
  const [redeemedCoupons, setRedeemedCoupons] = useState([]);

  // Check authentication on mount
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      handleLogin(user);
    }
  }, []);

  // Calculate rewards whenever activities change
  useEffect(() => {
    if (currentUser && activities.length > 0) {
      const calculated = calculateStreakAndPoints(activities);
      const storedRewards = getRewardsData(currentUser);

      // Update rewards data with calculated values but keep spent points
      const updatedRewards = {
        currentStreak: calculated.currentStreak,
        longestStreak: Math.max(calculated.longestStreak, storedRewards.longestStreak),
        totalPoints: calculated.totalPoints,
        spentPoints: storedRewards.spentPoints || 0,
      };

      setRewardsData(updatedRewards);
      saveRewardsData(currentUser, updatedRewards);
    }
  }, [activities, currentUser]);

  const handleLogin = (username) => {
    setCurrentUser(username);
    setCurrentUserState(username);

    // Load user data
    const profile = getUserProfile(username);
    const storedActivities = getActivities(username);
    const storedSleepMode = getSleepMode(username);
    const onboardingComplete = isOnboardingComplete(username);
    const storedCoupons = getRedeemedCoupons(username);
    const storedRewards = getRewardsData(username);

    if (profile) setUserProfile(profile);
    setActivities(storedActivities);
    setSleepModeState(storedSleepMode);
    setShowOnboarding(!onboardingComplete);
    setRedeemedCoupons(storedCoupons);
    setRewardsData(storedRewards);
  };

  const handleLogout = () => {
    logout();
    setCurrentUserState(null);
    setUserProfile(null);
    setActivities([]);
    setSleepModeState(false);
    setShowOnboarding(false);
    setRedeemedCoupons([]);
    setRewardsData({ currentStreak: 0, longestStreak: 0, totalPoints: 0, spentPoints: 0 });
  };

  const handleOnboardingComplete = (profile) => {
    setUserProfile(profile);
    saveUserProfile(currentUser, profile);
    setOnboardingComplete(currentUser, true);
    setShowOnboarding(false);
  };

  const handleAddActivity = (activity) => {
    if (sleepMode) return; // Don't add activities in sleep mode

    const newActivity = {
      ...activity,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      emissions: calculateActivityEmissions(activity),
    };

    const updatedActivities = [...activities, newActivity];
    setActivities(updatedActivities);
    saveActivities(currentUser, updatedActivities);
  };

  const handleToggleSleepMode = () => {
    const newSleepMode = !sleepMode;
    setSleepModeState(newSleepMode);
    setSleepMode(currentUser, newSleepMode);
  };

  const handleRedeemCoupon = (pointsCost, coupon) => {
    // Update rewards data
    const updatedRewards = {
      ...rewardsData,
      spentPoints: rewardsData.spentPoints + pointsCost,
    };
    setRewardsData(updatedRewards);
    saveRewardsData(currentUser, updatedRewards);

    // Add redeemed coupon
    addRedeemedCoupon(currentUser, coupon);
    setRedeemedCoupons([...redeemedCoupons, coupon]);
  };

  const handleMarkCouponAsUsed = (couponId) => {
    markCouponAsUsed(currentUser, couponId);
    const updatedCoupons = redeemedCoupons.map(c =>
      c.id === couponId ? { ...c, used: true } : c
    );
    setRedeemedCoupons(updatedCoupons);
  };

  // Show login if no user is authenticated
  if (!currentUser) {
    return <LoginSignup onLogin={handleLogin} />;
  }

  // Show onboarding if user hasn't completed it
  if (showOnboarding) {
    return <OnboardingSurvey onComplete={handleOnboardingComplete} />;
  }

  // Show dashboard
  return (
    <Dashboard
      activities={activities}
      onAddActivity={handleAddActivity}
      sleepMode={sleepMode}
      onToggleSleepMode={handleToggleSleepMode}
      onLogout={handleLogout}
      username={currentUser}
      rewardsData={rewardsData}
      redeemedCoupons={redeemedCoupons}
      onRedeemCoupon={handleRedeemCoupon}
      onMarkCouponAsUsed={handleMarkCouponAsUsed}
    />
  );
}

export default App;
