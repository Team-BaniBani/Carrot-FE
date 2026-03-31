import type { Config } from "tailwindcss";
import { colors } from "./src/styles/colors";
import { design } from "./src/styles/design";
import { typography } from "./src/styles/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/component/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: design.screens,
    container: {
      center: true,
      padding: {
        DEFAULT: design.spacing.page,
        sm: design.spacing.page,
        md: "24px",
        lg: "32px",
      },
    },
    extend: {
      colors,
      fontFamily: {
        sans: ["Pretendard", "sans-serif"],
        pretendard: ["Pretendard", "sans-serif"],
      },
      fontSize: typography,
      spacing: design.spacing,
      borderRadius: design.borderRadius,
      maxWidth: design.maxWidth,
    },
  },
  plugins: [],
};

export default config;