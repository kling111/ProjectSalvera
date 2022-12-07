resource "aws_s3_bucket" "web_contents_bucket" {
  bucket = "project-salvera-web-contents"
}

resource "aws_s3_bucket_acl" "web_contents_bucket_acl" {
  bucket = aws_s3_bucket.web_contents_bucket.id
  acl    = "private"
}

resource "aws_s3_bucket_versioning" "web_contents_bucket_versioning" {
  bucket = aws_s3_bucket.web_contents_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_object" "web_content" {
  for_each = fileset("salvera_web_contents/", "**")

  bucket = aws_s3_bucket.web_contents_bucket.id
  key    = each.value
  acl = "private"
  source = "salvera_web_contents/${each.value}"
  etag   = filemd5("salvera_web_contents/${each.value}")
}
