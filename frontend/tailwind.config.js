// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        slideDown: {
          '0%': { opacity: '0', transform: 'translate(-50%, -100%)' },
          '100%': { opacity: '1', transform: 'translate(-50%, 0)' },
        },
      },
    },
  },
  plugins: [],
}