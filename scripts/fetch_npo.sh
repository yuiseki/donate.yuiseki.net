
curl \
  -s \
  -o - \
  https://www.npo-homepage.go.jp/npoportal/certification | \
  htmlq --attribute href a | \
  grep "^https://www.npo-homepage.go.jp/npoportal/certification/list/" > ./tmp/lists.txt

lists=`cat ./tmp/lists.txt`
IFS=$'\n'
for list in $lists; do
  sleep 1
  curl -s -o - $list | htmlq --attribute href a | \
    grep "^https://www.npo-homepage.go.jp/npoportal/detail/"
done
