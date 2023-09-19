const mongoose = require("mongoose");
// const {ObjectId} = mongoose.Schema.Types;

const customerschema = new mongoose.Schema(
    {
         username :
         {
            type: String,
            required: true
         } ,
    
         email:
         {
            type:String,
            required: true
         },
         balance: 
        {
         type: Number,
         required : true
        },
         accountno: 
        {
         type: Number,
         required : true
        }

         

    }

)

mongoose.model("CUSTOMERS", customerschema)