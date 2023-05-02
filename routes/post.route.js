const express = require("express")
const { PostModel } = require("../models/post.model")

const postRouter = express.Router()

postRouter.get("/", async (req, res) => {
    const {device} = req.query
    const username = req.body.username
    try {
        if (device) {
            const posts = await PostModel.find({username:username, device:device})
            res.status(200).send(posts)
        } else {
            const posts = await PostModel.find({username:username})
            res.status(200).send(posts)
        }

    } catch (error) {
        res.status(400).send({ "error": error.message })
    }

})

postRouter.post("/create", async (req, res) => {

    try {

        const post = new PostModel(req.body)
        await post.save()
        res.status(200).send({ "msg": "New Post Created Successfully" })


    } catch (error) {
        res.status(400).send({ "err": error.message })
    }


})

postRouter.patch("/update/:postID", async (req, res) => {
    const { postID } = req.params

    const post = await PostModel.findOne(postID)

    try {
        if (req.body.username !== post.username) {
            res.status(200).send({ "msg": "You are not authorised to do this" })
        } else {
            await PostModel.findByIdAndUpdate({ _id: postID }, req.body)
            res.status(200).send({ "msg": `Post with id:${postID} has been updated successfully !!` })
        }

    } catch (error) {
        res.status(400).send({ "err": error.message })
    }

})

postRouter.delete("/delete/:postID", async (req, res) => {
    const { postID } = req.params

    const post = await PostModel.findOne(postID)

    try {
        if (req.body.username !== post.username) {
            res.status(200).send({ "msg": "You are not authorised to do this" })
        } else {
            await PostModel.findByIdAndDelete({ _id: postID })
            res.status(200).send({ "msg": `Post with id:${postID} has been deleted successfully !!` })
        }

    } catch (error) {
        res.status(400).send({ "err": error.message })
    }


})

module.exports = {
    postRouter
}