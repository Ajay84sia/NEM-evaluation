var jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        try {
            const decoded = jwt.verify(token.split(" ")[1], 'evaluation');
            if (decoded) {
                req.body.username = decoded.username
                req.body.useremail = decoded.useremail
                next()
            } else {
                res.status(200).send({ "msg": "Please Login !!!" })
            }

        } catch (error) {
            res.status(400).send({ "err": error.message })
        }

    } else {
        res.status(200).send({ "msg": "Please Login !!!" })
    }

}

module.exports = {
    auth
}