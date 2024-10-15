# GAP Frontend

A Next.js 14 project with App Router, ready to power GAP with the latest features and best practices:

## Key Features:

- **Next.js App Router** for efficient routing and server-side rendering.
- **SEO Optimization** using Next.js's Metadata for better search engine visibility.
- **Tailwind CSS + Daisy + Flowbite** for styling the **landing page**.
- **MUI (Material-UI) Library** for building modern, responsive dashboards.

## Project Conventions:

- **Folder Naming:** Use **lower case** for folder names. If the name consists of multiple words, use **snake_case** (e.g., `like_this`).
- **File Naming:** Use **CamelCase** for TypeScript file names (e.g., `MyComponent.tsx`).
- **Component Structure:** Organize component folders into categories like **input**, **button**, etc.
- **Component Naming:** Prefix the name of components with **G** (e.g., `GButton.tsx`) to indicate it's a GAP-specific component and not from a framework.
- **Inline Styles:** Extract inline styles (from MUI's `sx` prop) into a TypeScript object and define them at the end of each component file.
- **Icons:** Use **MUI icons** and **react-icons**.
- **Fonts & Colors:**
  - Landing page styles are defined in **tailwind.config.ts**.
  - Dashboard styles are defined in **app/theme.ts**.

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
