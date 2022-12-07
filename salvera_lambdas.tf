resource "aws_lambda_function" "submit_form" {
  function_name = "SubmitForm"

  s3_bucket = aws_s3_bucket.lambda_bucket.id
  s3_key    = aws_s3_object.lambdas_upload.key

  runtime = "python3.9"
  handler = "submit_form.handler"

  source_code_hash = data.archive_file.lambdas_zip.output_base64sha256

  role = aws_iam_role.salvera_lambda_role.arn
}

resource "aws_cloudwatch_log_group" "submit_form_logs" {
  name = "/aws/lambda/${aws_lambda_function.submit_form.function_name}"

  retention_in_days = 30
}

resource "aws_iam_role" "salvera_lambda_role" {
  name = "salvera_lambda"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Sid    = ""
      Principal = {
        Service = "lambda.amazonaws.com"
      }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "salvera_lambda_policy" {
  role       = aws_iam_role.salvera_lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess"
}