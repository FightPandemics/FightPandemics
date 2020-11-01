resource "aws_cloudwatch_event_rule" "instant" {
  name                = "notification-service-instant-rule"
  description         = "notification-service instant rule"
  schedule_expression = "rate(5 minutes)"
}

resource "aws_cloudwatch_event_target" "instant_target" {
  rule      = aws_cloudwatch_event_rule.instant.name
  target_id = aws_cloudwatch_event_rule.instant.name
  arn       = aws_lambda_function.lambda.arn
  input = jsonencode({
    frequency = "instant"
  })
}

resource "aws_lambda_permission" "instant" {
  statement_id  = "AllowExecutionFromCloudWatch-notification-service-instant-rule"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda.function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.instant.arn
}

// TODO Add daily, weekly, biweekly Cloudwatch rules