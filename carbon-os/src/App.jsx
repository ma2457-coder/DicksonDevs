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
} from './utils/storage';
import { calculateActivityEmissions } from './utils/carbonCalculator';

function App() {
  const [currentUser, setCurrentUserState] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [activities, setActivities] = useState([]);
  const [sleepMode, setSleepModeState] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      handleLogin(user);
    }
  }, []);

  const handleLogin = (username) => {
    setCurrentUser(username);
    setCurrentUserState(username);

    // Load user data
    const profile = getUserProfile(username);
    const storedActivities = getActivities(username);
    const storedSleepMode = getSleepMode(username);
    const onboardingComplete = isOnboardingComplete(username);

    if (profile) setUserProfile(profile);
    setActivities(storedActivities);
    setSleepModeState(storedSleepMode);
    setShowOnboarding(!onboardingComplete);
  };

  const handleLogout = () => {
    logout();
    setCurrentUserState(null);
    setUserProfile(null);
    setActivities([]);
    setSleepModeState(false);
    setShowOnboarding(false);
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
    />
  );
}

export default App;
