locals {
  backend_container_definition = {
    cpu               = 512
    name              = "backend"
    essential         = true
    image             = "fightpandemics/backend:${var.image_tag}"
    memory            = 4096
    memoryReservation = 1024
    portMappings = [
      {
        containerPort = var.backend_port
        hostPort      = var.backend_port
      }
    ]
    logConfiguration = {
      logDriver = "awslogs"
      options = {
        awslogs-region        = var.aws_region
        awslogs-group         = "/ecs/${var.subdomain}-backend"
        awslogs-stream-prefix = var.fp_context
      }
    }
    environment = var.backend_env_variables
  }
  client_container_definition = {
    cpu               = 256
    name              = "client"
    essential         = true
    image             = "fightpandemics/client:${var.image_tag}"
    memory            = 4096
    memoryReservation = 1024
    portMappings = [
      {
        containerPort = var.client_port
        hostPort      = var.client_port
      }
    ]
    logConfiguration = {
      logDriver = "awslogs"
      options = {
        awslogs-region        = var.aws_region
        awslogs-group         = "/ecs/${var.subdomain}-client"
        awslogs-stream-prefix = var.fp_context
      }
    }
    environment = var.client_env_variables
  }
  datadog_container_definition = {
    cpu               = 10
    name              = "datadog-agent"
    essential         = true
    image             = "datadog/agent:latest"
    memory            = 512
    memoryReservation = 256
    logConfiguration = {
      logDriver = "awslogs"
      options = {
        awslogs-region        = var.aws_region
        awslogs-group         = "/ecs/${var.subdomain}-datadog"
        awslogs-stream-prefix = var.fp_context
      }
    }
    environment = var.datadog_env_variables
  }
}

resource "aws_ecs_task_definition" "app" {
  family                   = var.subdomain
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 1024
  memory                   = 4096
  execution_role_arn       = data.aws_iam_role.ecs_execution_role.arn
  task_role_arn            = data.aws_iam_role.ecs_execution_role.arn
  container_definitions    = var.fp_context == "production" ? jsonencode([
      local.backend_container_definition,
      local.client_container_definition,
      local.datadog_container_definition
    ]) : jsonencode([
      local.backend_container_definition,
      local.client_container_definition
    ])
}
