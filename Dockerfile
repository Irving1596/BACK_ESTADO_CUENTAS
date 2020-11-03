# Lo iniciamos con la imagen oficial de Node 13
#Maintainer <Irving Sanchez> irving.sanchezp@up.ac.pa
FROM node:12.18.3-slim
# Vamos a crear un directorio donde dejar la aplicación
RUN mkdir -p /melo/BACK_MELO
# Nos cambiamos a ese directorio
WORKDIR /melo/BACK_MELO
# Copiamos el package json para gestionar las dependencias 
COPY package.json /melo/BACK_MELO
# Instalamos esas depndencias
RUN npm install
# Copiamos el código fuente de la aplicacion
COPY . /melo/BACK_MELO
# Exponemos el Puerto
EXPOSE 3000
# Arrancamos
CMD ["node","index.js"]