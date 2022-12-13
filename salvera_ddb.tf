resource "aws_dynamodb_table" "salvera_patient_data" {
  name             = "salvera_patient_data"
  hash_key         = "patient_id"
  billing_mode     = "PAY_PER_REQUEST"
  stream_enabled   = true
  stream_view_type = "NEW_AND_OLD_IMAGES"

  attribute {
    name = "patient_id"
    type = "S"
  }
}
