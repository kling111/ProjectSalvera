resource "aws_s3_bucket" "web_contents_bucket" {
  bucket = "web_contents_bucket"
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

resource "aws_s3_bucket_object" "web_contents_html" {
  bucket = aws_s3_bucket.web_contents_bucket.id
  key    = "profile"
  acl    = "web_contents.html"
  source = "web_contents.html"
}
