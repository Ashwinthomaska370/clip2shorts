/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        neon: {
          pink: "#ff1cf7",
          purple: "#7c3aed",
          blue: "#00E5FF",
          green: "#39FF14",
        },
      },
      backgroundImage: {
        "grid-radial":
          "radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.12) 1px, transparent 0)",
      },
      boxShadow: {
        glow: "0 0 25px rgba(124, 58, 237, 0.55), 0 0 50px rgba(0, 229, 255, 0.33)",
      },
      borderRadius: {
        lg: "var(--radius)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
