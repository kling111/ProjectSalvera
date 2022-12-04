resource "aws_instance" "ec2_webhost_apache" {
    ami = var.webhost_ec2_ami
    instance_type = var.webhost_ec2_type
    security_groups = ["${aws_security_group.webhost_security_group.name}"]
    key_name = "webhost_kp"

    provisioner "file" {
        source      = "web_contents.html"
        destination = "/var/www/html/index.html"

        connection {   
        host        = self.public_ip
        user        = "root"
        private_key = file("webhost_kp.pem")
        }   
    }

    tags = {
      Name = "ec2_webhost_apache"
    }
}
