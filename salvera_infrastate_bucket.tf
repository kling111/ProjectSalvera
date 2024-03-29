resource "aws_s3_bucket" "salvera_infrastate_bucket" {
  bucket = "salvera-infrastate-bucket"
}

resource "aws_s3_bucket_acl" "salvera_infrastate_bucket_acl" {
  bucket = aws_s3_bucket.salvera_infrastate_bucket.id
  acl    = "private"
}

resource "aws_s3_bucket_versioning" "salvera_infrastate_bucket_versioning" {
  bucket = aws_s3_bucket.salvera_infrastate_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}
