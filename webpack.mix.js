const mix = require('laravel-mix');

mix
    .js('./src/resources/js/addToCart.js', './src/public/js/addToCart.js')
    .js('./src/resources/js/removeProduct.js', './src/public/js/removeProduct.js')
    .js('./src/resources/js/admin.js', './src/public/js/admin.js')
    .js('./src/resources/js/updateStatus.js', './src/public/js/updateStatus.js')


.sass('./src/resources/sass/app.scss', './src/public/css/style.css')
    .options({
        postCss: [
            require('tailwindcss')
        ]
    })
    .browserSync({
        server: './',
        files: ['./src/**/*.ejs']
    });