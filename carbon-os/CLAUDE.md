# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CarbonOS is a personal carbon footprint tracking web application built for a hackathon. It monitors transportation, shopping habits, and daily activities to calculate real-time CO2 emissions and provides actionable insights to reduce environmental impact.

**Tech Stack:**
- React 18 with Vite
- Tailwind CSS for styling
- Recharts for data visualization
- Lucide React for icons
- localStorage for data persistence

## Development Commands

### Starting the App
```bash
npm run dev
```
Starts the development server at `http://localhost:5173`

### Building for Production
```bash
npm run build
```
Creates an optimized production build in the `dist/` folder

### Preview Production Build
```bash
npm run preview
```
Locally preview the production build

### Linting
```bash
npm run lint
```
Run ESLint to check code quality

## Project Architecture

### State Management
- **App.jsx**: Main application container that manages global state
  - `userProfile`: User onboarding data (transportation methods, diet, household size)
  - `activities`: Array of logged activities with timestamps and emissions
  - `sleepMode`: Boolean to pause activity tracking
  - `showOnboarding`: Controls whether to show onboarding survey or dashboard

### Data Flow
1. **Onboarding** → User completes survey → Profile saved to localStorage → Dashboard shown
2. **Activity Logging** → User logs activity → Emissions calculated → Activity saved to activities array → Charts/insights updated
3. **Sleep Mode** → User toggles sleep mode → Activity logging disabled → State persisted to localStorage

### Core Components

**OnboardingSurvey** (`src/components/OnboardingSurvey.jsx`)
- Multi-step form (5 steps) collecting user baseline data
- Validates each step before allowing progression
- Saves profile to localStorage on completion

**Dashboard** (`src/components/Dashboard.jsx`)
- Main application view after onboarding
- Contains metrics cards, charts, insights, and activity logger modal
- Supports daily/weekly/monthly view toggling
- Manages sleep mode state

**ActivityLogger** (`src/components/ActivityLogger.jsx`)
- Modal for logging new activities
- Three categories: transportation (requires distance), shopping, energy (requires hours)
- Calculates emissions on submission using `carbonCalculator.js`

**MetricsCard** (`src/components/MetricsCard.jsx`)
- Reusable card component displaying key metrics
- Shows icons, values, units, and comparisons

**Charts** (`src/components/Charts.jsx`)
- Line chart: 7-day emissions trend vs national average
- Pie chart: Emissions breakdown by category (transportation/shopping/energy)

**Insights** (`src/components/Insights.jsx`)
- Personalized tips based on emission patterns
- Achievement system with unlockable badges
- Dynamic recommendations

### Utility Functions

**carbonCalculator.js** (`src/utils/carbonCalculator.js`)
- Emission factors for all activity types
- Functions to calculate emissions per activity
- Time-based filtering (daily/weekly/monthly)
- Chart data generation
- Comparison to US national average (~44 kg CO₂/day)

**storage.js** (`src/utils/storage.js`)
- localStorage wrapper functions
- Keys: `carbonos_user_profile`, `carbonos_activities`, `carbonos_sleep_mode`, `carbonos_onboarding_complete`
- All functions include error handling

## Key Features Implementation

### Carbon Calculation
Emission factors in kg CO₂e:
- Car: 0.4/mile
- Bus: 0.1/mile
- Train: 0.08/mile
- Plane: 0.25/mile
- Online delivery: 0.5/package
- In-store trip: 0.2/trip
- Home energy: 0.5/hour

### Sleep Mode
When activated:
- Pauses activity tracking
- Disables "Log Activity" button
- Shows banner notification
- State persists across sessions

### Data Persistence
All data stored in localStorage:
- User profile from onboarding
- Complete activity history with timestamps
- Sleep mode status
- Onboarding completion flag

### Achievements System
Four achievements defined in `Insights.jsx`:
1. First Steps - Log first activity
2. Low Carbon Day - Beat national average
3. Week Warrior - 7 days of tracking
4. Eco Commuter - 5+ bike/walk trips

## Styling Approach

- Tailwind CSS utility-first approach
- Color scheme: Green (#10b981) for eco-friendly actions, Red (#ef4444) for warnings
- Responsive grid layouts (mobile-first)
- Consistent rounded corners (rounded-lg, rounded-xl)
- Shadow usage for depth (shadow-md, shadow-lg)

## Common Development Tasks

### Adding a New Activity Type
1. Update `EMISSION_FACTORS` in `carbonCalculator.js`
2. Add case in `calculateActivityEmissions()` function
3. Add option in `ActivityLogger.jsx` dropdown

### Modifying Emission Factors
Edit the `EMISSION_FACTORS` object in `src/utils/carbonCalculator.js`

### Adding New Achievement
Add object to `ACHIEVEMENTS` array in `src/components/Insights.jsx` with:
- Unique ID
- Name and description
- Icon (emoji)
- Requirement function (receives activities and comparison)

### Changing National Average
Update `NATIONAL_AVERAGE_DAILY` constant in `src/utils/carbonCalculator.js`

## Browser Requirements

- Modern browsers with ES6+ support
- localStorage must be enabled
- Recommended: Chrome, Firefox, Safari, Edge (latest versions)

## Known Limitations

- No backend - all data stored locally
- Data not synced across devices
- No user authentication
- Limited to browser's localStorage quota (~5-10MB)
- No offline support beyond cached pages
