# GAP Frontend

A Next.js 14 project with App Router, ready to power GAP with the latest features and best practices:

## Key Features:

- **Next.js App Router** for efficient routing and server-side rendering.
- **SEO Optimization** using Next.js's Metadata for better search engine visibility.
- **Tailwind CSS + MUI** for styling the **landing page**.
- **MUI (Material-UI) Library** for building modern, responsive dashboards.

## Project Conventions:

- **Folder Naming:** Use **lower case** for folder names. If the name consists of multiple words, use **snake_case** (e.g., `like_this`).
- **File Naming:** Use **PascalCase** for TypeScript file names (e.g., `MyComponent.tsx`).
- **Variables/Functions Naming:** Use **camelCase** for TypeScript (e.g., `firstName or getMethod`)
- **Component Structure:** Organize component folders into categories like **input**, **button**, etc.
- **Component Naming:** Prefix the name of components with **G** (e.g., `GButton.tsx`) to indicate it's a GAP-specific component and not from a framework.
- **Inline Styles:** Extract inline styles (from MUI's `sx` prop) into a TypeScript object and define them at the end of each component file.
- **Icons:** Use **MUI icons** and **react-icons**.
- **Fonts & Colors:**
  - Landing page styles are defined in **tailwind.config.ts**.
  - Dashboard styles are defined in **app/theme.ts**.

## Component Structure

The application follows a standardized component structure to ensure maintainability and scalability.

### Directory Structure

```
src/
├── components/
│   ├── ui/             # Reusable UI components
│   │   ├── button/
│   │   ├── input/
│   │   ├── card/
│   │   └── dialog/
│   ├── layout/         # Layout components
│   │   ├── header/
│   │   ├── footer/
│   │   └── sidebar/
│   ├── features/       # Feature-specific components
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── facility/
│   │   └── building/
│   ├── forms/          # Form components
│   │   ├── auth/
│   │   ├── facility/
│   │   └── building/
│   └── shared/         # Shared components
```

### Component Structure

Each component should follow this structure:

```
ComponentName/
├── index.tsx          # Main component file
├── styles.ts          # Component styles
├── types.ts           # TypeScript interfaces/types
```

### Naming Conventions

1. **Component Files:**

   - Use PascalCase for component files (e.g., `Button.tsx`)
   - Use camelCase for utility files (e.g., `styles.ts`, `types.ts`)

2. **Component Names:**

   - Prefix shared components with 'G' (e.g., `GButton`, `GInput`)
   - Use descriptive names that reflect component functionality

3. **Type Definitions:**
   - Suffix interfaces with 'Props' for component props (e.g., `ButtonProps`)
   - Use PascalCase for type names

### Example Component

```typescript
// Component index.tsx
import React from 'react';
import { styles } from './styles';
import type { ComponentProps } from './types';

export const Component: React.FC<ComponentProps> = ({ children }) => {
  return <div style={styles.root}>{children}</div>;
};

// types.ts
export interface ComponentProps {
  children: React.ReactNode;
}

// styles.ts
export const styles = {
  root: {
    // styles
  }
};
```

# components/

This folder contains all the building blocks of the UI, organized by purpose and reusability. Use the following guidelines to decide where to place your components:

## 📦 Reusable UI components (`ui/`)

Small, generic UI elements that are used across the application. These components should have no feature-specific logic.

**Examples:**

- `Button`
- `Input`
- `Card`
- `Dialog`

## 🧱 Layout components (`layout/`)

Structural components that define the layout and framework of the UI, often used at the page level.

**Examples:**

- `Header`
- `Footer`
- `Sidebar`

## 🚀 Feature-specific components (`features/`)

Components that belong to a specific domain or feature and are usually not reused elsewhere.

**Examples:**

- `AuthPanel` in `auth/`
- `FacilityCard` in `facility/`
- `DashboardStats` in `dashboard/`

## 📝 Form components (`forms/`)

Components used to handle form-related logic, including input groups, validation, and submission logic, specific to a feature.

**Examples:**

- `LoginForm` in `auth/`
- `FacilityForm` in `facility/`

## 🔄 Shared components (`shared/`)

Generic, utility-like components that are used across multiple features or layouts.

**Examples:**

- `Loader`
- `ErrorBoundary`
- `ConfirmDialog`

---

➡️ **Tip:** When in doubt, prefer placing a component under `features/` if it serves a specific business logic or user flow, and under `ui/` or `shared/` if it's a generic piece of UI or utility.

### Usage Guidelines

1. **Component Creation:**

   - Place components in appropriate directories based on their purpose
   - Include all necessary files (index, types, styles)
   - Document props and functionality

2. **Imports/Exports:**

   - Export components as named exports
   - Use barrel exports (index.ts) in directories
   - Import components from the barrel file

3. **Styling:**
   - Use MUI's styling solution with TypeScript
   - Keep styles colocated with components
   - Use theme variables for consistency

## Getting Started

1. Install npm packages:

   ```bash
   npm install
   ```

2. Copy the `.env.example` file to `.env` and update it with real variables.

   - Credential of Google MAP API Key should be provided
     `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=ask_for_api_key`

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Running the Application in Debugger Mode

This project is set up to enable simultaneous debugging of both the **server-side** and **client-side** of the Next.js application. Follow the steps below to run the application in debugger mode using Visual Studio Code:

### Debugger Setup

In the project, the `launch.json` configuration is already set up to allow simultaneous debugging of the server and client sides.

### Steps to Run the Debugger:

1. set **breakpoints** in the project where to debug.
2. Open Run and Debug in VSC.
3. From the list of configurations, select **"Run Full Stack (Client + Server)"**.
   - This will launch:
     - The server-side in development mode using `npm run dev`.
     - The client-side debugger in Chrome (or Edge) and attach it to the running instance.
4. The application will open in the browser at `http://localhost:3000`.

## Running the App with Docker

The application is set up to run with Docker. You can start it with the following command:

```bash
docker-compose up
```

## Deployment

Frontend is deployed as a Docker Container in AWS EC2.
Documentation on Confluence [AWS Deployment](https://offerapp.atlassian.net/wiki/spaces/GAP/pages/75857921/Deploy+Containerized+App+on+AWS)

## CI/CD with Prettier and ESLint

We have CI/CD integrated to ensure code quality and formatting are enforced consistently. If the CI/CD pipeline fails due to code formatting issues or linting errors, follow these steps:

1. **To reformat the code with Prettier:**
   what is Prettier about ? https://prettier.io/

   Run the following command to automatically fix formatting issues:

   `npm run format`

2. **To lint the code with ESLint:**
   what is ESLint about ?
   ESLint is a configurable JavaScript linter. It helps you find and fix problems in your JavaScript code. Problems can be anything from potential runtime bugs, to not following best practices, to styling issues.
   https://eslint.org/

   Ensure your code follows ESLint rules by running:

   `npm run lint`

This will help keep the codebase clean, enforce consistent styling, and make collaboration within the team easier.
