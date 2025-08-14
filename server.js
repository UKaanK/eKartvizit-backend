const app = require('./app'); // app.js dosyasını içeri aktar
const mongoose = require("mongoose");

const port = 3000;

// MongoDB bağlantı dizesini çevresel değişkenden al
const dbURI = process.env.DB_URI || 'mongodb://mongodb:27017/eKartvizitDB';

// Veritabanına bağlanma
mongoose.connect(dbURI)
  .then(() => {
    console.log("MongoDB bağlantısı kuruldu");
    // Veritabanı bağlantısı kurulduktan sonra sunucuyu dinle
    app.listen(port, () => {
      console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
    });
  })
  .catch((err) => {
    console.error("MongoDB bağlantısı kurulamadı:", err);
  });
