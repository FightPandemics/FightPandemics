variable "env_name" {
  type = string
}
variable "fp_context" {
  type = string
}
variable "auth_secret_key" {
  type = string
}
variable "auth_client_id" {
  type = string
}

data "aws_ssm_parameter" "db_host" {
  name = "/fp/database/host"
}

data "aws_ssm_parameter" "db_user" {
  name = "/fp/database/user"
}

data "aws_ssm_parameter" "db_password" {
  name = "/fp/database/password"
}

module "main" {
  source     = "github.com/FightPandemics/tf-fargate-task//module"
  image_tag  = var.env_name
  fp_context = var.fp_context
  subdomain  = var.env_name
  backend_env_variables = [
    {
      name  = "PORT"
      value = "8000"
    },
    {
      name  = "MONGO_URI"
      value = "${data.aws_ssm_parameter.db_user.value}:${data.aws_ssm_parameter.db_password.value}@${data.aws_ssm_parameter.db_host.value}:27017/fightpandemics"
    },
    {
      name  = "GEO_SERVICE_URL"
      value = "localhost:5000"
    },
    {
      name  = "AUTH_STATE"
      value = "fight-pandemics"
    },
    {
      name  = "AUTH_APP_URL"
      value = "http://localhost:8000"
    },
    {
      name  = "AUTH_SECRET_KEY"
      value = var.auth_secret_key
    },
    {
      name  = "AUTH_DOMAIN"
      value = "fightpandemics.eu.auth0.com"
    },
    {
      name  = "AUTH_CLIENT_ID"
      value = var.auth_client_id
    },
    {
      name  = "NODE_ENV"
      value = var.env_name
    },
  ]
}
