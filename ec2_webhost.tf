resource "aws_iam_role" "project_salvera_webhost_role" {
  name = "project_salvera_webhost_role"

  assume_role_policy = jsonencode(
    {
    "Version": "2012-10-17",
    "Statement": [
        {
        "Effect": "Allow",
        "Principal": {
            "Service": "ec2.amazonaws.com"
        },
        "Action": "sts:AssumeRole"
        }
    ]
    })
}

resource "aws_iam_role_policy" "project_salvera_webhost_policy" {
  name = "project_salvera_webhost_policy"
  role = aws_iam_role.project_salvera_webhost_role.id

  policy = jsonencode(
    {
    "Version": "2012-10-17",
    "Statement": [
        {
        "Effect":"Allow",
        "Action": [
            "s3:GetObject",
            "s3:GetObjectVersion",
            "s3:GetBucketVersioning",
            "s3:PutObjectAcl",
            "s3:PutObject",
            "s3:GetBucketAcl",
            "s3:GetBucketLocation"
        ],
        "Resource": [
            "${aws_s3_bucket.web_contents_bucket.arn}",
            "${aws_s3_bucket.web_contents_bucket.arn}/*"
        ]
        },
    ]
    })
}

resource "aws_iam_instance_profile" "webhost_instance_profile" {
    name = "project_salvera_webhost_instance_profile"
    role = aws_iam_role.project_salvera_webhost_role.name
  
}

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

resource "aws_instance" "project_salvera_ec2_webhost" {
    ami = var.webhost_ec2_ami
    instance_type = var.webhost_ec2_type
    security_groups = ["${aws_security_group.webhost_security_group.name}"]
    iam_instance_profile = aws_iam_instance_profile.webhost_instance_profile.name
    key_name = "webhost_kp"

    user_data = <<-EOF
        #! /bin/bash
        sudo yum install httpd -y
        sudo systemctl start httpd
        sudo systemctl enable httpd
    EOF

    tags = {
      Name = "project_salvera_ec2_webhost"
    }
}
