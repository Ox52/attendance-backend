import { email } from 'zod';

const Class = require('../lib/models/Class');
const User = require('../lib/models/User');

const createClass = async(req,res) =>{

    try{


        const {className} = req.body;
        const teacherId = req.user.userId;



        const newClass = await Class.create({

            className,
            teacherId,
            studentIds :[]
        });

        return  res.status(201).json({

            success:true,
            data:{

                _id: newClass._id,
                className:newClass.className,
                teacherId:newClass.teacherId,
                studentIds:newClass.studentIds,
            }
        });
       

       
    }catch(error){

        return res.status(500).json({
            success: false,
            error: error.message
          });


    }


}

const addStudent = async( req,res)=>{


    try{

       const {id} = req.params;
       const {studentId} = req.body;

       const classDoc = await Class.findById(id);
       if(!classDoc){
        return res.status(404).json({

            success: false,
        error: 'Class not found'
        })
       }
       //check if the  teacher owns the class

       if(classDoc.teacherId.toString() !== req.user.userId   ){

        return res.status(403).json({
            success: false,
            error: 'Forbidden, not class teacher'
          });
       }

       //check if the student exits and is a student


       const student = await User.findById(studentId);

       if(!student || student.role !== "student"){

        return res.status(404).json({
            success: false,
            error: 'Student not found'
          });
       }

         // Add student if not already in class


         if(!classDoc.studentIds.includes(studentId)){

            classDoc.studentIds.push(studentId);

            await classDoc.save();
         }

         return res.status(201).json({

            success:true,
            data:{

                _id:classDoc._id,
                className:classDoc.className,
                teacherId:classDoc.teacherId,
                studentIds:classDoc.studentIds

            }
         })

       
    }catch(error){

        return res.status(500).json({
            success: false,
            error: error.message
          });

    }
}


const getClass = async(req,res) =>{




    try{


        const {id} = req.params;

        const  classDoc =  await Class.findById(id).populate("studentIds", "_id name email")

        if(!classDoc){

            return res.status(404).json({
                success: false,
                error: 'Class not found'
              });
        }
   // Check access (teacher who owns OR student enrolled)
const isTeacher = req.user.role ==="teacher " && classDoc.teacherId.toString() === req.user.userId;
const isEnrolledstudent  = req.user.role === "student " &&

classDoc.studentIds.some(s => s._id.toString() ===req.user.userId)

if(!isTeacher && !isEnrolledstudent){
    return res.status(403).json({
        success: false,
        error: 'Forbidden, not class teacher'
      });
}

return  res.status(200).json({

    succes:true,
    data:{

        _id: classDoc._id,
        className:classDoc.className,
        teacherId:classDoc.teacherId,
        students:classDoc.studentIds.map(s=>   ({

            _id:s._id,
            name:s.name,
            email:email

        }))
    }
})


    }catch(error){
        return res.status(500).json({
            success: false,
            error: error.message
          })
    }
}


const getStudent   = async(req,res) =>{

    try{

        const students = await User.find({role:"student"}).select("_id name email")

        return  res.status(201).json({

            success:true,
            data:students.map(s=>({

                _id: s._id,
                name: s.name,
                email: s.email
            }))
        })

    }catch(error){

        return res.status(500).json({
            success: false,
            error: error.message
          });

    }
}


module.exports ={

    createClass,
    addStudent,
    getClass,
    getStudent
}