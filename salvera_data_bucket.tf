resource "aws_s3_bucket" "salvera_data_bucket" {
  bucket = "project-salvera-data-bucket"
}

resource "aws_s3_bucket_acl" "salvera_data_bucket_acl" {
  bucket = aws_s3_bucket.salvera_data_bucket.id
  acl    = "private"
}

resource "aws_s3_bucket_versioning" "salvera_data_bucket_versioning" {
  bucket = aws_s3_bucket.salvera_data_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}
