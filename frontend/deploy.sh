npm i
npm run build:prod
rm -rf /usr/share/nginx/html/admin
cp -r build /usr/share/nginx/html/admin
