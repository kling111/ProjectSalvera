resource "aws_apigatewayv2_api" "salvera_lambda_gw" {
  name          = "salvera_lambda_gw"
  protocol_type = "HTTP"
  cors_configuration {
    allow_origins = ["*"]
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

resource "aws_apigatewayv2_integration" "apigw_submit_form_integration" {
  api_id = aws_apigatewayv2_api.salvera_lambda_gw.id

  integration_uri    = aws_lambda_function.submit_form.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "apigw_submit_form_route" {
  api_id = aws_apigatewayv2_api.salvera_lambda_gw.id

  route_key = "POST /submit_form"
  target    = "integrations/${aws_apigatewayv2_integration.apigw_submit_form_integration.id}"
}

resource "aws_cloudwatch_log_group" "salvera_api_gw_logs" {
  name = "/aws/api_gw/${aws_apigatewayv2_api.salvera_lambda_gw.name}"

  retention_in_days = 30
}

resource "aws_lambda_permission" "api_gw" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.submit_form.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.salvera_lambda_gw.execution_arn}/*/*"
}
