const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const socialSchema=new Schema({
    platform:{
        type:String,
        required:false
    },
    url:{
        type:String,
        required:false
    }
});

const cardSchema=new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    adress:{
        type:String
    },
    //ünvan
    title:{
        type:String
    },
    //şirket
    company:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    phone:{
        type:String
    },
    website:{
        type:String
    },
    socialMedia:[socialSchema]
},{timestamps:true})

const Card=mongoose.model('Card',cardSchema);

module.exports=Card;