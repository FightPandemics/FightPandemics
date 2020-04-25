module "main" {
  source     = "github.com/FightPandemics/tf-fargate-task//module"
  image_tag  = var.branch
  fp_context = var.fp_context
  subdomain  = var.branch
  backend_env_variables = [
    {
      name  = "PORT"
      value = "8000"
    },
    {
      name  = "MONGO_URI"
      value = "localhost:27017"
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
      value = "fightingpandemics.eu.auth0.com"
    },
    {
      name  = "AUTH_CLIENT_ID"
      value = var.auth_client_id
    }
  ]
}
