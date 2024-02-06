npm i
npm run build:prod
rm -rf /usr/share/nginx/aziz_express/admin
cp -r build /usr/share/nginx/aziz_express/admin
