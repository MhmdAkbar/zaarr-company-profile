#!/usr/bin/env bash
# Jalankan dari root project di mesin yang bisa akses internet:
#   bash scripts/fetch-assets.sh
set -euo pipefail
BASE="https://zaar-mocha.vercel.app/Resources"
OUT="public/Resources"
mkdir -p "$OUT/Image" "$OUT/Video"

for f in logo-zaar.png unified.png imops.png product-patrol.png cybersecuirty.png HIS.png; do
  echo "Image/$f"
  curl -fSL "$BASE/Image/$f" -o "$OUT/Image/$f"
done

echo "Video/0706.mp4"
curl -fSL "$BASE/Video/0706.mp4" -o "$OUT/Video/0706.mp4"

ls -lh "$OUT/Image" "$OUT/Video"
