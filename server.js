import express from 'express';
import cors from 'cors';



// app config
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})

// mongodb+srv://isminhne:vungocminh2572004@gmail.com@cluster0.ol1jr.mongodb.net/?


// note cua minh: mongodb+srv://isminhne:vungocminh2572004@gmail.com@cluster0.ol1jr.mongodb.net/?
//retryWrites=true&w=majority&appName=Cluster0