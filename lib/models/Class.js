const mongoose = require("mongoose")


const classSchema =  new mongoose.Schema({


    className:{

        type:String,
        required:true
    },
    teacherId:{

        type:mongoose.Schema.types.ObjectId,
        ref:"User",
        required:true
    },

    studentId:{

        type:mongoose.Schema.types.ObjectId,
        ref:"User"


    }

})

modul.exports = mongoose.model("Class",classSchema)