module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        nunito: 'Nunito_400Regular',
        'nunito-bold': 'Nunito_700Bold',
      },
      colors: {
        red: {
          50: '#F4E6E7',
          200: '#F3BABD',
          700: '#BF3B44',
        },
        green: {
          50: '#E5F0DB',
          200: '#CBE4B4',
          700: '#639339',
        },
        gray: {
          50: '#FAFAFA',
          100: '#EFF0F0',
          300: '#DDDEDF',
          400: '#B9BBBC',
          600: '#5C6265',
          800: '#333638',
          950: '#1B1D1E',
        },
      },
    },
  },
  plugins: [],
}
