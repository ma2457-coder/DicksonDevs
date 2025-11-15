// LocalStorage utility functions for CarbonOS

const STORAGE_KEYS = {
  USER_PROFILE: 'carbonos_user_profile',
  ACTIVITIES: 'carbonos_activities',
  ACHIEVEMENTS: 'carbonos_achievements',
  SLEEP_MODE: 'carbonos_sleep_mode',
  ONBOARDING_COMPLETE: 'carbonos_onboarding_complete',
};

/**
 * Save user profile data
 */
export function saveUserProfile(profile) {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
    return true;
  } catch (error) {
    console.error('Error saving user profile:', error);
    return false;
  }
}

/**
 * Get user profile data
 */
export function getUserProfile() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading user profile:', error);
    return null;
  }
}

/**
 * Save activities
 */
export function saveActivities(activities) {
  try {
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
    return true;
  } catch (error) {
    console.error('Error saving activities:', error);
    return false;
  }
}

/**
 * Get activities
 */
export function getActivities() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading activities:', error);
    return [];
  }
}

/**
 * Add a new activity
 */
export function addActivity(activity) {
  const activities = getActivities();
  activities.push({
    ...activity,
    id: Date.now(),
    timestamp: new Date().toISOString(),
  });
  return saveActivities(activities);
}

/**
 * Save achievements
 */
export function saveAchievements(achievements) {
  try {
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
    return true;
  } catch (error) {
    console.error('Error saving achievements:', error);
    return false;
  }
}

/**
 * Get achievements
 */
export function getAchievements() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading achievements:', error);
    return [];
  }
}

/**
 * Set sleep mode status
 */
export function setSleepMode(isActive) {
  try {
    localStorage.setItem(STORAGE_KEYS.SLEEP_MODE, JSON.stringify(isActive));
    return true;
  } catch (error) {
    console.error('Error setting sleep mode:', error);
    return false;
  }
}

/**
 * Get sleep mode status
 */
export function getSleepMode() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SLEEP_MODE);
    return data ? JSON.parse(data) : false;
  } catch (error) {
    console.error('Error loading sleep mode:', error);
    return false;
  }
}

/**
 * Set onboarding completion status
 */
export function setOnboardingComplete(isComplete) {
  try {
    localStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETE, JSON.stringify(isComplete));
    return true;
  } catch (error) {
    console.error('Error setting onboarding status:', error);
    return false;
  }
}

/**
 * Check if onboarding is complete
 */
export function isOnboardingComplete() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETE);
    return data ? JSON.parse(data) : false;
  } catch (error) {
    console.error('Error checking onboarding status:', error);
    return false;
  }
}

/**
 * Clear all app data
 */
export function clearAllData() {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Error clearing data:', error);
    return false;
  }
}
