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
variable "mongo_uri" {
  type = string
  default = "localhost:27017"
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
      value = var.mongo_uri
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
    }
  ]
}
