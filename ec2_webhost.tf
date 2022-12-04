resource "aws_security_group" "webhost_security_group" {
    name = "webhost_security_group"
    description = "Allows port connections for webhosting"

    ingress {
        from_port = 22
        to_port = 22
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        from_port = 80
        to_port = 80
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
}

resource "aws_instance" "ec2_webhost_apache" {
    ami = var.webhost_ec2_ami
    instance_type = var.webhost_ec2_type
    security_groups = ["${aws_security_group.webhost_security_group.name}"]
    key_name = "webhost_kp"

    user_data = <<-EOF
        #! /bin/bash
        sudo yum install httpd -y
        sudo systemctl start httpd
        sudo systemctl enable httpd
        echo "Hello World, this is Karan Lingineni" >> /var/www/html/index.html
    EOF

    tags = {
      Name = "ec2_webhost_apache"
    }
}
