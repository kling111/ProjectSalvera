output "submit_form" {
  description = "Name of the Lambda function."

  value = aws_lambda_function.submit_form.function_name
}

output "base_url" {
  description = "Base URL for API Gateway stage."

  value = aws_apigatewayv2_stage.salvera_lambda_gw_stage.invoke_url
}

output "aurora_creds" {
  description = "Base URL for API Gateway stage."

  value = jsondecode(data.aws_secretsmanager_secret_version.salvera_aurora_creds.secret_string)["master_username"]

}
