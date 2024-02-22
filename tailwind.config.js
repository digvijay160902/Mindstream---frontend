/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '319px',  
        'md': '760px',
        'lg': '1024px',
        'xl': '1280px',
      },
      fontFamily: {
        custom: ['Merienda', 'cursive', 'sans-serif'], 
        anotherFont: ['Lora','Playfair Display','sans-serif'], 
        authorFont: ['Tillana', 'system-ui'],
        commentFont:['Dancing Script','Shadows Into Light', 'cursive'],
        logo:['Almendra SC','serif']
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)', // Customize the cubic bezier values for the desired smoothness
      },
      colors: {
        'regal-blue': '#29347a',
      },
    },
  },
  plugins: [],
}