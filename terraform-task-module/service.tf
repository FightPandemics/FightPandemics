locals {
  desired_count = {
    development = 1
    review      = 1
    staging     = 2
    production  = 2
  }
}

resource "aws_ecs_service" "app" {
  name            = var.subdomain
  task_definition = aws_ecs_task_definition.app.arn
  cluster         = data.aws_ecs_cluster.main.id

  desired_count = local.desired_count[var.fp_context]
  launch_type   = "FARGATE"
  network_configuration {
    subnets          = data.aws_subnet_ids.private.ids
    security_groups  = [aws_security_group.app.id, data.aws_security_group.default.id]
    assign_public_ip = true
  }
  load_balancer {
    target_group_arn = aws_alb_target_group.app.arn
    container_name   = "client"
    container_port   = var.client_port
  }
  lifecycle {
    ignore_changes = [desired_count]
  }
}
