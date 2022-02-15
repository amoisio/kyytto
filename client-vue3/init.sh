#!/bin/sh
ROOT=/usr/share/nginx/html
API_HOST=$(getent hosts $VUE_APP_API_SERVER_HOST | awk '{ print $1 }');
if [ -z ${API_HOST} ]; then API_HOST=$VUE_APP_API_SERVER_HOST ;fi

echo "Replacing env vars...";
for file in $ROOT/js/app.*.js
do
  echo "Processing $file...";
  sed -i 's|VUE_APP_API_SERVER_SCHEME|'${VUE_APP_API_SERVER_SCHEME}'|g' $file
  sed -i 's|VUE_APP_API_SERVER_HOST|'${API_HOST}'|g' $file
  sed -i 's|VUE_APP_API_SERVER_PORT|'${VUE_APP_API_SERVER_PORT}'|g' $file
done

nginx -g 'daemon off;'