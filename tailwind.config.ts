import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        background: "#F9FAFA",
        primary: {
          DEFAULT: "#22A7F1",
          blue: "#22A7F1",
          purple: "#582EFF",
        },
        secondary: {
          DEFAULT: "#FF4D4D",
          red: "#FF4D4D",
          yellow: "#FECB00",
          green: "#22BC7E",
          blue: "#2356FF",
          "yellow-dark": "#EB9700",
        },
        sys: {
          DEFAULT: "#EB4444",
          red: "#EB4444",
          orange: "#FF9209",
          green: "#3DCAB9",
        },
        gray: {
          DEFAULT: "#1E3137",
          100: "#F1F3F4",
          200: "#E5E9EA",
          300: "#D2D7D9",
          400: "#A0ADB1",
          500: "#8D999C",
          600: "#475A60",
          700: "#1E3137",
        },
      },
    },
  },
  plugins: [require("daisyui"), require("flowbite/plugin")],
  daisyui: {
    themes: [
      {
        winter: {
          ...require("daisyui/src/theming/themes")["winter"],
          primary: "#22A7F1", // default primary color
          secondary: "#FF4D4D", //default secondry color
          "base-content": "#1E3137", //default color of content
          "base-100": "white", //default color of the blank page or the bg color
        },
      },
      ,
      "dark",
      "cupcake",
    ],
  },
};
export default config;
