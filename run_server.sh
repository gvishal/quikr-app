#Simple script to run mongod and node.

if ! pidof mongod; then
    echo "Restarting services with updates"
    echo "Mongod not running, starting....."
    nohup mongod --dbpath $MONGODB_PATH --port 27017 --bind_ip 127.0.0.1 --auth > mongo_proc.log &
else
    echo "Mongod already running."
fi

sleep 2
PORT=8080 nodemon app.js --debug
