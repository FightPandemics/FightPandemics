data "aws_security_group" "default" {
  name   = "default"
  vpc_id = data.aws_vpc.main.id
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
