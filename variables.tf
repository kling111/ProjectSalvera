variable "linux_2_ami" {
    type = string
    description = "AMI for Linux 2"
    default = "ami-0b0dcb5067f052a63"
}

variable "t2_micro_type" {
    type = string
    description = "String for t2_micro EC2 instance type"
    default = "t2.micro"
}