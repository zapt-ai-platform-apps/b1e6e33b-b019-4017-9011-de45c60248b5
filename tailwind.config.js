export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gradient-start': '#0f172a',
        'gradient-mid': '#1e3a8a',
        'gradient-end': '#0f172a',
      },
      backgroundImage: {
        'main-gradient': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
};