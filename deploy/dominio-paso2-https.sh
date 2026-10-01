#!/bin/bash
# Paso 2 (después del cambio de DNS): certificado Let's Encrypt + HTTPS para sloggett.com.ar.
set -e
IP=52.0.234.150
CONF=~/yaghanhostel/docker/nginx/production.conf

for d in sloggett.com.ar www.sloggett.com.ar; do
  r=$(getent ahostsv4 "$d" | awk 'NR==1{print $1}')
  if [ "$r" != "$IP" ]; then
    echo "ERROR: $d todavía apunta a '$r' (esperado $IP). Esperá la propagación del DNS."
    exit 1
  fi
done
echo "DNS OK."

docker exec yaghanhostel_certbot certbot certonly --webroot -w /certbot \
  -d sloggett.com.ar -d www.sloggett.com.ar \
  --agree-tos --non-interactive --keep-until-expiring
echo "Certificado OK."

BAK=$CONF.bak-$(date +%Y%m%d-%H%M%S)
cp "$CONF" "$BAK"
echo "Backup: $BAK"

TMP=$(mktemp)
# Quita el bloque HTTP de sloggett y la vista previa por IP.
sed -e '/# >>> sloggett-dominio/,/# <<< sloggett-dominio/d' \
    -e '/# --- Sloggett: vista previa por IP/,/^}/d' "$CONF" > "$TMP"

cat >> "$TMP" <<'EOF'
# >>> sloggett-dominio
server {
    listen 80;
    server_name sloggett.com.ar www.sloggett.com.ar;

    location /.well-known/acme-challenge/ {
        root /certbot;
    }
    location / {
        return 301 https://sloggett.com.ar$request_uri;
    }
}

server {
    listen 443 ssl;
    server_name www.sloggett.com.ar;
    ssl_certificate     /etc/letsencrypt/live/sloggett.com.ar/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/sloggett.com.ar/privkey.pem;
    return 301 https://sloggett.com.ar$request_uri;
}

server {
    listen 443 ssl;
    server_name sloggett.com.ar;

    ssl_certificate     /etc/letsencrypt/live/sloggett.com.ar/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/sloggett.com.ar/privkey.pem;
    ssl_protocols       TLSv1.2 TLSv1.3;
    ssl_ciphers         HIGH:!aNULL:!MD5;

    client_max_body_size 5m;

    location / {
        resolver 127.0.0.11 valid=30s;
        set $sloggett http://sloggett-web:3000;
        proxy_pass $sloggett;

        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_buffering off;
    }
}
# <<< sloggett-dominio
EOF

# Escribir en el mismo inode (bind de un solo archivo).
cat "$TMP" > "$CONF"
rm -f "$TMP"

if docker exec yaghanhostel_nginx nginx -t; then
  docker exec yaghanhostel_nginx nginx -s reload
  echo "OK: HTTPS activo para sloggett.com.ar."
else
  cat "$BAK" > "$CONF"
  echo "ERROR en la config: restaurado el backup, nginx sin cambios."
  exit 1
fi
