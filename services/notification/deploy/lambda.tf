resource "aws_lambda_function" "lambda" {
  filename      = "build.zip"
  function_name = "notification-service"
  role          = aws_iam_role.role.arn
  handler       = "lambda.handler"
  memory_size   = 1024

  source_code_hash = filebase64sha256("build.zip")

  runtime = "nodejs12.x"
  timeout = 300

  vpc_config {
    subnet_ids = data.aws_subnet_ids.private.ids
    security_group_ids = [aws_security_group.notification_service.id]
  }

  environment {
    variables = {
      NODE_ENV                  = var.fp_context
      SES_AWS_REGION            = data.aws_ssm_parameter.aws_ses_region.value
      SES_AWS_ACCESS_KEY_ID     = data.aws_ssm_parameter.aws_ses_access_key_id.value
      SES_AWS_SECRET_ACCESS_KEY = data.aws_ssm_parameter.aws_ses_secret_access_key.value
    }
  }
}
