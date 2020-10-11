resource "aws_cloudwatch_event_rule" "cron" {
  name                = "notification-service-rule"
  description         = "notification-service rule"
  schedule_expression = "rate(5 minutes)"
}

resource "aws_cloudwatch_event_target" "notification_lambda" {
  rule      = aws_cloudwatch_event_rule.cron.name
  target_id = "notificaiton-service-rule"
  arn       = aws_lambda_function.lambda.arn
}

resource "aws_lambda_permission" "lambda_invoke_permission" {
  statement_id  = "AllowExecutionFromCloudWatch-notification-service-rule"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda.function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.cron.arn
}
