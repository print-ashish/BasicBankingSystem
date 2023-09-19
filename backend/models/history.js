const mongoose = require("mongoose");

const transactionhistory = new mongoose.Schema(
    {
         sender :
         {
            type: String,
            required: true
         } ,
         datetime :
         {
            type: String,
            required: true
         } ,
    
         amount:
         {
            type:Number,
            required: true
         },
        //  date:
        //  {
        //     type:String,
        //     required: true
        //  },
         receiver: 
        {
         type: String,
         required : true
        }

         

    }

)

mongoose.model("HISTORY", transactionhistory)