const { User } = require('../models/index')
const { compare } = require('../helpers/hashpasswor')
const { createToken } = require('../helpers/jwt');
// const nodemailer = require('nodemailer');

class Cotroller {
    static async createUser(req, res, next) {
        try {
            const { username, email, password } = req.body
            const imgUrl = `https://api.dicebear.com/5.x/bottts-neutral/svg?seed=${username}`
            const data = await User.create({ username, email, password, imgUrl })
            res.status(201).json({
                message: "Account has been created",
                id: data.id,
                name: data.username,
                email: data.email
            })
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            if (!email || !password) {
                throw { name: "EmailorPasswordRequired" }
            }
            const user = await User.findOne({ where: { email } })
            if (!user) {
                throw { name: "InvalidCredential" }
            }
            const valid = compare(password, user.password)
            if (!valid) {
                throw { name: "InvalidCredential" }
            }
            const payload = {
                id: user.id
            }
            const access_token = createToken(payload)
            res.status(200).json({ token: access_token, id: user.id, name: user.username, imgUrl: user.imgUrl })
        } catch (error) {
            next(error)
        }
    }

    // static async sendMeil(req, res, next) {
    //     try {
    //         const user = await User.findByPk(1)
    //         const output = `
    //         <p>Your payment has been paid</p>
    //         <ul>
    //             <li>Name: ${user.username} </li>
    //             <li>Email: ${user.email}</li>
    //             <li>Total pembayaran: </li>
    //         </ul>
    //         `

    //         let transporter = nodemailer.createTransport({
    //             host: "smtp.gmail.com",
    //             port: 465,
    //             secure: true, // true for 465, false for other ports
    //             auth: {
    //                 user: 'sabanarandy98@gmail.com',
    //                 pass: 'ttrmqhjzogvtafeo', // generated google password (bypass two-factor auth)
    //             },
    //         });

    //         // send mail with defined transport object
    //         let info = await transporter.sendMail({
    //             from: 'sabanarandy98@gmail.com', // sender address
    //             to: "ramadhanrandy02@gmail.com", // list of receivers
    //             subject: "Purchase Information", // Subject line
    //             text: "Thank, & Enjoy", // plain text body
    //             html: `${output}`, // html body
    //         });

    //         console.log(info, '===============');

    //     } catch (error) {
    //         next(error)
    //     }
    // }
}

module.exports = Cotroller 