# main.tf  
provider "aws" { 
  region = "us-east-1"
}

resource "aws_instance" "agro_data_server" {
  ami           = "ami-0c55b159cbfafe1f0" # Imagen base de Ubuntu
  instance_type = "t2.micro"              # Tamaño del servidor

  tags = {
    Name = "Avocado-Quality-AI-Server"
  }
}