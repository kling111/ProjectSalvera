resource "aws_s3_bucket" "lambda_bucket" {
  bucket = "project-salvera-lambda-bucket"
}

resource "aws_s3_bucket_acl" "lambda_bucket_acl" {
  bucket = aws_s3_bucket.lambda_bucket.id
  acl    = "private"
}

resource "aws_s3_bucket_versioning" "lambda_bucket_versioning" {
  bucket = aws_s3_bucket.lambda_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

data "archive_file" "lambdas_zip" {
  type = "zip"

  source_dir  = "lambdas/"
  output_path = "lambdas.zip"
}

resource "aws_s3_object" "lambdas_upload" {
  bucket = aws_s3_bucket.lambda_bucket.id

  key    = "salvera_lambdas.zip"
  source = data.archive_file.lambdas_zip.output_path

  etag = filemd5(data.archive_file.lambdas_zip.output_path)
}
