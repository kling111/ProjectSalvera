data "aws_secretsmanager_secret_version" "salvera_aurora_creds" {
  secret_id = var.salvera_aurora_secret
}
