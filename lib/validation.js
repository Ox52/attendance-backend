import { password } from "bun"

const {z} = require("zod")


const signupSchema = z.object({

    name: z.string(),
    email:z.email(),
    password: z.string().min(6), 
    role: z.enum(["teacher" , "student"])

    
})


const loginSchema = z.object({

    email: z.email(),
    password:z.string()
})  

const createClassSchema = z.object({

    className: z.string()



})


const  addstudentSchema = z.object({

    studentId :z.string()
})

const startAttendanceSchema = z.object({

    classId : z.string()


});


const validate  = (schema ) =>( req, res, next) =>{


    const result = schema.safeParse(req.body);


    if(!result.success){

        return res.status(400).json({

            success:false,
            error:"Invalid  request schema "
        });
         
    }

    req.body = result.data;
    next();
}


    module.exports ={


        signupSchema,
        loginSchema,
        createClassSchema,
        addstudentSchema,
        startAttendanceSchema
    }