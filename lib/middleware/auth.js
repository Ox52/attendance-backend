const jwt = require("jsonwebtoken");


const JWT_SECRECT = process.env.JWT_SECRECT || "your-secret-key";


const authenticate = (req,res,next) =>{

    const authHeader = req.headers.authorization;

    if(!authHeader){

        return res.status(401).json({

            success:false,
            meassage:"Unauthorized, token missing or invalid"
        })
    }


    const token = authHeader


    try{

        const decoded = jwt.verify(token ,JWT_SECRECT)

        req.user ={

            userId: decoded.userId,
            role:decoded.role

        };
        next()

    }catch(error){

        return res.status(401).json({
            success: false,
            error: 'Unauthorized, token missing or invalid'
          });


    }
}


const  requireTeacher  = ( req,res ,next ) =>{


    if(req.user.role !== "teacher"){

        return res.status(403).json({

            success:false,
            error:'Forbidden, teacher access required'
        })
    }

    next()
}

const requireStudent = ( req, res, next )=>{

    if(req.user.role !== "student"){

        return res.status(403).json({
            success: false,
            error: 'Forbidden, student access required'
          });
    }
    next();
}


module.exports ={

    authenticate,
    requireTeacher,
    requireStudent,
    JWT_SECRECT
}