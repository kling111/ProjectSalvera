resource "aws_dynamodb_table" "salvera_patient_data" {
  name           = "salvera_patient_data"
  hash_key       = "patient_uuid"
  billing_mode   = "PAY_PER_REQUEST"
  stream_enabled = true

  attribute {
    name = "patient_uuid"
    type = "S"
  }
}
