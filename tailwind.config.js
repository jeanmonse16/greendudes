const plugin = require('tailwindcss/plugin')

module.exports = {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
      extend: {
        animation: {
          'hide-slow': 'hide 4s linear infinite',
          'disco-slow': 'disco 2s linear infinite',
          'smoke-slow': 'smoke 4s linear infinite',
        },
        keyframes: {
          hide: {
            '0%, 100%': { opacity: '0' },
            '25%': {  opacity: '1' },
            '95%': {  opacity: '1' },
          }, 
          disco: {
            '0%, 100%': { background: 'red' },
            '33%': { background: 'green' },
            '66%': { background: 'blue' },
          }, 
          smoke: {
            '0%, 100%': { 
              transform: 'translateY(300%)', 
              opacity: '0',
            },
            '50%': { 
              transform: 'translateY(100%)',
              opacity: '1',
            },
            '85%': { 
              transform: 'translateY(0%)',
              opacity: '0',
            },
          }
        }
      },
    },
    plugins: [
        plugin(function ({ addUtilities }) {
            addUtilities({
              '.text-shadow': {
                "text-shadow": "-1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000"
              }, 
              '.scrollbar-hide': {
                /* IE and Edge */
                '-ms-overflow-style': 'none',
      
                /* Firefox */
                'scrollbar-width': 'none',
      
                /* Safari and Chrome */
                '&::-webkit-scrollbar': {
                  display: 'none'
                }
              }
            }
            )
          })
    ],
}