import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Obtained from screenshot of Ember's logo
      colors: {
        "brand-primary": "#3f907c",
        "brand-secondary": "#82b0a3",
        "brand-tertiary": "#cbd7d3",
        "brand-disabled": "#496A61", // Darkened version of brand-primary
        "brand-enabled": "#8FC5B5", // Lightened version of brand-secondary
      },
    },
  },
  plugins: [],
};
export default config;
