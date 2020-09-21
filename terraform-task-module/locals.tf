provider "aws" {
  region  = var.aws_region
  version = "~> 3.0"
}

data "aws_ecs_cluster" "main" {
  cluster_name = "${var.fp_context}-cluster"
}

data "aws_security_group" "default" {
  name   = "default"
  vpc_id = data.aws_vpc.main.id
}

data "aws_alb" "main" {
  name = "${var.fp_context}-alb"
}

data "aws_alb_listener" "main" {
  load_balancer_arn = data.aws_alb.main.arn
  port              = 443
}

data "aws_vpc" "main" {
  filter {
    name   = "tag:Name"
    values = [var.fp_context]
  }
}

data "aws_subnet_ids" "private" {
  vpc_id = data.aws_vpc.main.id
  tags = {
    Tier = "private"
  }
}

data "aws_iam_role" "ecs_execution_role" {
  name = "ecs-task-execution"
}
