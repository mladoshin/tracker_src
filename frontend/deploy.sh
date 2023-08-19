npm i
npm run build:prod
rm -rf /var/www/tracking_site/html/admin
cp -r build /var/www/tracking_site/html/admin
