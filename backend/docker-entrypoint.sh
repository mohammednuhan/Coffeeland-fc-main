#!/bin/sh
set -e

echo "Applying database migrations..."
npx prisma migrate deploy

echo "Starting Coffeeland FC API on port ${PORT:-4000}..."
exec node dist/index.js