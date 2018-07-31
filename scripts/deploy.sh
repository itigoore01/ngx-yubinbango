#!/bin/bash -eu
npm test -- ngx-yubinbango --watch=false --browsers=ChromeHeadless
npm run build -- ngx-yubinbango --prod
npm run build -- ngx-yubinbango-demo --prod --base-href=/ngx-yubinbango/
cp ./README.md ./dist/ngx-yubinbango
cd dist/ngx-yubinbango-demo
git init
git add .
git commit -m "Publishing site on `date "+%Y-%m-%d %H:%M:%S"`"
git push -f git@github.com:itigoore01/ngx-yubinbango.git master:gh-pages
