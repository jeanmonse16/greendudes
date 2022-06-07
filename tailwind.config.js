const plugin = require('tailwindcss/plugin')

module.exports = {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
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