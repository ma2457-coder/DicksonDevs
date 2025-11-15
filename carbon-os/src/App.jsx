import { useState, useEffect } from 'react';
import OnboardingSurvey from './components/OnboardingSurvey';
import Dashboard from './components/Dashboard';
import {
  getUserProfile,
  saveUserProfile,
  getActivities,
  saveActivities,
  getSleepMode,
  setSleepMode,
  isOnboardingComplete,
  setOnboardingComplete,
} from './utils/storage';
import { calculateActivityEmissions } from './utils/carbonCalculator';

function App() {
  const [showOnboarding, setShowOnboarding] = useState(!isOnboardingComplete());
  const [userProfile, setUserProfile] = useState(null);
  const [activities, setActivities] = useState([]);
  const [sleepMode, setSleepModeState] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const profile = getUserProfile();
    const storedActivities = getActivities();
    const storedSleepMode = getSleepMode();

    if (profile) setUserProfile(profile);
    if (storedActivities) setActivities(storedActivities);
    setSleepModeState(storedSleepMode);
  }, []);

  const handleOnboardingComplete = (profile) => {
    setUserProfile(profile);
    saveUserProfile(profile);
    setOnboardingComplete(true);
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
    saveActivities(updatedActivities);
  };

  const handleToggleSleepMode = () => {
    const newSleepMode = !sleepMode;
    setSleepModeState(newSleepMode);
    setSleepMode(newSleepMode);
  };

  if (showOnboarding) {
    return <OnboardingSurvey onComplete={handleOnboardingComplete} />;
  }

  return (
    <Dashboard
      activities={activities}
      onAddActivity={handleAddActivity}
      sleepMode={sleepMode}
      onToggleSleepMode={handleToggleSleepMode}
    />
  );
}

export default App;
