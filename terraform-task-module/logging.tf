resource "aws_cloudwatch_log_group" "backend" {
  name              = "/ecs/${var.subdomain}-backend"
  retention_in_days = 1
}
resource "aws_cloudwatch_log_group" "client" {
  name              = "/ecs/${var.subdomain}-client"
  retention_in_days = 1
}
resource "aws_cloudwatch_log_group" "datadog-agent" {
  count             = var.fp_context == "production" ? 1 : 0
  name              = "/ecs/${var.subdomain}-datadog"
  retention_in_days = 1
}
