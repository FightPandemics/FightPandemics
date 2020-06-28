resource "aws_security_group" "app" {
  name        = var.subdomain
  description = "allow inbound access from the vpc only"
  vpc_id      = data.aws_vpc.main.id

  ingress {
    protocol    = "tcp"
    from_port   = var.client_port
    to_port     = var.client_port
    cidr_blocks = [data.aws_vpc.main.cidr_block]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}
