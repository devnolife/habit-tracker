# 🕌 Habit Tracker - Islamic Lifestyle App

<div align="center">
  
  **A comprehensive Islamic lifestyle companion app for tracking prayers, expenses, nutrition, and productivity.**
  
  [![React Native](https://img.shields.io/badge/React%20Native-0.76-blue.svg)](https://reactnative.dev/)
  [![Expo](https://img.shields.io/badge/Expo-SDK%2053-black.svg)](https://expo.dev/)
  [![HeroUI Native](https://img.shields.io/badge/HeroUI-Native-orange.svg)](https://heroui.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
</div>

---

## ✨ Features

### 🕌 Prayer Tracker (Sholat)
- **5 Daily Prayers** - Track Fajr, Dhuhr, Asr, Maghrib, and Isya
- **Prayer Times** - Accurate prayer times based on location
- **Jamaah Tracking** - Mark prayers done in congregation
- **Streak Counter** - Build and maintain your prayer streak
- **Adhan Reminders** - Get notified before each prayer

### 💰 Expense Tracker (Pengeluaran)
- **Budget Management** - Set monthly spending limits
- **Category Tracking** - Organize expenses by category
- **Income/Expense** - Track both income and expenses
- **Zakat Calculator** - Calculate and track zakat obligations
- **Visual Insights** - Charts and analytics for spending

### 🍎 Nutrition Tracker (Makanan)
- **Calorie Counter** - Track daily caloric intake
- **Macronutrients** - Monitor carbs, protein, and fat
- **Meal Logging** - Log breakfast, lunch, dinner, and snacks
- **Water Intake** - Track daily water consumption
- **Halal Focus** - Built with Islamic dietary considerations

### 💼 Work & Productivity Tracker
- **Pomodoro Timer** - Focus sessions with breaks
- **Task Management** - Create and organize tasks
- **Focus Score** - Track your productivity level
- **Time Tracking** - Log hours spent working
- **Project Categories** - Organize by work type

---

## 🛠️ Tech Stack

| Technology | Description |
|------------|-------------|
| **[Expo](https://expo.dev/)** | Universal React Native platform |
| **[React Native](https://reactnative.dev/)** | Cross-platform mobile development |
| **[HeroUI Native](https://heroui.dev/)** | Beautiful, fast UI components |
| **[Expo Router](https://docs.expo.dev/router/)** | File-based navigation |
| **[React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)** | Animations |
| **[TypeScript](https://www.typescriptlang.org/)** | Type-safe JavaScript |

---

## 📁 Project Structure

```
habit-tracker/
├── app/                          # Expo Router pages
│   ├── (tabs)/                   # Main tab navigation
│   │   ├── index.tsx             # Home dashboard
│   │   ├── prayer.tsx            # Prayer tracker
│   │   ├── expense.tsx           # Expense tracker
│   │   ├── nutrition.tsx         # Nutrition tracker
│   │   └── work.tsx              # Work tracker
│   ├── (onboarding)/             # Onboarding flow
│   │   ├── index.tsx             # Welcome screen
│   │   ├── prayer.tsx            # Prayer setup
│   │   ├── expense.tsx           # Expense setup
│   │   └── ready.tsx             # Setup complete
│   ├── _layout.tsx               # Root layout
│   └── index.tsx                 # Entry redirect
├── src/
│   ├── components/               # Reusable components
│   │   ├── home/                 # Home screen components
│   │   ├── prayer/               # Prayer components
│   │   ├── expense/              # Expense components
│   │   ├── nutrition/            # Nutrition components
│   │   └── work/                 # Work components
│   ├── constants/                # App constants
│   ├── hooks/                    # Custom hooks
│   ├── types/                    # TypeScript types
│   └── utils/                    # Utility functions
├── assets/                       # Images, fonts, etc.
├── design/                       # UI/UX design files (HTML mockups)
├── app.json                      # Expo config
├── babel.config.js               # Babel config
├── global.css                    # Global styles (Tailwind/Uniwind)
├── metro.config.js               # Metro bundler config
├── package.json                  # Dependencies
└── tsconfig.json                 # TypeScript config
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ 
- **npm** or **yarn** or **pnpm**
- **Expo CLI** (optional, but recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/devnolife/habit-tracker.git
   cd habit-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on device/simulator**
   - Press `a` for Android emulator
   - Press `i` for iOS simulator
   - Scan QR code with Expo Go app for physical device

### Build Commands

```bash
# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on Web
npm run web
```

---

## 🎨 Design System

### Colors

| Module | Primary Color | Usage |
|--------|---------------|-------|
| **Prayer** | `#22c55e` (Green) | Success, prayer-related |
| **Expense** | `#f48c25` (Orange) | Brand, expense-related |
| **Nutrition** | `#84cc16` (Lime) | Food, health-related |
| **Work** | `#3b82f6` (Blue) | Productivity, work-related |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/devnolife">devnolife</a></p>
  <p>بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
</div>
