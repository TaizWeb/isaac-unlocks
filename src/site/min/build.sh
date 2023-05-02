# JS Uglifier, this is done to consolodate everything into a small package for less requests/faster loading
# Installation: npm install uglify-js -g
# Repo: https://github.com/mishoo/UglifyJS
uglifyjs ../lib/isaac.js ../scripts/buttons.js ../scripts/filters.js ../scripts/popup.js ../scripts/navigation.js ../scripts/main.js -c > min.js

# CSS Uglifier, same as above
# Installation: npm install uglifycss -g
# Repo: https://github.com/fmarcia/uglifycss
uglifycss --ugly-comments ../styles/navbar.css ../styles/navigation.css ../styles/popup.css ../styles/main.css > min.css

