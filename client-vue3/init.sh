#!/bin/sh
ROOT=/usr/share/nginx/html

echo "Replacing env vars";
for file in $ROOT/js/app.*.js
do
  echo "Processing $file...";
  sed -i 's|VUE_APP_API_SERVER_HOST|'${VUE_APP_API_SERVER_HOST}'|g' $file
  sed -i 's|VUE_APP_API_SERVER_PORT|'${VUE_APP_API_SERVER_PORT}'|g' $file
done

nginx -g 'daemon off;'