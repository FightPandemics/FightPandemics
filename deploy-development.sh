#!/bin/bash

. development.env

cat << EOF > backend.tf
terraform {
  backend "s3" {
    bucket = "fp-development-terraform-state"
    region = "us-east-1"
    key = "development.tfstate"
  }
}
EOF

export TF_VAR_env_name=development
export TF_VAR_fp_context=development
export TF_VAR_commit_hash=$(git rev-parse HEAD)
export TF_VAR_aws_region=$AWS_DEFAULT_REGION
export TF_VAR_aws_account_id=$AWS_ACCOUNT_ID

terraform init -reconfigure
terraform $1
