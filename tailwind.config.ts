const { fontFamily } = require("tailwindcss/defaultTheme");

const generateColorClass = (variable: string) => {
  return ( opacityValue: string ) =>
    opacityValue
      ? `rgba(var(--${variable}), ${opacityValue})`
      : `rgb(var(--${variable}))`;
};

const textColor = {
  default: generateColorClass("text-default"),
  neutral: generateColorClass("text-neutral"),
};

const backgroundColor = {
  default: generateColorClass("bg-default"),
  neutral: generateColorClass("bg-neutral"),
};

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      textColor,
      backgroundColor,
      colors : {
        primary: generateColorClass("primary-color"),
        secondary: generateColorClass("secondary-color"),
        tertiary: generateColorClass("tertiary-color"),
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  darkMode: ["class", '[data-theme="dark"]'],
  plugins: [],
};
