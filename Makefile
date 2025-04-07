.PHONY: proto

help: ## This help dialog.
	@grep -F -h "##" $(MAKEFILE_LIST) | grep -F -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

prepare:
	# install taildwind locally, needed for Jetbrains Goland
	# https://github.com/tailwindlabs/tailwindcss-intellisense?tab=readme-ov-file#troubleshooting
	npm install

build:
	hugo build --cleanDestinationDir --minify --gc

dev:
	hugo server --buildDrafts --cleanDestinationDir
