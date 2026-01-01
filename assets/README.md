# Assets Directory

This directory contains all static assets for the Habit Tracker app.

## Directory Structure

```
assets/
├── images/           # App icons, splash screens, etc.
│   └── Contents.json # Image asset metadata
├── fonts/            # Custom fonts (optional)
├── icons/            # Custom icon assets
├── sounds/           # Notification sounds (adhan, etc.)
└── index.ts          # Asset exports
```

## Required Assets

### App Icons
- `icon.png` - 1024x1024px app icon
- `adaptive-icon.png` - 1024x1024px adaptive icon (Android)
- `splash.png` - Splash screen image

### Recommended Sizes
| Asset | iOS | Android |
|-------|-----|---------|
| App Icon | 1024x1024 | 1024x1024 |
| Adaptive Icon | - | 1024x1024 |
| Splash | 1242x2688 | 1080x1920 |

## Design Guidelines

- Use **#f48c25** (Islamic Orange) as primary brand color
- Keep icons simple and recognizable
- Include Islamic-themed elements where appropriate (crescent moon, mosque silhouette, etc.)

## Creating Icons

You can use [Figma](https://figma.com), [Canva](https://canva.com), or any design tool to create icons.

For generating multiple sizes, use:
- [App Icon Generator](https://appicon.co/)
- [Expo App Icon](https://docs.expo.dev/develop/user-interface/app-icons/)
