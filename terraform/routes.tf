# Lambda integration
resource "aws_apigatewayv2_integration" "instruction_handler" {
  api_id = data.aws_apigatewayv2_api.gateway_lookup.id

  integration_uri        = aws_lambda_function.instruction_handler.invoke_arn
  integration_type       = "AWS_PROXY"
  integration_method     = "POST"
  payload_format_version = "2.0"

  description = "Integration for engraver handler Lambda"
}

# Route: GET /instruction (list all instructions with pagination)
resource "aws_apigatewayv2_route" "get_instructions" {
  api_id    = data.aws_apigatewayv2_api.gateway_lookup.id
  route_key = "GET /instruction"
  target    = "integrations/${aws_apigatewayv2_integration.instruction_handler.id}"
}

# Route: GET /instruction/{id} (get specific instruction)
resource "aws_apigatewayv2_route" "get_instruction_by_id" {
  api_id    = data.aws_apigatewayv2_api.gateway_lookup.id
  route_key = "GET /instruction/{id}"
  target    = "integrations/${aws_apigatewayv2_integration.instruction_handler.id}"
}

# Route: POST /instruction (create new instruction)
resource "aws_apigatewayv2_route" "post_instruction" {
  api_id    = data.aws_apigatewayv2_api.gateway_lookup.id
  route_key = "POST /instruction"
  target    = "integrations/${aws_apigatewayv2_integration.instruction_handler.id}"
}

# Route: OPTIONS /instruction (CORS preflight)
# resource "aws_apigatewayv2_route" "options_instructions" {
#  api_id    = data.aws_apigatewayv2_api.gateway_lookup.id
#  route_key = "OPTIONS /instruction"
#  target    = "integrations/${aws_apigatewayv2_integration.instruction_handler.id}"
#}

# Route: OPTIONS /instructions/{id} (CORS preflight)
resource "aws_apigatewayv2_route" "options_instruction_by_id" {
  api_id    = data.aws_apigatewayv2_api.gateway_lookup.id
  route_key = "OPTIONS /instruction/{id}"
  target    = "integrations/${aws_apigatewayv2_integration.instruction_handler.id}"
}

# Lambda permission for API Gateway to invoke the function
resource "aws_lambda_permission" "api_gateway_invoke" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.instruction_handler.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${data.aws_apigatewayv2_api.gateway_lookup.execution_arn}/*/*"
}