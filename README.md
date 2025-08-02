# Investment App

A React Native application built with Expo and TypeScript for investment management.

## Getting Started

This project uses pnpm as the package manager. Make sure you have pnpm installed:

```bash
npm install -g pnpm
```

## Installation

Install dependencies:

```bash
pnpm install
```

## Available Commands

### Development

- `pnpm start` - Start the development server
- `pnpm android` - Run on Android emulator/device
- `pnpm ios` - Run on iOS simulator/device
- `pnpm web` - Run in web browser

### Package Management

- `pnpm install` - Install dependencies
- `pnpm add <package>` - Add a new dependency
- `pnpm add -D <package>` - Add a new dev dependency
- `pnpm remove <package>` - Remove a dependency
- `pnpm update` - Update dependencies

## Project Structure

```
investmentApp/
├── App.tsx              # Main application component
├── index.ts             # Entry point
├── tsconfig.json        # TypeScript configuration
├── package.json         # Dependencies and scripts
├── app.json            # Expo configuration
├── assets/             # Images and other assets
└── node_modules/       # Dependencies (generated)
```

## Technologies Used

- **React Native** - Mobile app framework
- **Expo** - Development platform
- **TypeScript** - Type-safe JavaScript
- **pnpm** - Fast, disk space efficient package manager

## Development

1. Start the development server: `pnpm start`
2. Use Expo Go app on your device to scan the QR code
3. Or run on specific platforms:
   - Android: `pnpm android`
   - iOS: `pnpm ios`
   - Web: `pnpm web`

## Contributing

1. Install dependencies: `pnpm install`
2. Make your changes
3. Test your changes on different platforms
4. Submit a pull request

## License

This project is licensed under the MIT License.
