const express = require("express")
const { connection } = require("./db")
const { userRouter } = require("./routes/user.route")
const { postRouter } = require("./routes/post.route")
const { auth } = require("./middleware/auth.middleware")
const cors = require("cors")
require("dotenv").config()

const app = express()

app.use(express.json())
app.use(cors())
app.get("/", (req, res) => {
    res.status(200).send("Basic API Endpoint")
})

app.use("/users", userRouter)
app.use(auth)
app.use("/posts", postRouter)

app.listen(process.env.port, async (req, res) => {
    try {
        await connection
        console.log("Connected to the Database")

    } catch (error) {
        console.log("Unable to connect Database")
    }

    console.log("Server is running at port 8080")

})