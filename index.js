import express from 'express'
import usersRouter from './routes/users.js'
import itemsRouter from './routes/items.js'
import ordersRouter from './routes/orders.js'
import cors from 'cors'
let port = process.env.PORT || 5001
const app = express()
app.use(express.static('public'))
app.use(express.json())
app.use(cors({
    origin: ['https://capstone-project-34e36.web.app','http://localhost:8080'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials:true
}))
app.use((req,res, next)=>{
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "http://localhost:8080");
  res.header("Access-Control-Request-Methods", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "http://localhost:8080");
  res.header("Access-Control-Expose-Headers", "Authorization");
  next();
})

app.use('/users', usersRouter)
app.use('/items', itemsRouter)
app.use('/orders', ordersRouter)

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})