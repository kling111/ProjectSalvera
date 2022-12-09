resource "aws_rds_cluster" "salvera_aurora_cluster" {
  cluster_identifier      = "salvera_db_cluster"
  master_username         = jsondecode(data.aws_secretsmanager_secret_version.salvera_aurora_creds.secret_string)["master_username"]
  master_password         = jsondecode(data.aws_secretsmanager_secret_version.salvera_aurora_creds.secret_string)["master_password"]
}
