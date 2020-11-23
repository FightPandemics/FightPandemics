variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "fp_context" {
  type = string
}

provider "aws" {
  region  = var.aws_region
  version = "~> 3.0"
}
