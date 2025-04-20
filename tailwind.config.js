// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      lightblue: "#E8F2F6",
      darkblue: "#037CA7",
      white: "#FFFFFF",
      border: "#B5B5B5",
      fontColor: "#616161",
      secondary: "rgba(0, 0, 0, 0.60)",
      LightGray: "#F1F1F1",
      StatusGreen: "#0F8815",
      LightBlue: "#DEEFFC",
      TransparentGreen: "#5ED46433",
      CrimsonRed: "#D32F2F",
      CloudBlue: "#D7E5EA",
      AccentBlue: "#007DA7",
      BorderGray: "#BEBEBE",
      SoftBlue: "#E2EBF2",
      green: {
        50: "#5ED46433", // Very light green
        100: "#0F8815", // Light green
      },
      red: {
        50: "#FFDADA",
        100: "#D32F2F",
      },

      blue: {
        primary: "#2196F3",
      },
    },
    extend: {
      colors: {
        "action-selected": "rgba(0, 0, 0, 0.08)", // equivalent of #00000014
        inactive: "rgba(0, 0, 0, 0.87)",
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"], // Set Montserrat as the default font
      },
    },
  },
  plugins: [],
};
