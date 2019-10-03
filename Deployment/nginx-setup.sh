# Script to set up a server (Ubuntu 18.04) with Nginx and Certbot

#!/bin/bash

# Install nginx

sudo apt update
sudo apt install nginx

# Allow Nginx through firewall

sudo ufw enable
sudo ufw allow 'Nginx HTTP'

# Installing Certbot

sudo apt install python-certbot-nginx
