# Script to set up Node.js, MongoDB and PM2 on Ubuntu 18.04 server

#!/bin/bash

# Install Node.js v10 latest, and NPM

sudo apt-get install curl
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -

sudo apt-get install nodejs

# Install MongoDB

sudo apt-get install mongodb
sudo systemctl start mongodb.service

# Install PM2 with NPM

npm install -g pm2
