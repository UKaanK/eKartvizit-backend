# Node.js 'in resmi imajını temel al
FROM node:18-alpine

# Çalışma dizinini ayarla
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Proje bağımlılıklarını yükle
RUN npm install

# Geri Kalan Uygulama Kodunu Kopyala
COPY . .

# Uygulamanın çalışacağı portu açığa çıkar
EXPOSE 3000

# Uygulamayı başlatma komutunu tanımla
CMD ["node","server.js"]
