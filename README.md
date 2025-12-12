# AdminPro - Modern Admin Dashboard

A complete, production-ready admin dashboard built with React, TypeScript, and Tailwind CSS. Features a beautiful UI with dark mode, RTL support, and comprehensive functionality.

## Features

### Authentication
- Login page with form validation
- Register page with password confirmation
- Forgot password flow
- Mock authentication using Context API

### Dashboard Pages
- **Analytics Dashboard**: Charts and key metrics with real-time data visualization
- **Users/CRM**: User management with table, pagination, search, and filters
- **Projects/Kanban**: Project board with task cards organized by status
- **Transactions**: Invoice management with status tracking and filtering
- **Settings**: User preferences, theme settings, and notifications
- **Notifications Center**: Real-time notifications with filtering and management
- **File Manager**: Grid and list views for file organization
- **Theme Customizer**: Customize colors, fonts, and spacing
- **Calendar**: Monthly calendar view with event management

### UI Components
- **Button**: Multiple variants (primary, secondary, outline, danger) with loading states
- **Card**: Flexible container with header, title, and content sections
- **Modal**: Accessible modal dialogs with keyboard support
- **Form Inputs**: Text, select, checkbox with validation
- **Table**: Sortable columns with pagination
- **Charts**: Line, bar, and pie charts using Recharts

### Layouts
- **Sidebar Layout**: Collapsible sidebar with navigation
- **Top Navigation Layout**: Alternative layout with top navigation
- **Minimal Layout**: Clean layout for auth pages

### Features
- Dark/Light mode with persistence
- RTL (Right-to-Left) support
- Responsive design for all screen sizes
- Accessibility (ARIA attributes, keyboard navigation)
- Form validation with react-hook-form and Zod
- Global state management with Context API and useReducer
- TypeScript for type safety
- ESLint and Prettier configured
- Unit tests with Vitest and React Testing Library

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Run Tests

```bash
npm run test
```

### Format Code

```bash
npm run format
```

### Lint Code

```bash
npm run lint
```

## Project Structure

```
src/
├── assets/          # Static assets
├── components/      # Reusable UI components
│   ├── layouts/    # Layout components
│   └── __tests__/  # Component tests
├── pages/          # Page components
├── routes/         # Routing configuration
├── store/          # Global state management
├── styles/         # Global styles
└── utils/          # Utility functions
```

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **Vitest** - Testing framework
- **React Testing Library** - Component testing

## Deployment

This project is configured for Vercel deployment. Simply connect your repository to Vercel and it will automatically deploy.

## Authentication

The app uses mock authentication. Use any email and password (minimum 6 characters) to log in. The authentication state persists in memory during the session.

## Theme Customization

- Toggle between light and dark modes from the sidebar or settings
- Switch between LTR and RTL layouts
- Customize primary colors, fonts, and spacing from the Theme Customizer page

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
