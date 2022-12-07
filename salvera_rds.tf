resource "aws_db_instance" "salvera_admins" {
  allocated_storage    = 10
  db_name              = "salvera_admins"
  engine               = "mysql"
  instance_class       = "db.t3.micro"
  username             = "kdling"
  password             = "ProjectSalver123"
}