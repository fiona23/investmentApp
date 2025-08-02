# Cushon ISA Investment App

A React Native application built with Expo and TypeScript for managing ISA (Individual Savings Account) investments. This app allows users to browse funds, make investments, and track their portfolio.

## 🛠️ Technologies Used

- **React Native** - Mobile app framework
- **Expo** - Development platform and tooling
- **TypeScript** - Type-safe JavaScript development
- **React Navigation** - Navigation library with tab and stack navigators
- **React Native Paper** - Material Design component library
- **Zustand** - Lightweight state management
- **AsyncStorage** - Local data persistence
- **React Query** - Data fetching and caching (for mock APIs)
- **Jest + React Native Testing Library** - Testing framework
- **ESLint + Prettier** - Code quality and formatting
- **Husky** - Git hooks for code quality

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm package manager
- Expo CLI (optional, for development)

### Installation

1. **Install pnpm** (if not already installed):

```bash
npm install -g pnpm
```

2. **Install dependencies**:

```bash
pnpm install
```

3. **Start the development server**:

```bash
pnpm start
```

## 📋 Available Commands

### Development

- `pnpm start` - Start the development server
- `pnpm android` - Run on Android emulator/device
- `pnpm ios` - Run on iOS simulator/device
- `pnpm web` - Run in web browser

### Testing

- `pnpm test` - Run all tests
- `pnpm test --watch` - Run tests in watch mode
- `pnpm test --coverage` - Run tests with coverage

### Code Quality

- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Run ESLint with auto-fix
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting

## 🎯 User Journey

1. **First Launch**: Empty state with option to browse funds
2. **Fund Browsing**: View available funds with performance data
3. **Fund Selection**: Detailed fund information and investment option
4. **Investment Process**: Amount input with ISA validation
5. **Confirmation**: Review investment details and confirm
6. **Success**: Success feedback and navigation to account
7. **Portfolio Management**: View investments and transaction history

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
