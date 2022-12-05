terraform {
  backend "s3" {
      bucket = "project-salvera-pipeline-state"
      key = "salvera-infra-state.tfstate"
      encrypt = true
      region = "us-east-1"
  }
}