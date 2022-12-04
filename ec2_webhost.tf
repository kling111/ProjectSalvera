resource "aws_instance" "ec2_webhost_apache" {
    ami = var.webhost_ec2_ami
    instance_type = var.webhost_ec2_type
    security_groups = ["webhost_security_group"]
    key_name = "webhost_kp"

    user_data = <<-EOF
        #! /bin/bash
        sudo yum install httpd -y
        sudo systemctl start httpd
        sudo systemctl enable httpd
        echo "Hello World, this is Karan Lingineni" >> /var/www/html/index.html
    EOF

    provisioner "file" {
        source      = "web_contents.html"
        destination = "/var/www/html/index.html"

        connection {   
        host        = self.public_ip
        user        = "ec2-user"
        private_key = file("webhost_kp.pem")
        }   
    }

    tags = {
      Name = "ec2_webhost_apache"
    }
}
