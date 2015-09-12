#!/bin/bash

# Need to unset the `NODE_ENV' variable or set it to production.
unset NODE_ENV
export NODE_ENV="production"

# Set the port here.
export PORT=8080

# Set the $MONGODB_PATH
# export MONGODB_PATH=/data/db

echo "Reinstalling node_modules"
npm install
npm rebuild
echo "done."

# Install forever
# sudo npm install forever -g

echo "Killing currently running services"
killall mongod
sleep 2
# killall node
echo "done."

echo -e "Starting mongod on 27017,logs in mongo_proc.log \n"
nohup mongod --dbpath $MONGODB_PATH --port 27017 --bind_ip 127.0.0.1 --auth > mongo_proc.log &

# echo "Starting node server, logs in node_proc.log"
# nohup npm start > node_proc.log &

echo "Starting node server with forever"
echo "To view logs type forever logs"
echo "Logs also appended in node_proc.log file"
echo "Stop all previous processes"
forever stopall
echo "Start again."
forever -o node_proc.log -a start app.js
echo "done."

sleep 2
echo -e "New service output: (verify everything is running)\n"
echo "MongoDB: "
tail -n 10 mongo_proc.log
echo "Node: "
