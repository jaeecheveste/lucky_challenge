!/bin/bash
set -e
set -x
if [ "$RUN_MIGRATIONS" ]; then
  echo "RUNNING MIGRATIONS";
  npm run migration:up
fi
echo "START SERVER";
npm run start:prod