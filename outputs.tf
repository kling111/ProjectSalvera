output "submit_form" {
  description = "Name of the Lambda function."

  value = aws_lambda_function.submit_form.function_name
}