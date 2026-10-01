#!/bin/bash
# Paso 1 (antes del cambio de DNS): sloggett.com.ar por HTTP + challenge ACME.
set -e
CONF=~/yaghanhostel/docker/nginx/production.conf
BAK=$CONF.bak-$(date +%Y%m%d-%H%M%S)

if grep -q '# >>> sloggett-dominio' "$CONF"; then
  echo "El bloque de sloggett.com.ar ya existe, no hago nada."
  exit 0
fi

cp "$CONF" "$BAK"
echo "Backup: $BAK"

# Append (no reemplazar): el archivo está montado como bind de un solo archivo.
cat >> "$CONF" <<'EOF'

# >>> sloggett-dominio
server {
    listen 80;
    server_name sloggett.com.ar www.sloggett.com.ar;

    location /.well-known/acme-challenge/ {
        root /certbot;
    }

    location / {
        resolver 127.0.0.11 valid=30s;
        set $sloggett http://sloggett-web:3000;
        proxy_pass $sloggett;

        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
# <<< sloggett-dominio
EOF

if docker exec yaghanhostel_nginx nginx -t; then
  docker exec yaghanhostel_nginx nginx -s reload
  echo "OK: nginx recargado."
else
  cat "$BAK" > "$CONF"
  echo "ERROR en la config: restaurado el backup, nginx sin cambios."
  exit 1
fi
