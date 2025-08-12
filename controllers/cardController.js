  const Card=require("../models/Card")

  
  //kartvizit oluşturma
    exports.createCard=async (req,res)=>{
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
    }

    //belirli bir id ye sahip kartvizit getirme
    exports.getCardById= async(req,res)=>{
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
    }

    //Belirli bir ıd ye sahip kartviziti güncelleme
    exports.updateCardById= async(req,res)=>{
        try {
            const {id}=req.params;
            const updatedCard=await Card.findByIdAndUpdate(id,req.body,{new:true});
            if (!updatedCard) {
                return res.status(404).json({message:"Kartvizit Bulunamadı"})
            }

            res.status(200).json({
                message:"Kartvizit başarıyla güncellendi",
                card:updatedCard
            })
        } catch (error) {
            res.status(500).json({
                message:"Kartvizit güncellenirken bir hata oluştu",
                error:error.message
            })
        }
    }

    //Belirli bir id ye sahip kartviziti silme
    exports.deleteCardById= async(req,res)=>{
        try {
            const {id}=req.params;
            const deletedCard=await Card.findByIdAndDelete(id);

            if (!deletedCard) {
                return res.status(404).json({message:"Kartvizit Bulunamadı"})
            }

            res.status(200).json({
                message:"Kartvizit başarıyla silindi",
            });

        } catch (error) {
            res.status(500).json({
                message:"Kartvizit silinirken bir hata oluştu",
                error:error.message
            })
        }
    }
