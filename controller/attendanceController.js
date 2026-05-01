import { success } from 'zod';

const Class = require('../lib/models/Class');
const Attendance = require('../lib/models/Attendance');


//global inmemory attendance

const   activeSession = null;


const getActiveSession =( teacherId = null) =>{

    if(! activeSession ) return  null;

    //if teacher id is provided check owership

    if( teacherId &&  activeSession.teacherId !==teacherId) return null;

    return activeSession;



};

const clearActiveSession = () =>{

    activeSession = null
}

const startAttendance = async( req,res) =>{

    try{


        const {classId} = req.body;


        //find the class

        const classDoc  = await Class.findById(classId);


        if(!classDoc){

            return res.status(404).json({
                success: false,
                error: 'Class not found'
              });
        }

         // Check if teacher owns the class

         if(classDoc.teacherId.toString() !== req.user.userId){

            return res.status(403).json({
                success: false,
                error: 'Forbidden, not class teacher'
              });
         }


         
    // Start new session (replaces any existing session)

    activeSession ={

        classId:classId,
        teacherId:req.user.userId,
        startedAt: new Date().toISOString(),
        attendance:{}
    }


    return res.status(201).json({

        success:true,
        data:{

            classId:activeSession.classId,
            startedAt:activeSession.startedAt
        }
    })


    }catch(error){

        return res.status(500).json({
            success: false,
            error: error.message
          });


    } 
}


const getMyAttendance = async (req,res) =>{

    try{

const  { id } = req.params;


const studentId = req.user.userId

// find the class

const classDoc = await Class.findById(id);

if(!classDoc){

    return res.status(404).json({
        success: false,
        error: 'Class not found'
      });
}


//Check if student is enrolled

const isEnrolled = classDoc.studentIds.some(s=>s.toString()=== studentId) 

if(!isEnrolled){
    return res.status(403).json({
        success: false,
        error: 'Forbidden, not enrolled in class'
      })
}



    // Check MongoDB for persisted attendance


    const AttendanceRecord  = await Attendance.findOne({

        classId:id,
        studendId:studentId
    })

    
    return res.status(200).json({
        success: true,
        data: {
          classId: id,
          status: attendanceRecord ? attendanceRecord.status : null
        }
      });
    }catch(error){


        return res.status(500).json({
            success: false,
            error: error.message
          });


    }


}


module.exports ={

    startAttendance,
    getMyAttendance,
    getActiveSession,
    clearActiveSession
}