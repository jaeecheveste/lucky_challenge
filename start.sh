#!/bin/bash
set -e

SERVER="lucky_db";
PW="s3cr3t";
DB="lucky_challenge";
REDIS_SERVER="lucky_redis"
API_SERVER="lucky_app"
MIGRATIONS_SERVER="lucky_migrations"
RUN_MIGRATIONS="true"
CLEAN_CONTAINERS="true"

if [ "$CLEAN_CONTAINERS" == "true" ]; then
  echo "Removing Previous Containers"
  (docker kill $SERVER || :) && \
    (docker rm $SERVER || :)
  (docker kill $SERVER || :) && \
    (docker rm $SERVER || :)
  (docker kill $REDIS_SERVER || :) && \
    (docker rm $REDIS_SERVER || :)
  (docker kill $MIGRATIONS_SERVER || :) && \
    (docker rm $MIGRATIONS_SERVER || :)
  (docker kill $API_SERVER || :) && \
    (docker rm $API_SERVER || :)
  docker network remove lucky_challenge_net
fi

echo "Creating network"
docker network create lucky_challenge_net

echo "SETTING UP DATABASE"
docker run --net lucky_challenge_net --name $SERVER -e POSTGRES_PASSWORD=$PW \
  -e PGPASSWORD=$PW \
  -p 5432:5432 \
  -d postgres

# wait for pg to start
echo "sleep wait for pg-server [$SERVER] to start";
SLEEP 3;

# create the db 
echo "CREATE DATABASE $DB ENCODING 'UTF-8';" | docker exec -i $SERVER psql -U postgres
echo "\l" | docker exec -i $SERVER psql -U postgres


echo "SETTING UP REDIS"
docker run --net lucky_challenge_net --name $REDIS_SERVER \
  -e PGPASSWORD=$PW \
  -p 6379:6379 \
  -d redis

if [ "$RUN_MIGRATIONS" == "true" ]; then
  echo "RUNNING MIGRATIONS";
  docker build -t $MIGRATIONS_SERVER -f ./migrations.Dockerfile .
  docker run --net lucky_challenge_net --name $MIGRATIONS_SERVER -d $MIGRATIONS_SERVER
fi

echo "SETTING UP API"
docker build -t $API_SERVER .
docker run --net lucky_challenge_net --name $API_SERVER -p 3000:3000 -d $API_SERVER
