resource "aws_s3_bucket" "web_contents_bucket" {
  bucket = "web_contents_bucket"
  acl    = "private"
}

resource "aws_s3_bucket_object" "web_contents_html" {
  bucket = aws_s3_bucket.web_contents_bucket.id
  key    = "profile"
  acl    = "web_contents.html"
  source = "web_contents.html"
}