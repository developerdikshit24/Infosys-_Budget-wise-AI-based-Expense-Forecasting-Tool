import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json({ limit: "150mb" }))
app.use(express.urlencoded({ extended: true, limit: "150mb" }))
app.use(express.static("public/images"))
app.use(cookieParser())


import userRouter from './src/routers/user.router.js'

app.use('/api/v1/users', userRouter)


export { app }