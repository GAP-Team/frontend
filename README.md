# GAP Frontend

A Next.js 14 project with App Router, ready to power GAP with the latest features and best practices:

## Key Features:

- **Next.js App Router** for efficient routing and server-side rendering.
- **SEO Optimization** using Next.js's Metadata for better search engine visibility.
- **Tailwind CSS + Daisy + Flowbite** for styling the landing page.
- **MUI (Material-UI) Library** for building modern, responsive dashboards.

## Project Conventions:

- **Folder Naming:** Use **lower case** for folder names. If the name consists of multiple words, use **snake_case** (e.g., `like_this`).
- **File Naming:** Use **CamelCase** for TypeScript file names (e.g., `MyComponent.tsx`).
- **Component Structure:** Organize component folders into categories like **input**, **button**, etc.
- **Component Naming:** Prefix the name of components with **G** (e.g., `GButton.tsx`) to indicate it's a GAP-specific component and not from a framework.
- **Inline Styles:** Extract inline styles (from MUI's `sx` prop) into a TypeScript object and define them at the end of each component file.
- **Icons:** Use a mix of icons from **Figma**, **Font Awesome**, **react-icons**, and **MUI icons**.
- **Fonts & Colors:**
  - Landing page styles are defined in **tailwind.config.ts**.
  - Dashboard styles are defined in **app/theme.ts**.

## Getting Started

1. Install npm packages:

   ```bash
   npm install
   ```

2. Copy the `.env.example` file to `.env` and update it with real variables.

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Running the App with Docker

The application is set up to run with Docker. You can start it with the following command:

```bash
docker-compose up
```

To run the app in detached mode without log messages:

```bash
docker-compose up -d
```

## Deployment

The app is hosted on AWS:

```

```

## Environment Variables

Always keep the `.env.example` file up to date with dummy variables to ensure a smooth setup for new team members.

## CI/CD with Prettier and ESLint

We have CI/CD integrated to ensure code quality and formatting are enforced consistently. If the CI/CD pipeline fails due to code formatting issues or linting errors, follow these steps:

1. **To reformat the code with Prettier:**

   Run the following command to automatically fix formatting issues:

   ```bash
   npx prettier --write .
   ```

   You can also check the formatting without applying changes:

   ```bash
   npx prettier --check .
   ```

   Or, use the predefined npm script for a faster process:

   ```bash
   npm run format
   ```

2. **To lint the code with ESLint:**

   Ensure your code follows ESLint rules by running:

   ```bash
   npm run lint
   ```

This will help keep the codebase clean, enforce consistent styling, and make collaboration within the team easier.
