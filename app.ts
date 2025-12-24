// import cors from 'cors';
import express from "express";

import mainRouter from './src/mainRouter';
const app = express()
app.use(express.json())

// app.use(cors)
app.use('/api/v1',mainRouter)
app.use('/',()=>{
    console.log('1111111111111');
    
})
app.listen(3000,()=>{
    console.log('server stat and listen port 3000');
})