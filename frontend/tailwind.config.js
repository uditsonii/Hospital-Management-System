// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundSize: {
        "200%": "200% 200%",
      },
      backgroundPosition: {
        center: "center",
        top: "top",
        bottom: "bottom",
        left: "left",
        right: "right",
        "gradient-move": "0% 50%", // optional
      },
      animation: {
        fadeIn: "fadeIn 1s ease-out forwards",
        slideUp: "slideUp 0.8s ease-out forwards",
        zoomIn: "zoomIn 0.9s ease-out forwards",
        slideRight: "slideRight 1s ease-out forwards",
        bounceInUp: "bounceInUp 0.8s ease-out both",
        "bounce-chat": "bounceChat 2s infinite",
        gradientMove: "gradientMove 10s ease infinite",
        "scroll-x": "scrollX 60s linear infinite",
        "fade-in-up": "fadeInUp 0.6s ease-out both",
        "background-pan": "backgroundPan 10s linear infinite",
        blink: "blink 1s step-end infinite",
        gradientWave: "gradientWave 4s ease infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideUp: {
          "0%": { transform: "translateY(40px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        zoomIn: {
          "0%": { transform: "scale(0.8)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        slideRight: {
          "0%": { transform: "translateX(-50px)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        bounceInUp: {
          "0%": { opacity: "0", transform: "translateY(100%)" },
          "60%": { opacity: "1", transform: "translateY(-20%)" },
          "80%": { transform: "translateY(10%)" },
          "100%": { transform: "translateY(0)" },
        },
        bounceChat: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },

        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(40px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        gradientMove: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        scrollX: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }, // Adjust for loop effect
        },
        backgroundPan: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
        blink: {
          "0%, 100%": { borderColor: "transparent" },
          "50%": { borderColor: "white" },
        },
        gradientWave: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};
