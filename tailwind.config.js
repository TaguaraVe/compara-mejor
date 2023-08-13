/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        error: '#FF3B30',
        success: '#34C759',
        black: '#f1f1f',
        white: '#fafafa',
        myBlue: '#18baed',
        myGreen: '#57a724',
        myRed: '#e14558',
        ctaInv: '#5210ac',
        cta: '#eb6909',
      },
      backgroundImage: {
        'access-pattern': "url('/assets/images/bgs/bg-access.jpg')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontSize: {
        clamped: 'clamp(0.6rem, 3vw, 2rem)',
      },
    },
  },
  plugins: [],
};
