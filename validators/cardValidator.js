const Joi = require('joi');

// Mongoose şemanızdaki Social alt şemasına uygun Joi şeması
const socialSchema = Joi.object({
  platform: Joi.string().optional(),
  url: Joi.string().uri().optional(),
});

// Yeni Mongoose şemanıza uygun güncellenmiş Joi doğrulama şeması
const cardSchema = Joi.object({
  firstName: Joi.string().min(2).max(100).required(),
  lastName: Joi.string().min(2).max(100).required(),
  adress: Joi.string().optional(),
  title: Joi.string().optional(),
  company: Joi.string().optional(),
  email: Joi.string().email().required(),
  phone: Joi.string().optional(),
  website: Joi.string().uri().optional(),
  socialMedia: Joi.array().items(socialSchema).optional(),
});

// Doğrulama middleware'i
exports.validateCard = (req, res, next) => {
  const { error } = cardSchema.validate(req.body);

  if (error) {
    // Doğrulama hatası varsa 400 Bad Request hatası gönder
    return res.status(400).json({
      status: 'error',
      message: 'Geçersiz istek gövdesi (request body)',
      errors: error.details.map(detail => detail.message)
    });
  }

  // Hata yoksa sonraki middleware'e geç
  next();
};
