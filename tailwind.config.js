/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.{html,js}"],
  theme: {
    extend: {
      animation: {
        identifierio: "identifierio 1s ease-in 1s 1",
        bounce: "bounce 1s 1",
        fade: "fade 1s ease-in forwards",
        opacity: "opacity",
        transition: "width 2s ease-in-out",
      },
      scrollbar: ["rounded"],
      keyframes: {
        identifierio: {
          "0%": { transform: "translateY(-300px)" },
          "100%": { transform: "translateY(0)" },
        },
        bounce: {
          "0%,100%": {
            transform: "translateY(-25%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        fade: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        transition: {
          "0%": { width: "40px" },
          100: { width: "60px" },
        },
        opacity: {
          "0%": { opacity: 0 },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none" /* IE and Edge */,
          "scrollbar-width": "none" /* Firefox */,
        },
      });
    },
  ],
};
