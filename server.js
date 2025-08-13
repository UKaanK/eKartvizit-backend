const express = require("express");
const mongoose = require("mongoose");
const cardRoutes = require("./routes/cardRoutes");
const apiLimiter = require("./middleware/rateLimiter")
const cors=require("cors");
const swaggerJsdoc=require("swagger-jsdoc");
const swaggerUi=require("swagger-ui-express")
const app = express();
const port = 3000;

// Swagger ayarları
const swaggerOptions={
  definition:{
    openapi:"3.0.0",
    info:{
      title:"eKartvizit API",
      version:"1.0.0",
      description:"eKartvizit uygulaması için RESTful API"
    },
    servers:[
      {
        url:"http://localhost:3000"
      }
    ]
  },
  apis:["./routes/cardRoutes.js"]
};

const swaggerDocs=swaggerJsdoc(swaggerOptions);

//Middleware
app.use(express.json());
app.use(cors());

// Swagger UI için uç nokta
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerDocs))

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

// Sağlık kontrolü (Health Check) uç noktası
app.get('/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'up' : 'down';
  res.status(200).json({
    status: 'up',
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

//Route'ları kullanma
app.use("/card", apiLimiter,cardRoutes);

app.use((err,req,res,next)=>{
    console.error("Hata:",err.stack);
    res.status(500).json({
      status:"error",
      message:"Sunucuda bir hata oluştu"
    })
})

app.listen(port, () => {
  console.log("Sunucu https://localhost:" + port + " adresinde çalışıyor");
});
