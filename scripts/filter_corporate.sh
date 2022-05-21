
cat ./tmp/npo_corporate.json | \
  jq '.[]' | \
  jq -r '[."法人名称", ."組織情報（ホームページ）"] | join(",")' | \
  grep -e "http" > ./public/npo_corporate_homepage.csv
