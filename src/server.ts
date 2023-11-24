import express, { Request, Response,NextFunction, json } from 'express'
import { testConnection } from './Configuration/dbConfig';

import router from './Routes/routes';
import cors from 'cors'

export const app=express()

app.use(cors())
app.use(json())
app.use('/member', router)

app.use((error: Error, req:Request, res:Response, next:NextFunction)=>{
    res.json({
        message: error.message
    })
})

app.listen( 4000, ()=>{
    console.log("server is running");
    testConnection()
    
 })
