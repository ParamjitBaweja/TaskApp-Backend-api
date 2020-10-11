const express = require ('express')
require('./db/mongoose')
const userRouter = require('./routers/users.js')
const taskRouter = require('./routers/tasks.js')

const app = express()
const port = process.env.PORT

app.use(express.json())

app.use (taskRouter)
app.use (userRouter)

app.listen(port,()=>{
    console.log('Server is up on port:' + port)
})
