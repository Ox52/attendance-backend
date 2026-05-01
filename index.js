const express = require ("express")

const app = express()

app.use(express.json())

constDB = require("./lib/db")

//Routes


const authRoutes = require("./routes/authRoute")
const classRoutes = require("./routes/classRouter")
const studentRoutes = require("./routes/studentRoute")
const attendanceRoutes = require("./routes/attendanceRoutes")




app.use("/auth", authRoutes)
app.use("/class", classRoutes)
app.use("/student", studentRoutes)
app.use("/attendance", attendanceRoutes)


app.use((req,res)=>{


  res.status(404).json({

success:false,
message:"route not found"

  })
})


app.use((err, req, res, next)=>{

res.status(500).json({

  success:false,
  meassge:"internal server error"
})
  
})


const PORT = process.env.PORT ||3000;

app.listen(PORT,()=>{

  console.log(`server is running on port ${PORT}`)
})