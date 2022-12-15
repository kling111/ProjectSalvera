resource "aws_apigatewayv2_api" "salvera_lambda_gw" {
  name          = "salvera_lambda_gw"
  protocol_type = "HTTP"
  cors_configuration {
    allow_origins  = ["*"]
    allow_headers  = ["*"]
    allow_methods  = ["*"]
    expose_headers = ["*"]
  }
}

resource "aws_apigatewayv2_stage" "salvera_lambda_gw_stage" {
  api_id = aws_apigatewayv2_api.salvera_lambda_gw.id

  name        = "salvera_lambda_gw_stage"
  auto_deploy = true

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.salvera_api_gw_logs.arn

    format = jsonencode({
      requestId               = "$context.requestId"
      sourceIp                = "$context.identity.sourceIp"
      requestTime             = "$context.requestTime"
      protocol                = "$context.protocol"
      httpMethod              = "$context.httpMethod"
      resourcePath            = "$context.resourcePath"
      routeKey                = "$context.routeKey"
      status                  = "$context.status"
      responseLength          = "$context.responseLength"
      integrationErrorMessage = "$context.integrationErrorMessage"
      }
    )
  }
}

resource "aws_apigatewayv2_integration" "apigw_submit_collector_registration_integration" {
  api_id = aws_apigatewayv2_api.salvera_lambda_gw.id

  integration_uri    = aws_lambda_function.submit_collector_registration.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "apigw_submit_collector_registration_route" {
  api_id = aws_apigatewayv2_api.salvera_lambda_gw.id

  route_key = "POST /submit_collector_registration"
  target    = "integrations/${aws_apigatewayv2_integration.apigw_submit_collector_registration_integration.id}"
}

resource "aws_apigatewayv2_integration" "apigw_retrieve_data_collectors_integration" {
  api_id = aws_apigatewayv2_api.salvera_lambda_gw.id

  integration_uri    = aws_lambda_function.retrieve_data_collectors.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "apigw_retrieve_data_collectors_route" {
  api_id = aws_apigatewayv2_api.salvera_lambda_gw.id

  route_key = "GET /retrieve_data_collectors"
  target    = "integrations/${aws_apigatewayv2_integration.apigw_retrieve_data_collectors_integration.id}"
}

resource "aws_apigatewayv2_integration" "apigw_retrieve_patient_data_integration" {
  api_id = aws_apigatewayv2_api.salvera_lambda_gw.id

  integration_uri    = aws_lambda_function.retrieve_patient_data.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "apigw_retrieve_patient_data_route" {
  api_id = aws_apigatewayv2_api.salvera_lambda_gw.id

  route_key = "GET /retrieve_patient_data"
  target    = "integrations/${aws_apigatewayv2_integration.apigw_retrieve_patient_data_integration.id}"
}

resource "aws_apigatewayv2_integration" "apigw_submit_data_collection_integration" {
  api_id = aws_apigatewayv2_api.salvera_lambda_gw.id

  integration_uri    = aws_lambda_function.submit_data_collection.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "apigw_submit_data_collection_route" {
  api_id = aws_apigatewayv2_api.salvera_lambda_gw.id

  route_key = "POST /submit_data_collection"
  target    = "integrations/${aws_apigatewayv2_integration.apigw_submit_data_collection_integration.id}"
}

resource "aws_cloudwatch_log_group" "salvera_api_gw_logs" {
  name = "/aws/api_gw/${aws_apigatewayv2_api.salvera_lambda_gw.name}"

  retention_in_days = 30
}

# Lambda/APIGW Permissions

resource "aws_lambda_permission" "submit_collector_registration_api_gw_permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.submit_collector_registration.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.salvera_lambda_gw.execution_arn}/*/*"
}

resource "aws_lambda_permission" "retrieve_data_collectors_api_gw_permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.retrieve_data_collectors.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.salvera_lambda_gw.execution_arn}/*/*"
}

resource "aws_lambda_permission" "retrieve_patient_data_api_gw_permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.retrieve_patient_data.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.salvera_lambda_gw.execution_arn}/*/*"
}

resource "aws_lambda_permission" "submit_data_collection_api_gw_permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.submit_data_collection.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.salvera_lambda_gw.execution_arn}/*/*"
}
