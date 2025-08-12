const express=require("express")
const router=express.Router();

const cardController=require("../controllers/cardController")

//yeni bir kartvizit oluşturma
router.post("/",cardController.createCard);

//belirli bir id ye sahip kartvizit getirme
router.get("/",cardController.getCardById);

//belirli bir id  ye sahpkartvizit güncelleme
router.put("/",cardController.updateCardById);

//belirli birid ye sahip kartvizit silme
router.delete("/",cardController.deleteCardById);

module.exports=router;