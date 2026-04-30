import { success } from 'zod';
import { JWT_SECRECT } from '../lib/middleware/auth';


const User = require('../lib/models/User');
const signup = async( req,res)=>{


    try{


        const {name, email, password , role } = req.body;


        //check if user already exits

        const existingUser =  await User.findOne({email})

        if(existingUser){

            res.status(400).json({

                success:false,
                message:"email already exits"
            })
        }

        const hashedPassword =  await bcrypt.hash(password , 10)

        const  user = User.create({

            name,
            email,
            password:hashedPassword,
            role
        });

        return  res.status(201).json({

            success:true,

            data:{

                _id: user._id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        });
    }catch(error){


        return  res.status(500).js0n({

            success:false,
            error: error.message
        });


    }
}


const login = async(req,res)=>{


    try{


        const {email , password} = req.body;

        const user = await User.findOne({email});

        if(!user){

            return res.status(400).json({
                success: false,
                error: 'Invalid email or password'
              });
        }


        const isValidPassword =  await bcrypt.compare(password, user.password)

        if(!isValidPassword){

            return res.status(400).json({
                success: false,
                error: 'Invalid email or password'
              });
        }


        const token = jwt.sign(

            { userId: user._id , role:user.role},
            JWT_SECRECT

        );


        return  res.status(200).json({

            success:true,
            data:{token}
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            error: error.message
          });


    }
}

const  me = async( req, res) =>{


    try{


        const  user = await User.findbyId(req.user.userId).select( "-password")

        if(!user){

            return res.status(404).json({
                success: false,
                error: 'User not found'
              });
        }



        return 

        res.status(200).json({

            success:true,


            data:{

                _id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        })

    }catch(error){


        return res.status(500).json({
            success: false,
            error: error.message
          });

    }
};

module.exports={

    signup,
    login,
    me
}