import express from "express"
import cors from 'cors'
import connectingTODatabse from "./Database/Connection.js"
import StudentRouter from "./Routes/StudentRoutes.js";
import TeacherRouter from "./Routes/TeacherRoutes.js";
import classRoomRouter from "./Routes/ClassRoomRoutes.js";
import teacherSchedule from "./Routes/TeacherSchedule.js"
import cookieParser from 'cookie-parser';
const app = express();
app.use(express.json());
const FRONTEND = process.env.FRONTEND
app.use(cors({
    origin: FRONTEND, // Allow requests from this origin
    credentials: true, // Allow credentials (cookies, headers) to be sent

  }));

connectingTODatabse();
app.use(cookieParser())
app.use('/student',StudentRouter)
app.use('/teachers',TeacherRouter)
app.use('/classroom',classRoomRouter)
app.use('/teacherSchedule',teacherSchedule)




const PORT = process.env.PORT
app.listen(PORT,()=>{

    console.log(PORT+" Successfully conncecte to server")
})