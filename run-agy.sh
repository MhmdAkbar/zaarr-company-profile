#!/bin/bash
cd /home/abyzay/projects/zaarr-web
export PATH="$HOME/.local/bin:$HOME/.local/node/bin:$PATH"
exec agy --model gemini-4-argon-medium --dangerously-skip-permissions --prompt-interactive "Kerjakan project ini sekarang mengikuti AGENTS.md di folder ini, mulai dari Step 0 sampai selesai. npm install dan npm run build baseline sudah jalan dan lolos. Lanjutkan tanpa bertanya."
