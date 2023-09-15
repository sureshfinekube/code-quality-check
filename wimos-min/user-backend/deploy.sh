# echo "Kill all the running PM2 actions"
# sudo pm2 kill

echo "Jump to app folder"
# cd /home/ubuntu/app-name
cd 

echo "Update app from Git"
# git pull origin dev-v2

echo "Run new PM2 action"
# sudo cp /home/ubuntu/ecosystem.json ecosystem.json
# sudo pm2 start ecosystem.json
sudo pm2 stop 0
