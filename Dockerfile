# Estágio 1: Build da Aplicação React/Vite
FROM node:20-alpine AS build
WORKDIR /app

# Copia package.json e package-lock.json (se existir)
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o código-fonte
COPY . .

# Constrói o site React (Vite)
RUN npm run build

# Estágio 2: Servidor Nginx (Runtime Final)
FROM nginx:alpine AS final
# Remove a configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia o arquivo de configuração Nginx personalizado
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos de build (a pasta 'dist') do estágio de build
COPY --from=build /app/dist /usr/share/nginx/html

# Expor a porta 80, que será mapeada no docker-compose
EXPOSE 80

# Comando padrão para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
