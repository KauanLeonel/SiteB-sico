import express from 'express'
import cors from 'cors'
import userRouter from './routes/useRoutes.js'
import exportRoutes from "./routes/exportRoutes.js";
import downloadRoute from "./routes/downloadRoute.js"

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/user", userRouter) //Usuário
app.use("/export", exportRoutes); //Exportar
app.use("/download", downloadRoute); //Download
app.listen(port, ()=>{
    console.log("Servidor aberto")
})