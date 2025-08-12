const express = require("express");
const mongoose = require("mongoose");
const cardRoutes = require("./routes/cardRoutes");
const app = express();
const port = 3000;

//Middleware
app.use(express.json());
//MongoDB bağlantısı dizesi(yerel sunucu için)
const dbURI = "mongodb://127.0.0.1:27017/eKartvizitDB";

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
app.use("/card", cardRoutes);

app.listen(port, () => {
  console.log("Sunucu https://localhost:" + port + " adresinde çalışıyor");
});
