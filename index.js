const express=require("express");
const { default: mongoose } = require("mongoose");
const Card=require("./models/Card");
const app = express();
const port=3000;

//Middleware
app.use(express.json())
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

//kartvizit oluşturma
app.post("/card",async (req,res)=>{
    try {
        const newCard=new Card(req.body);
        await newCard.save();
        res.status(201).json({
            message:"Kartvizit başarıyla oluşturuldu",
            cardId:newCard._id
        })
    } catch (error) {
        res.status(400).json({
            message:"Karvizit oluşturulurken bit hata oluştu",
            error:error.message
        })
    }
})

//belirli bir id ye sahip kartvizit getirme
app.get("/card/:id",async(req,res)=>{
    try {
        const card=await Card.findById(req.params.id)
        if (!card) {
            return res.status(404).json({message:"Kartvizit bulunamadı"})
        }
        res.status(200).json(card);
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
})

app.listen(port,()=>{
    console.log("Sunucu https://localhost:"+port+" adresinde çalışıyor");
})