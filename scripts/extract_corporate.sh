
cat ./tmp/000_CorporateInputData_20220519.csv | \
  csvq -P -f json "select *" > ./public/npo_corporate.json
