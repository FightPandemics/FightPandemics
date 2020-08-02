resource "aws_alb_target_group" "app" {
  name        = replace(substr(var.subdomain, 0, 32), "/-$/", "")
  port        = var.client_port
  protocol    = "HTTP"
  vpc_id      = data.aws_vpc.main.id
  target_type = "ip"
  health_check {
    enabled = true
    matcher = "200,401,404"
  }
}

resource "aws_alb_listener_rule" "main" {
  listener_arn = data.aws_alb_listener.main.arn
  action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.app.arn
  }
  condition {
    host_header {
      values = [var.fp_context == "production" ? "fightpandemics.com" : "${var.subdomain}.*"]
    }
  }
}

resource "aws_alb_listener_rule" "redirect" {
  count        = var.fp_context == "production" ? 1 : 0
  listener_arn = data.aws_alb_listener.main.arn
  action {
    type = "redirect"

    redirect {
      host        = "fightpandemics.com"
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
  condition {
    host_header {
      values = ["*.fightpandemics.com"]
    }
  }
}
