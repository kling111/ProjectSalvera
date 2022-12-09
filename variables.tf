variable "webhost_ec2_ami" {
    type = string
    description = "AMI for the webhost EC2"
}

variable "webhost_ec2_type" {
    type = string
    description = "Instance type of webhost EC2"
}

variable "salvera_aurora_secret" {
    type = string
    description = "Secret ARN for Aurora Cluster creds for Salvera"
}
