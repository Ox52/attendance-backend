const mongoose = require("mongoose")

const dotenv = require("dotenv")

dotenv.config()

const  connectDB = async ()=>{


    try{

        await mongoose.connect( process.env.MONGODB_URL ||  'mongodb://localhost:27017/attendance_system')
        console.log("conntec db")

    }
    catch(error){

        console.error('MongoDB connection error:', error.message)
        process.exit(1)




    }
}

modul.exports = connectDB