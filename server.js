const express = require("express");
const mongoose = require("mongoose");
const cardRoutes = require("./routes/cardRoutes");
const apiLimiter = require("./middleware/rateLimiter")
const app = express();
const port = 3000;

//Middleware
app.use(express.json());

//MongoDB bağlantısı dizesi(yerel sunucu için)
const dbURI =process.env.dbURI|| 'mongodb://mongodb:27017/eKartvizitDB';

//Veritabanı bağlanma
mongoose
  .connect(dbURI)
  .then(() => {
    console.log("MongoDB bağlantısı kuruldu");
  })
  .catch((err) => {
    console.error("MongoDB bağlantısı kurulamadı:", err);
  });

//Route'ları kullanma
app.use("/card", apiLimiter,cardRoutes);

app.listen(port, () => {
  console.log("Sunucu https://localhost:" + port + " adresinde çalışıyor");
});
