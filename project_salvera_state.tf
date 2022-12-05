terraform {
  backend "s3" {
      bucket = "salvera-infrastate-bucket"
      key = "salvera-infra-state.tfstate"
      encrypt = true
      region = "us-east-1"
  }
}