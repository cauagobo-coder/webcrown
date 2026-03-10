/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold:  '#F58A07', // Alterado para Laranja vibrante (rebuild trigger)
          gray:  '#DCDCDC',
          black: '#0A0A0A',
          sky:   '#C8DCF0',
        },
        /* Atalhos para compatibilidade legada (mantive o nome da classe 'gold' para não quebrar o HTML, mas a cor é laranja) */
        gold: {
          light:   '#FFB459',
          DEFAULT: '#F58A07',
          dark:    '#B56100',
        },
        background: '#0A0A0A',
        surface: {
          1: '#111111',
          2: '#1A1A1A',
          3: '#242424',
        },
      },
      fontFamily: {
        display: ['ClashDisplay', 'Inter', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
        /* Alias para classes Tailwind existentes no projeto */
        sans:    ['Inter', 'sans-serif'],
      },
      fontSize: {
        'h1': ['96px', { lineHeight: '1',     letterSpacing: '-0.02em' }],
        'h2': ['48px', { lineHeight: '1.1',   letterSpacing: '-0.02em' }],
        'h3': ['34px', { lineHeight: '1.2',   letterSpacing: '-0.02em' }],
        'h4': ['20px', { lineHeight: '1.3',   letterSpacing: '-0.01em' }],
      },
      borderRadius: {
        'sm':   '4px',
        'DEFAULT': '8px',
        'lg':   '16px',
        'xl':   '24px',
        'full': '9999px',
      },
    },
  },
  plugins: [],
}
