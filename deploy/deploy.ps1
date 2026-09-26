# Compila la imagen, la sube a la EC2 y reinicia el contenedor.
# Uso (desde la raíz del proyecto, con Docker Desktop abierto):  .\deploy\deploy.ps1
$ErrorActionPreference = "Stop"
$Key = "$HOME\.ssh\yaghanhostel-key.pem"
$Server = "ec2-user@52.0.234.150"
$Image = "ghcr.io/sebakatzman/sloggett:latest"

docker build -t $Image .
docker save -o sloggett.tar $Image
scp -i $Key sloggett.tar "${Server}:~/sloggett/"
Remove-Item sloggett.tar
ssh -i $Key $Server "cd ~/sloggett && docker load -i sloggett.tar && rm sloggett.tar && docker-compose -f docker-compose.prod.yml up -d && docker image prune -f"
