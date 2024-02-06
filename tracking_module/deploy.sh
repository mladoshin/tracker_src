path=$1
rm -rf $path
npm run build:prod
js=$(find "build/static/js" -name "main*.js")
css=$(find "build/static/css" -name "main*.css")

mv $js build/static/js/main.js
mv $css build/static/css/main.css

cp -r build/static/ $path
echo Success
