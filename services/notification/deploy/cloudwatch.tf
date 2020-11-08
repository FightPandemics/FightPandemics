locals {
  rules = {
    instant  = "cron(2/5 * ? * * *)" # Every 5th minute of the hour, starting from minute 2
    daily    = "cron(0 2 ? * * *)"   # Every day at 2am UTC
    weekly   = "cron(0 3 ? * MON *)" # Every week on Monday at 3am UTC
    biweekly = "rate(14 days)" # Every two weeks
  }
}

resource "aws_cloudwatch_event_rule" "notification" {
  for_each = local.rules

  name                = "notification-service-${each.key}-rule"
  description         = "notification-service ${each.key} rule"
  schedule_expression = each.value
}

resource "aws_cloudwatch_event_target" "target" {
  for_each = local.rules

  rule      = aws_cloudwatch_event_rule.notification[each.key].name
  target_id = aws_cloudwatch_event_rule.notification[each.key].name
  arn       = aws_lambda_function.lambda.arn
  input = jsonencode({
    frequency = each.key
  })
}

resource "aws_lambda_permission" "permission" {
  for_each = local.rules

  statement_id  = "AllowExecutionFromCloudWatch-notification-service-${each.key}-rule"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda.function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.notification[each.key].arn
}
