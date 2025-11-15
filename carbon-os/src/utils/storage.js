// LocalStorage utility functions for CarbonOS

// Get user-specific storage key
const getUserKey = (username, key) => `carbonos_${username}_${key}`;

const STORAGE_KEYS = {
  USERS: 'carbonos_users',
  CURRENT_USER: 'carbonos_current_user',
  USER_PROFILE: 'user_profile',
  ACTIVITIES: 'activities',
  ACHIEVEMENTS: 'achievements',
  SLEEP_MODE: 'sleep_mode',
  ONBOARDING_COMPLETE: 'onboarding_complete',
};

/**
 * Set current logged in user
 */
export function setCurrentUser(username) {
  try {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, username);
    return true;
  } catch (error) {
    console.error('Error setting current user:', error);
    return false;
  }
}

/**
 * Get current logged in user
 */
export function getCurrentUser() {
  try {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

/**
 * Logout current user
 */
export function logout() {
  try {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    return true;
  } catch (error) {
    console.error('Error logging out:', error);
    return false;
  }
}

/**
 * Save user profile data
 */
export function saveUserProfile(username, profile) {
  try {
    const key = getUserKey(username, STORAGE_KEYS.USER_PROFILE);
    localStorage.setItem(key, JSON.stringify(profile));
    return true;
  } catch (error) {
    console.error('Error saving user profile:', error);
    return false;
  }
}

/**
 * Get user profile data
 */
export function getUserProfile(username) {
  try {
    const key = getUserKey(username, STORAGE_KEYS.USER_PROFILE);
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading user profile:', error);
    return null;
  }
}

/**
 * Save activities
 */
export function saveActivities(username, activities) {
  try {
    const key = getUserKey(username, STORAGE_KEYS.ACTIVITIES);
    localStorage.setItem(key, JSON.stringify(activities));
    return true;
  } catch (error) {
    console.error('Error saving activities:', error);
    return false;
  }
}

/**
 * Get activities
 */
export function getActivities(username) {
  try {
    const key = getUserKey(username, STORAGE_KEYS.ACTIVITIES);
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading activities:', error);
    return [];
  }
}

/**
 * Add a new activity
 */
export function addActivity(username, activity) {
  const activities = getActivities(username);
  activities.push({
    ...activity,
    id: Date.now(),
    timestamp: new Date().toISOString(),
  });
  return saveActivities(username, activities);
}

/**
 * Save achievements
 */
export function saveAchievements(username, achievements) {
  try {
    const key = getUserKey(username, STORAGE_KEYS.ACHIEVEMENTS);
    localStorage.setItem(key, JSON.stringify(achievements));
    return true;
  } catch (error) {
    console.error('Error saving achievements:', error);
    return false;
  }
}

/**
 * Get achievements
 */
export function getAchievements(username) {
  try {
    const key = getUserKey(username, STORAGE_KEYS.ACHIEVEMENTS);
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading achievements:', error);
    return [];
  }
}

/**
 * Set sleep mode status
 */
export function setSleepMode(username, isActive) {
  try {
    const key = getUserKey(username, STORAGE_KEYS.SLEEP_MODE);
    localStorage.setItem(key, JSON.stringify(isActive));
    return true;
  } catch (error) {
    console.error('Error setting sleep mode:', error);
    return false;
  }
}

/**
 * Get sleep mode status
 */
export function getSleepMode(username) {
  try {
    const key = getUserKey(username, STORAGE_KEYS.SLEEP_MODE);
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : false;
  } catch (error) {
    console.error('Error loading sleep mode:', error);
    return false;
  }
}

/**
 * Set onboarding completion status
 */
export function setOnboardingComplete(username, isComplete) {
  try {
    const key = getUserKey(username, STORAGE_KEYS.ONBOARDING_COMPLETE);
    localStorage.setItem(key, JSON.stringify(isComplete));
    return true;
  } catch (error) {
    console.error('Error setting onboarding status:', error);
    return false;
  }
}

/**
 * Check if onboarding is complete
 */
export function isOnboardingComplete(username) {
  try {
    const key = getUserKey(username, STORAGE_KEYS.ONBOARDING_COMPLETE);
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : false;
  } catch (error) {
    console.error('Error checking onboarding status:', error);
    return false;
  }
}

/**
 * Clear all app data for a user
 */
export function clearAllData(username) {
  try {
    const keys = [
      STORAGE_KEYS.USER_PROFILE,
      STORAGE_KEYS.ACTIVITIES,
      STORAGE_KEYS.ACHIEVEMENTS,
      STORAGE_KEYS.SLEEP_MODE,
      STORAGE_KEYS.ONBOARDING_COMPLETE,
    ];
    keys.forEach(key => {
      localStorage.removeItem(getUserKey(username, key));
    });
    return true;
  } catch (error) {
    console.error('Error clearing data:', error);
    return false;
  }
}
