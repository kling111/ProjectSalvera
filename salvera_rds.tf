resource "aws_security_group" "mysql_security_group" {
    name = "mysql_security_group"
    description = "Allows port connections for MySQL database"

    ingress {
        from_port = 3306
        to_port = 3306
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

resource "aws_rds_cluster" "salvera_aurora_cluster" {
  cluster_identifier = "salvera-aurora-cluster"
  master_username = jsondecode(data.aws_secretsmanager_secret_version.salvera_aurora_creds.secret_string)["master_username"]
  master_password = jsondecode(data.aws_secretsmanager_secret_version.salvera_aurora_creds.secret_string)["master_password"]
  vpc_security_group_ids = ["${aws_security_group.mysql_security_group.id}"]
}

resource "aws_rds_cluster_instance" "salvera_aurora_instance" {
  count              = 1
  identifier         = "${aws_rds_cluster.salvera_aurora_cluster.id}-instance-${count.index}"
  cluster_identifier = aws_rds_cluster.salvera_aurora_cluster.id
  instance_class     = "db.t3.small"
  engine             = aws_rds_cluster.salvera_aurora_cluster.engine
  engine_version     = aws_rds_cluster.salvera_aurora_cluster.engine_version
  publicly_accessible = true
}
