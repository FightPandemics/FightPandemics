resource "aws_iam_role" "role" {
  name        = "notification-service-role"
  description = "Role for notification-service Lambda to access AWS services"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": ["lambda.amazonaws.com"]
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_policy" "policy" {
  name        = "notification-service-policy"
  path        = "/"
  description = "IAM policy for notification-service"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*",
      "Effect": "Allow"
    },
    {
      "Action": [
        "ec2:CreateNetworkInterface",
        "ec2:DescribeNetworkInterfaces",
        "ec2:DetachNetworkInterface",
        "ec2:DeleteNetworkInterface"
      ],
      "Resource": "*",
      "Effect": "Allow"
    },
    {
      "Action": [
        "sqs:GetQueueAttributes",
        "sqs:DeleteMessage",
        "sqs:DeleteMessageBatch",
        "sqs:SendMessageBatch",
        "sqs:ReceiveMessage",
        "sqs:SendMessage"
      ],
      "Resource": "*",
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "policy_attachment" {
  role       = aws_iam_role.role.name
  policy_arn = aws_iam_policy.policy.arn
}

# TODO no† sure if necessary; remove if it isn't
resource "aws_iam_role" "api_gateway_role" {
  name        = "notification-service-api-gateway-role"
  description = "Role for API Gateway to invoke notification-service Lambda"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": ["apigateway.amazonaws.com"]
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_policy" "lambda_invoke_policy" {
  name        = "notification-service-invoke-policy"
  path        = "/"
  description = "IAM Lambda invoke policy for notification-service"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "lambda:InvokeFunction",
      "Resource": "*"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "api_gateway_lambda_invoke_policy_attachment" {
  role       = aws_iam_role.api_gateway_role.name
  policy_arn = aws_iam_policy.lambda_invoke_policy.arn
}
