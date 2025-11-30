import express from 'express'
import cors from 'cors'
import userRouter from './routes/useRoutes.js'

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/user", userRouter)

app.listen(port, ()=>{
    console.log("Servidor aberto")
})