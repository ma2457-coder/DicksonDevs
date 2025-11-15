# CarbonOS 🌱

**Personal Carbon Footprint Tracker with Sustainability Rewards**

CarbonOS is a comprehensive web application that helps users track their daily carbon emissions, build sustainable habits through gamification, and earn rewards redeemable at local eco-friendly businesses. Built for the hackathon, CarbonOS combines real-time carbon tracking with a innovative rewards marketplace to drive meaningful environmental impact.

[**Live Demo →**](https://dicksondevs-16cv-5dqrul9ks-tanays-projects-3adf907b.vercel.app/)

---

## 🌟 Features

### 📊 Carbon Footprint Tracking
- **Multi-category tracking**: Transportation, shopping, and energy usage
- **Real-time CO₂ calculations** using standard emission factors
- **Activity logging** with manual entry and timestamps
- **Sleep mode** to pause tracking when needed
- **Persistent data** stored locally per user account

### 📈 Analytics & Insights
- **Daily, weekly, and monthly** emission reports
- **Visual dashboards** with interactive charts (Recharts)
- **Comparison to national averages** (US baseline: 44 kg CO₂/day)
- **Emissions breakdown** by category (pie charts, line graphs)
- **Personalized tips** based on your activity patterns

### 🎯 Gamification & Rewards
- **Streak system**: Earn 2-10 points per day for maintaining low carbon footprint
- **Achievement badges**: Unlock rewards for eco-friendly milestones
- **Points accumulation** based on consecutive low-emission days
- **Beautiful points widget** displaying streak and total points

### 🛍️ Sustainability Rewards Marketplace
- **6 sample local businesses** (Green Thread Clothing, Sprout Cafe, EcoCycle Bike Shop, etc.)
- **Tiered coupon system**: Redeem 15-100 points for 10-30% discounts
- **Category filters**: Fashion, Food, Transport, Household
- **Business sustainability badges** and eco-credentials
- **QR code generation** for in-store redemption
- **30-day coupon validity** with expiration tracking

### 🎟️ My Coupons Wallet
- **Organized coupon management**: Active, Used, and Expired sections
- **QR code display** for easy checkout scanning
- **Expiration countdown timers**
- **One-tap "Mark as Used"** functionality
- **Coupon statistics** dashboard

### 🏪 For Businesses Portal
- **Partnership benefits** showcase
- **Business signup form** for sustainable companies
- **How-it-works** guide for merchants
- **Sample success metrics** and testimonials

### 👥 Multi-User Support
- **User authentication** with login/signup
- **Separate accounts** with isolated data
- **Persistent sessions** across page reloads
- **Secure password storage** (localStorage-based for demo)

### 🏆 Global Leaderboard
- **Compete with other users** on carbon reduction
- **Real-time rankings** based on emissions
- **Community engagement** features

---

## 🛠️ Tech Stack

**Frontend:**
- ⚛️ **React 18** - UI framework
- ⚡ **Vite** - Build tool and dev server
- 🎨 **Tailwind CSS** - Utility-first styling
- 📊 **Recharts** - Data visualization
- 🎯 **Lucide React** - Icon library
- 📱 **QRCode.react** - QR code generation

**State Management:**
- `useState` and `useEffect` hooks
- localStorage API for persistence

**Deployment:**
- 🚀 **Vercel** - Hosting and CI/CD

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+ and npm
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ma2457-coder/DicksonDevs.git
cd DicksonDevs/carbon-os
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```
carbon-os/
├── src/
│   ├── components/
│   │   ├── ActivityLogger.jsx      # Activity input modal
│   │   ├── Charts.jsx              # Data visualization
│   │   ├── Dashboard.jsx           # Main app layout
│   │   ├── ForBusinesses.jsx       # Business partnership page
│   │   ├── Insights.jsx            # Tips and achievements
│   │   ├── Leaderboard.jsx         # Global rankings
│   │   ├── LoginSignup.jsx         # Authentication
│   │   ├── MetricsCard.jsx         # Dashboard stat cards
│   │   ├── MyCoupons.jsx           # Coupon wallet
│   │   ├── OnboardingSurvey.jsx    # New user setup
│   │   ├── PointsWidget.jsx        # Streak/points display
│   │   └── RewardsMarketplace.jsx  # Business listings
│   ├── utils/
│   │   ├── carbonCalculator.js     # Emission calculations
│   │   ├── rewardsCalculator.js    # Points & streak logic
│   │   └── storage.js              # localStorage utilities
│   ├── App.jsx                     # Main app component
│   ├── index.css                   # Global styles
│   └── main.jsx                    # App entry point
├── public/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json                     # Deployment config
└── CLAUDE.md                       # AI development guide
```

---

## 🎮 How to Use

### 1. **Create an Account**
- Sign up with a username and password
- Complete the 5-step onboarding survey

### 2. **Log Your Activities**
- Click **"Log Activity"** button
- Choose category: Transportation, Shopping, or Energy
- Enter distance (for transport) or hours (for energy)
- Emissions calculated automatically

### 3. **Track Your Progress**
- View daily/weekly/monthly emissions on Dashboard
- Compare against national average
- See breakdown by category

### 4. **Earn Rewards**
- Maintain emissions below your weekly average
- Build streaks (2-10 points per day)
- Watch your points grow!

### 5. **Redeem Coupons**
- Browse **Rewards** marketplace
- Filter by category
- Redeem points for discounts at sustainable businesses

### 6. **Use Your Coupons**
- Check **My Coupons** for active rewards
- Show QR code at checkout
- Mark as used after redemption

---

## 🧮 Carbon Calculation

### Emission Factors (kg CO₂e)

| Category | Activity | Factor |
|----------|----------|--------|
| Transportation | Car | 0.4 kg/mile |
| Transportation | Bus | 0.1 kg/mile |
| Transportation | Train | 0.08 kg/mile |
| Transportation | Plane | 0.25 kg/mile |
| Transportation | Bike/Walk | 0 kg/mile |
| Shopping | Online delivery | 0.5 kg/package |
| Shopping | In-store trip | 0.2 kg/trip |
| Shopping | Food delivery | 0.5 kg/delivery |
| Energy | Home usage | 0.5 kg/hour |

**National Average:** 44 kg CO₂ per day (US baseline)

---

## 🏅 Points System

### Streak Rewards
- **Days 1-7:** 2 points/day
- **Days 8-30:** 5 points/day
- **Day 31+:** 10 points/day

### Qualifying Days
A day qualifies for the streak if daily emissions are **below your weekly average** and **above zero** (must log activities).

### Coupon Tiers
- **Bronze:** 10-20 points → 10% off
- **Silver:** 25-40 points → 15% off / Free items
- **Gold:** 45-100 points → 20-30% off

---

## 🌍 Sample Businesses

1. **Green Thread Clothing** - 100% organic cotton, carbon-neutral shipping
2. **Sprout Organic Cafe** - Farm-to-table, compostable packaging
3. **EcoCycle Bike Shop** - Refurbished bikes, solar-powered
4. **Refill Station** - Zero plastic, bulk refills
5. **Solar Sips Coffee** - Fair-trade, renewable energy
6. **Thrift Haven** - Second-hand fashion, circular economy

---

## 🤝 Contributing

This project was built for a hackathon. Contributions, issues, and feature requests are welcome!

---

## 📝 License

MIT License - feel free to use this project for learning and development.

---

## 🙏 Acknowledgments

- Emission factors based on EPA and IPCC standards
- Built with Claude Code (AI pair programming)
- Inspired by the need for accessible carbon tracking tools

---

## 📧 Contact

**Project Link:** [https://github.com/ma2457-coder/DicksonDevs](https://github.com/ma2457-coder/DicksonDevs)

**Live Demo:** [https://dicksondevs-16cv-5dqrul9ks-tanays-projects-3adf907b.vercel.app/](https://dicksondevs-16cv-5dqrul9ks-tanays-projects-3adf907b.vercel.app/)

---

Made with 💚 for a sustainable future
