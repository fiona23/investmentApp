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

### Code Quality

- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Run ESLint with auto-fix
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting

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
- **React Navigation** - Navigation library
- **ESLint + Prettier** - Code quality and formatting
- **Husky** - Git hooks for code quality

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
3. Check code quality: `pnpm lint`
4. Format code: `pnpm format`
5. Test your changes on different platforms
6. Submit a pull request

## Development Tools

### Code Quality

- ESLint for code linting with TypeScript support
- Prettier for code formatting
- Husky for pre-commit hooks that run linting and formatting

## License

This project is licensed under the MIT License.
