variable "aws_region" {
  type = string
}

variable "env_name" {
  type = string
}

variable "fp_context" {
  type = string
}

variable "commit_hash" {
  type    = string
  default = ""
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

data "aws_ssm_parameter" "auth_domain" {
  name = "/fp/auth/domain"
}

data "aws_ssm_parameter" "auth_client_id" {
  name = "/fp/auth/client_id"
}

data "aws_ssm_parameter" "auth_client_secret" {
  name = "/fp/auth/client_secret"
}

data "aws_ssm_parameter" "google_maps_api_key" {
  count = var.fp_context == "development" ? 0 : 1
  name  = "/fp/googlemaps/key"
}

data "aws_ssm_parameter" "sendgrid_api_key" {
  count = var.fp_context == "development" ? 0 : 1
  name  = "/fp/sendgrid/key"
}

data "aws_ssm_parameter" "sendgrid_contact_list_id" {
  count = var.fp_context == "development" ? 0 : 1
  name  = "/fp/sendgrid/contact_list_id"
}

data "aws_ssm_parameter" "sentry_dsn" {
  count = var.fp_context == "development" ? 0 : 1
  name  = "/fp/sentry/dsn"
}

data "aws_ssm_parameter" "seo4ajax_api_key" {
  count = contains(["staging", "review"], var.fp_context) ? 0 : 1
  name  = "/fp/seo4ajax/api_key"
}

data "aws_ssm_parameter" "logger_host" {
  count = var.fp_context == "development" ? 0 : 1
  name  = "/fp/logger/host"
}

data "aws_ssm_parameter" "logger_port" {
  count = var.fp_context == "development" ? 0 : 1
  name  = "/fp/logger/port"
}

data "aws_ssm_parameter" "datadog_api_key" {
  count = var.fp_context == "production" ? 1 : 0
  name  = "/fp/datadog/key"
}

locals {
  app_domain = {
    review      = "fightpandemics.xyz"
    staging     = "fightpandemics.work"
    production  = "fightpandemics.com"
    development = "fightpandemics.online"
  }

  auth_app_url = {
    review      = "https://review.fightpandemics.xyz"
    staging     = "https://staging.fightpandemics.work"
    production  = "https://production.fightpandemics.com"
    development = "https://development.fightpandemics.online"
  }
}

module "main" {
  source     = "./terraform-task-module"
  aws_region = var.aws_region
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
      value = "mongodb+srv://${data.aws_ssm_parameter.db_user.value}:${data.aws_ssm_parameter.db_password.value}@${data.aws_ssm_parameter.db_host.value}/${var.env_name}?retryWrites=true&w=majority"
    },
    {
      name  = "APP_DOMAIN"
      value = local.app_domain[var.fp_context]
    },
    {
      name  = "AUTH_STATE"
      value = "fight-pandemics"
    },
    {
      name  = "AUTH_APP_URL"
      value = local.auth_app_url[var.fp_context]
    },
    {
      name  = "AUTH_SECRET_KEY"
      value = data.aws_ssm_parameter.auth_client_secret.value
    },
    {
      name  = "AUTH_DOMAIN"
      value = data.aws_ssm_parameter.auth_domain.value
    },
    {
      name  = "AUTH_CLIENT_ID"
      value = data.aws_ssm_parameter.auth_client_id.value
    },
    {
      name  = "GOOGLE_MAPS_API_KEY"
      value = var.fp_context == "development" ? "" : data.aws_ssm_parameter.google_maps_api_key[0].value
    },
    {
      name  = "SENDGRID_API_KEY"
      value = var.fp_context == "development" ? "" : data.aws_ssm_parameter.sendgrid_api_key[0].value
    },
    {
      name  = "SENDGRID_CONTACTS_LIST_ID"
      value = var.fp_context == "development" ? "" : data.aws_ssm_parameter.sendgrid_contact_list_id[0].value
    },
    {
      name  = "NODE_ENV"
      value = var.env_name
    },
    {
      name  = "SENTRY_DSN",
      value = var.fp_context == "development" ? "" : data.aws_ssm_parameter.sentry_dsn[0].value
    },
    {
      name  = "COMMIT_HASH",
      value = var.commit_hash
    },
    {
      name  = "LOGGER_LEVEL",
      value = "warn"
    },
    {
      name  = "LOGGER_HOST",
      value = var.fp_context == "development" ? "" : data.aws_ssm_parameter.logger_host[0].value
    },
    {
      name  = "LOGGER_PORT",
      value = var.fp_context == "development" ? "1234" : data.aws_ssm_parameter.logger_port[0].value
    },
  ]
  client_env_variables = [
    {
      name  = "SEO4AJAX_API_KEY"
      value = contains(["staging", "review"], var.fp_context) ? "" : data.aws_ssm_parameter.seo4ajax_api_key[0].value
    },
  ]
  datadog_env_variables = [
    {
      name  = "DD_API_KEY",
      value = var.fp_context == "production" ? data.aws_ssm_parameter.datadog_api_key[0].value : ""
    },
    {
      name  = "DD_SITE",
      value = "datadoghq.eu"
    },
    {
      name  = "ECS_FARGATE",
      value = "true"
    }
  ]
}
