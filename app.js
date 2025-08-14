const express = require("express");
const cardRoutes = require("./routes/cardRoutes");
const apiLimiter = require('./middleware/rateLimiter');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

// Swagger JSDoc ayarları
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'eKartvizit API',
      version: '1.0.0',
      description: 'eKartvizit uygulaması için API dokümantasyonu',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'], // API rotalarının bulunduğu dosyaları belirtin
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middleware'ler
app.use(express.json());
app.use(cors());

// Swagger UI için uç nokta
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Sağlık kontrolü (Health Check) uç noktası
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'up',
    timestamp: new Date().toISOString()
  });
});

// Rate limiter'ı '/card' rotalarına uygula
if (process.env.NODE_ENV !== 'test') {
  app.use("/card", apiLimiter, cardRoutes);
} else {
  app.use("/card", cardRoutes);
}
// Hata yönetimi (Error Handling) middleware'i
app.use((err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({
      status: 'error',
      message: 'Doğrulama hatası',
      errors: messages
    });
  }

  if (err.isJoi) {
    return res.status(400).json({
      status: 'error',
      message: 'Geçersiz istek gövdesi (request body)',
      errors: err.details.map(detail => detail.message)
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      status: 'error',
      message: 'Bu kayıt zaten mevcut.'
    });
  }

  res.status(500).json({
    status: 'error',
    message: 'Sunucuda beklenmeyen bir hata oluştu.'
  });
});

module.exports = app;
