resource "aws_instance" "ec2_test" {
    ami = var.linux_2_ami
    instance_type = var.t2_micro_type

    tags = {
      Name = "test-123"
    }
}