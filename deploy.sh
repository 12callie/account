set -e

npm run build

cd dist


git init
git add -A
git commit -m 'deploy'

# 部署到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 部署到 https://<USERNAME>.github.io/<REPO>
 git push -f git@github.com:12callie/account-website.git master:gh-pages

cd -