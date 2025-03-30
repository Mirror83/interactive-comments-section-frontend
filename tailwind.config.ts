import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neutral
        "very-light-gray": "hsl(228,33%,97%)",
        "light-gray": "hsl(223,19%,93%)",
        "grayish-blue": "hsl(211, 10%, 45%)",
        "dark-blue": "hsl(212, 24%, 26%)",
        // Primary
        "moderate-blue": "hsl(238, 40%, 52%)",
        "soft-red": "hsl(358, 79%, 66%)",
        "light-grayish-blue": "hsl(239, 57%, 85%)",
        "pale-red": "hsl(357, 100%, 86%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
