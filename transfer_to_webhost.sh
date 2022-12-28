#!/bin/bash
cd salvera_web_contents
echo "Building Project Salvera web contents"
npm run build
cd ..
echo "Copying salvera_web_contents/ into /var/www/html/"
sudo scp -i webhost_kp.pem -r salvera_web_contents/build/* ec2-user@ec2-3-95-173-47.compute-1.amazonaws.com:/var/www/html
echo "Done, changes should be reflected at http://3.95.173.47:80"
