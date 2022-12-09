resource "aws_rds_cluster" "salvera_aurora_cluster" {
  cluster_identifier = "salvera-aurora-cluster"
  master_username = jsondecode(data.aws_secretsmanager_secret_version.salvera_aurora_creds.secret_string)["master_username"]
  master_password = jsondecode(data.aws_secretsmanager_secret_version.salvera_aurora_creds.secret_string)["master_password"]
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
