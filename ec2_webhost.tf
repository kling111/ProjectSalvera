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
        sudo aws s3 s3://project-salvera-web-contents/web_contents.html /var/www/html/index.html
    EOF

    tags = {
      Name = "ec2_webhost_apache"
    }
}
