
const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({



    name:{

        type:String,
        required: true
    },

    email:{

        type:String,
        required:true,
        unique:true
    },

    password:{

        type:String,
        required:true


    },

    role:{

        type:String,
        emum:[  "teacher", "student"],
        required:true
    }


});


modul.exports =mongoose.model("User", userSchema)