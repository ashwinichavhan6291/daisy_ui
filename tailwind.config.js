/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "375px",  // Small phones
        sm: "640px",  // Mobile
        md: "768px",  // Tablets
        lg: "1024px", // Small Laptops
        xl: "1280px", // Desktops
        "2xl": "1536px", // Large Screens
      },
      width: {
        "xs": "90%",  // Default for extra small screens
        "sm": "80%",  // Mobile
        "md": "75%",  // Tablets
        "lg": "60%",  // Laptops
        "xl": "50%",  // Desktops
        "2xl": "40%", // Large Screens
      },
      maxWidth: {
        "xs": "320px",
        "sm": "480px",
        "md": "640px",
        "lg": "800px",
        "xl": "1024px",
        "2xl": "1280px",
      },
    },
  },
  plugins: [require('daisyui')],
};
