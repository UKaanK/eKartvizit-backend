const express=require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const port=3000;

//MongoDB bağlantısı dizesi(yerel sunucu için)
const dbURI='mongodb://127.0.0.1:27017/eKartvizitDB'

//Veritabanı bağlanma
mongoose.connect(dbURI).then(()=>{
    console.log("MongoDB bağlantısı kuruldu")
}).catch(err=>{
    console.error("MongoDB bağlantısı kurulamadı:", err);
})

app.get("/",(req,res)=>{
    res.send("Merhaba eKartvizit Backend")
});

app.listen(port,()=>{
    console.log("Sunucu https://localhost:"+port+" adresinde çalışıyor");
})