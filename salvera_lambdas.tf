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

resource "aws_lambda_function" "submit_collector_registration" {
  function_name = "SubmitCollectorRegistration"

  s3_bucket = aws_s3_bucket.lambda_bucket.id
  s3_key    = aws_s3_object.lambdas_upload.key

  runtime = "python3.9"
  handler = "submit_collector_registration.handler"

  timeout = 900

  source_code_hash = data.archive_file.lambdas_zip.output_base64sha256

  role = aws_iam_role.salvera_lambda_role.arn
}

resource "aws_cloudwatch_log_group" "submit_collector_registration_logs" {
  name = "/aws/lambda/${aws_lambda_function.submit_collector_registration.function_name}"

  retention_in_days = 30
}

resource "aws_lambda_function" "retrieve_data_collectors" {
  function_name = "RetrieveDataCollectors"

  s3_bucket = aws_s3_bucket.lambda_bucket.id
  s3_key    = aws_s3_object.lambdas_upload.key

  runtime = "python3.9"
  handler = "retrieve_data_collectors.handler"

  timeout = 900

  source_code_hash = data.archive_file.lambdas_zip.output_base64sha256

  role = aws_iam_role.salvera_lambda_role.arn
}

resource "aws_cloudwatch_log_group" "retrieve_data_collectors_logs" {
  name = "/aws/lambda/${aws_lambda_function.retrieve_data_collectors.function_name}"

  retention_in_days = 30
}

resource "aws_lambda_function" "retrieve_patient_data" {
  function_name = "RetrievePatientData"

  s3_bucket = aws_s3_bucket.lambda_bucket.id
  s3_key    = aws_s3_object.lambdas_upload.key

  runtime = "python3.9"
  handler = "retrieve_patient_data.handler"

  timeout = 900

  source_code_hash = data.archive_file.lambdas_zip.output_base64sha256

  role = aws_iam_role.salvera_lambda_role.arn
}

resource "aws_cloudwatch_log_group" "retrieve_patient_data_logs" {
  name = "/aws/lambda/${aws_lambda_function.retrieve_patient_data.function_name}"

  retention_in_days = 30
}

resource "aws_lambda_function" "submit_data_collection" {
  function_name = "SubmitDataCollection"

  s3_bucket = aws_s3_bucket.lambda_bucket.id
  s3_key    = aws_s3_object.lambdas_upload.key

  runtime = "python3.9"
  handler = "submit_data_collection.handler"

  timeout = 900

  source_code_hash = data.archive_file.lambdas_zip.output_base64sha256

  role = aws_iam_role.salvera_lambda_role.arn
}

resource "aws_cloudwatch_log_group" "submit_data_collection_logs" {
  name = "/aws/lambda/${aws_lambda_function.submit_data_collection.function_name}"

  retention_in_days = 30
}

resource "aws_lambda_function" "upload_bmi_json" {
  function_name = "UploadBMIJson"

  s3_bucket = aws_s3_bucket.lambda_bucket.id
  s3_key    = aws_s3_object.lambdas_upload.key

  runtime = "python3.9"
  handler = "upload_bmi_json.handler"

  timeout = 900

  source_code_hash = data.archive_file.lambdas_zip.output_base64sha256

  role = aws_iam_role.salvera_lambda_role.arn
}

resource "aws_lambda_event_source_mapping" "upload_bmi_json_event_source" {
  event_source_arn  = aws_dynamodb_table.salvera_patient_data.stream_arn
  function_name     = aws_lambda_function.upload_bmi_json.arn
  starting_position = "LATEST"
}

resource "aws_cloudwatch_log_group" "upload_bmi_json_logs" {
  name = "/aws/lambda/${aws_lambda_function.upload_bmi_json.function_name}"

  retention_in_days = 30
}
