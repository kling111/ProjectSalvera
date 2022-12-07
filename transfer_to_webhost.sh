#!/bin/bash
echo "Copying salvera_web_contents/web_contents.html into /var/www/html/index.html"
sudo scp -i webhost_kp.pem -r salvera_web_contents/build/* ec2-user@ec2-3-95-173-47.compute-1.amazonaws.com:/var/www/html
echo "Done, changes should be reflect at http://3.95.173.47:80"
