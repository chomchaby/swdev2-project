import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import tailwindcssAnimate from "tailwindcss-animate";
import { withUt } from "uploadthing/tw";

const config: Config = withUt({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
      },
      screens: {
        sm: "376px",
        md: "782px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1920px",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        neutral: {
          white: "#ffffff",
          "100": "#F8F9FA",
          "200": "#E9ECEF",
          "300": "#DEE2E6",
          "400": "#CED4DA",
          "500": "#ADB5BD",
          "600": "#6C757D",
          "700": "#495057",
          "800": "#343A40",
          "900": "#212529",
          black: "#000000",
        },
        primary: {
          "100": "#EBEFFF",
          "200": "#B9C4FF",
          "300": "#8FA0FF",
          "400": "#6E82FE",
          "500": "#556AEB",
          "600": "#354ACB",
          "700": "#1D2F99",
          "800": "#0C1A66",
          "900": "#020A33",
        },
        secondary: {
          "100": "#FFF8EB",
          "200": "#FFE3B0",
          "300": "#FFCC75",
          "400": "#FFB23B",
          "500": "#FF9500",
          "600": "#CC7C00",
          "700": "#996000",
          "800": "#664200",
          "900": "#332200",
        },
        tertiary: {
          "100": "#EBF4FF",
          "200": "#B0D5FF",
          "300": "#75B6FF",
          "400": "#3B98FF",
          "500": "#007AFF",
          "600": "#0061CC",
          "700": "#004899",
          "800": "#002F66",
          "900": "#001733",
        },
      },
      borderRadius: {
        sm: "calc(var(--radius) - 4px)",
        md: "calc(var(--radius) - 2px)",
        lg: "var(--radius)",
        xl: "16px",
        "2xl": "20px",
        "3xl": "24px",
        "4xl": "36px",
      },
    },
  },
  plugins: [tailwindcssAnimate],
});
export default config;
