# 🕌 Habit Tracker

A beautiful, Islamic-oriented habit tracking app built with **React Native**, **Expo Router**, and **NativeWind**. Track your daily prayers, nutrition, work focus sessions, and expenses — all in one place.

---

## 📸 Features

| Feature | Description |
|---------|-------------|
| 🕌 **Prayer Tracker** | Track all 5 daily prayers with reminders and completion status |
| 🍎 **Nutrition Tracker** | Log meals, track calories, and monitor fasting |
| 💼 **Work / Pomodoro** | Focus sessions with configurable timers and break tracking |
| 💰 **Expense Tracker** | Income & expense logging with category budgets |
| 📊 **Progress & Insights** | Unified dashboard with streaks, heatmaps, and AI insights |
| 🎨 **Theme Switcher** | 9 beautiful color themes (Clean, Sunset, Ocean, Forest, etc.) |

---

## 🏗️ Project Structure

```
habitTracker/
├── app/                        # 📱 Expo Router screens (file-based routing)
│   ├── _layout.tsx             #   Root layout (providers, stack config)
│   ├── index.tsx               #   Entry redirect
│   ├── (tabs)/                 #   Tab navigator group
│   │   ├── _layout.tsx         #     Tab bar configuration
│   │   ├── index.tsx           #     🏠 Home dashboard
│   │   ├── prayer.tsx          #     🕌 Prayer tracker
│   │   ├── nutrition.tsx       #     🍎 Nutrition tracker
│   │   ├── work.tsx            #     💼 Work / Pomodoro
│   │   └── expense.tsx         #     💰 Expense tracker
│   ├── (onboarding)/           #   Onboarding flow
│   ├── prayer-setup/           #   Prayer configuration screens
│   ├── prayer-actions/         #   Doa, Dzikir, Qibla, Jadwal
│   ├── settings.tsx            #   ⚙️ Settings screen
│   ├── progress.tsx            #   📊 Progress & insights
│   └── islamic-home.tsx        #   Islamic home variant
│
├── components/                 # 🧩 Reusable UI components
│   ├── index.ts                #   Barrel export
│   ├── ThemeSwitcher.tsx       #   Floating theme picker (FAB + modal)
│   ├── ui/                     #   Generic, app-agnostic UI primitives
│   │   ├── Avatar.tsx
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Divider.tsx
│   │   ├── IconButton.tsx
│   │   ├── Input.tsx
│   │   ├── ListItem.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── ProgressRing.tsx    #   SVG circular progress indicator
│   │   └── index.ts
│   ├── home/                   #   Components specific to the Home screen
│   │   ├── ActivePrayerCard.tsx
│   │   ├── UpcomingPrayerCard.tsx
│   │   ├── QuickStatCard.tsx
│   │   ├── ActivityItem.tsx
│   │   └── index.ts
│   ├── prayer/                 #   Prayer feature components
│   │   ├── PrayerCard.tsx
│   │   ├── PrayerList.tsx
│   │   └── index.ts
│   └── islamic/                #   Islamic-themed widgets
│       ├── CompassWidget.tsx
│       ├── FeatureCard.tsx
│       ├── HeadingSection.tsx
│       ├── NewsCard.tsx
│       ├── BottomNavigation.tsx
│       └── index.ts
│
├── hooks/                      # 🪝 Custom React hooks
│   ├── index.ts                #   Barrel export
│   ├── useStorage.ts           #   AsyncStorage wrapper with loading state
│   ├── useTheme.ts             #   Quick access to static theme config
│   ├── usePrayerTracker.ts     #   Prayer state, toggles, stats, carousel logic
│   └── useTabNavigator.ts      #   Type-safe tab navigation helper
│
├── constants/                  # 📌 App-wide constants & mock data
│   ├── index.ts                #   Barrel export
│   └── home.ts                 #   Initial prayers, activities, stat defaults
│
├── config/                     # ⚙️ Static configuration
│   ├── index.ts                #   Barrel export
│   ├── app.ts                  #   Feature flags, default values, limits
│   ├── colors.ts               #   Color palette (primary, secondary, status, etc.)
│   └── theme.ts                #   Unified theme object (spacing, radius, shadows)
│
├── lib/                        # 🔧 Core utilities & providers
│   ├── index.ts                #   Barrel export
│   ├── ThemeContext.tsx         #   React Context for runtime theme switching
│   ├── storage.ts              #   Low-level AsyncStorage helpers
│   └── utils.ts                #   Date, currency, time formatting helpers
│
├── services/                   # 🔌 Data / business logic layer
│   ├── index.ts                #   Barrel export
│   ├── prayer.service.ts       #   CRUD for prayer data
│   ├── nutrition.service.ts    #   CRUD for meals & daily nutrition
│   ├── work.service.ts         #   CRUD for work sessions & pomodoro state
│   └── expense.service.ts      #   CRUD for transactions & budgets
│
├── types/                      # 📝 TypeScript type definitions
│   └── index.ts                #   ALL shared types (single source of truth)
│
├── assets/                     # 🖼️ Static assets (icons, splash, etc.)
│   └── images/
│
├── design/                     # 🎨 Design reference screens (Figma exports)
│
├── app.json                    # Expo app manifest
├── babel.config.js             # Babel config (NativeWind preset)
├── metro.config.js             # Metro bundler config
├── tailwind.config.js          # Tailwind / NativeWind config
├── tailwind.colors.js          # Bridge: maps config/colors.ts → Tailwind
├── tsconfig.json               # TypeScript config (path aliases)
├── global.css                  # Tailwind directives
└── package.json                # Dependencies & scripts
```

---

## 🧱 Architecture Principles

### Layered Architecture

```
┌─────────────────────────────────────────────┐
│                   Screens                    │  app/**/*.tsx
│              (Expo Router pages)             │  Thin — compose components + hooks
├─────────────────────────────────────────────┤
│                 Components                   │  components/**/*.tsx
│           (UI building blocks)               │  Reusable, stateless where possible
├─────────────────────────────────────────────┤
│                   Hooks                      │  hooks/*.ts
│        (State management & logic)            │  Business logic, side effects
├─────────────────────────────────────────────┤
│                 Services                     │  services/*.ts
│          (Data access layer)                 │  AsyncStorage CRUD, API calls
├─────────────────────────────────────────────┤
│            Types / Config / Lib              │  types/, config/, lib/
│         (Foundation & contracts)             │  Shared types, colors, utils
└─────────────────────────────────────────────┘
```

### Key Rules

1. **Screens are thin** — Pages in `app/` should compose components and hooks. No business logic or heavy styling inline.

2. **Components are self-contained** — Each component lives in its own file with co-located styles (`StyleSheet.create`). Props are typed with explicit interfaces.

3. **Hooks own the logic** — State management, derived computations, and side effects belong in custom hooks under `hooks/`.

4. **Services own the data** — All AsyncStorage reads/writes go through `services/`. Screens and hooks never call `AsyncStorage` directly.

5. **Types are centralised** — `types/index.ts` is the **single source of truth** for all shared interfaces. Domain-specific internal types can live next to their file, but anything used across modules must be here.

6. **Constants are separate from config** — `config/` holds static settings and theming. `constants/` holds mock data, initial values, and enums that may change per-screen.

7. **Barrel exports everywhere** — Every folder has an `index.ts` that re-exports its public API. Import from the folder, not the file:
   ```ts
   // ✅ Good
   import { usePrayerTracker } from '@/hooks';
   import { ActivePrayerCard } from '@/components/home';

   // ❌ Avoid
   import { usePrayerTracker } from '@/hooks/usePrayerTracker';
   ```

---

## 🎨 Theming

The app supports **runtime theme switching** via `ThemeContext`:

| Theme | Primary Color | Style |
|-------|--------------|-------|
| 🤍 Clean (default) | `#3B82F6` Blue | White background, minimal |
| 🌅 Sunset | `#f48c25` Orange | Warm gradients |
| 🌊 Ocean | `#0ea5e9` Sky | Cool blue tones |
| 🌲 Forest | `#22c55e` Green | Nature-inspired |
| 💜 Lavender | `#a855f7` Purple | Soft and calm |
| 🌹 Rose | `#f43f5e` Pink | Bold and vibrant |
| 🌙 Midnight | `#6366f1` Indigo | Deep and focused |
| 💎 Emerald | `#10b981` Teal | Fresh and clean |
| 🔥 Coral | `#fb923c` Orange | Energetic |

**How it works:**
- `config/colors.ts` defines the static Tailwind color palette.
- `lib/ThemeContext.tsx` provides runtime theme state via React Context.
- `tailwind.colors.js` bridges `config/colors.ts` → `tailwind.config.js`.
- Components read `theme.primary`, `theme.gradient`, etc. from the context.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **Expo CLI** — `npm install -g expo-cli`
- **iOS Simulator** or **Android Emulator** (or Expo Go on a physical device)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd habitTracker

# Install dependencies
npm install

# Start the development server
npx expo start
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npx expo start` | Start Expo dev server |
| `npx expo start --ios` | Start on iOS simulator |
| `npx expo start --android` | Start on Android emulator |
| `npx expo start --web` | Start in web browser |

---

## 📁 Import Aliases

Configured in `tsconfig.json`:

| Alias | Path |
|-------|------|
| `@/` | `./` (project root) |
| `@/components` | `./components` |
| `@/hooks` | `./hooks` |
| `@/lib` | `./lib` |
| `@/config` | `./config` |
| `@/services` | `./services` |
| `@/types` | `./types` |
| `@/constants` | `./constants` |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| [React Native](https://reactnative.dev/) | Cross-platform mobile framework |
| [Expo](https://expo.dev/) | Build toolchain & runtime |
| [Expo Router](https://docs.expo.dev/router/introduction/) | File-based navigation |
| [NativeWind](https://www.nativewind.dev/) | Tailwind CSS for React Native |
| [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) | Smooth animations |
| [React Native SVG](https://github.com/software-mansion/react-native-svg) | SVG rendering (progress rings, charts) |
| [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) | Local data persistence |
| [Expo Linear Gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/) | Gradient backgrounds |
| TypeScript | Type safety across the codebase |

---

## 📄 License

This project is private and not licensed for public distribution.