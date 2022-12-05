#!/bin/bash 
echo "Moving to root of project directory"
cd ..
echo "Copying salvera_web_contents/web_contents.html into /var/www/html/index.html"
sudo scp -i webhost_kp.pem salvera_web_contents/web_contents.html ec2-user@ec2-3-95-173-47.compute-1.amazonaws.com:/var/www/html/index.html
echo "Done, changes should be reflect at http://3.95.173.47:80"
