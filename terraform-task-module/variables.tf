variable "aws_region" {
  type    = string
  default = "us-east-1"
}
variable "fp_context" {
  type = string
}
variable "image_tag" {}
variable "subdomain" {
  type = string
}
variable "backend_env_variables" {
  default = []
  type = list(object({
    name : string
    value : string
  }))
}
variable "datadog_env_variables" {
  default = []
  type = list(object({
    name : string
    value : string
  }))
}
variable "backend_port" {
  type    = number
  default = 8000
}
variable "client_port" {
  type    = number
  default = 80
}
