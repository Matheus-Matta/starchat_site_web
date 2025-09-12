# ---------- Stage 1: build ----------
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Use a env de produção (Vite lê VITE_* no build)
ARG VITE_GA_ID
ENV VITE_GA_ID=${VITE_GA_ID}
RUN npm run build

# ---------- Stage 2: run (Nginx) ----------
FROM nginx:1.27-alpine
# Nginx conf para SPA (fallback index.html)
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copia arquivos do build
COPY --from=build /app/dist /usr/share/nginx/html
# Healthcheck simples
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost/ || exit 1
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
