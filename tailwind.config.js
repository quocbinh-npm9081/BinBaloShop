const colors = require('tailwindcss/colors');
module.exports = {
    purge: [
        './src/**/*.ejs', "./src/**/*.js"
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            teal: colors.teal,
        },
    },
    variants: {
        extend: {
            borderWidth: ['first'],

        },
    },
    plugins: [
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/forms'),


    ],
}