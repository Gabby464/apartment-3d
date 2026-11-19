#!/usr/bin/env bash
# Stamps a fresh version on every asset URL so browsers never show a stale cached copy.
# Run before each commit:  ./bump-version.sh
set -e
cd "$(dirname "$0")"
V=$(date -u +%Y%m%d%H%M%S)
sed -i -E "s#(src/main\.js|style\.css)(\?v=[0-9]+)?\"#\1?v=$V\"#g" index.html
sed -i -E "s#from '\./(plan|textures|minimap|interior)\.js(\?v=[0-9]+)?'#from './\1.js?v=$V'#g" src/main.js
echo "version $V"
