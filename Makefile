
all: extract_npo filter_npo

.PHONY: extract_npo
extract_npo:
	bash ./scripts/extract_corporate.sh

.PHONY: filter_npo
filter_npo:
	bash ./scripts/filter_corporate.sh
