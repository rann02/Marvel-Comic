const { Book, Purchase, User } = require('../models/index')
const midtransClient = require('midtrans-client');
const nodemailer = require('nodemailer');

class Cotroller {
    static async getPurchase(req, res, next) {
        try {
            const data = await Purchase.findAll({
                where: {
                    'UserId': req.user.id,
                    'paymentStatus': false
                },
                include: Book
            })
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async postPurchase(req, res, next) {
        try {
            const { BookId } = req.params
            const { totalPrice } = req.body
            const UserId = req.user.id

            const book = await Purchase.findOne({ where: { BookId, UserId, 'paymentStatus': false } })

            if (book) {
                throw { name: 'created' }
            }

            const data = await Purchase.create({ BookId, UserId, totalPrice })

            res.status(201).json({
                message: "Success add to chart",
                data
            })
        } catch (error) {
            next(error)
        }
    }

    static async deletePurchase(req, res, next) {
        try {
            const { id } = req.params

            const data = await Purchase.destroy({
                where: {
                    id
                }
            })
            res.status(200).json({ message: 'delete success' })
        } catch (error) {
            next(error)
        }
    }

    static async patchPaymentstatus(req, res, next) {
        try {
            const id = req.user.id

            const transaction = await Purchase.sum('totalPrice', {
                where: {
                    'UserId': id,
                    'paymentStatus': false
                }
            })

            const user = await User.findByPk(id)
            const output = `
            <p>Your payment has been paid</p>
            <ul>
                <li>Name: ${user.username} </li>
                <li>Email: ${user.email}</li>
                <li>Total pembayaran: ${transaction}</li>
            </ul>
            `

            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: 'sabanarandy98@gmail.com',
                    pass: 'ttrmqhjzogvtafeo', // generated google password (bypass two-factor auth)
                },
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: 'sabanarandy98@gmail.com', // sender address
                to: `${user.email}`, // list of receivers
                subject: "Purchase Information", // Subject line
                text: "Thanks, & Enjoy", // plain text body
                html: `${output}`, // html body
            });

            // console.log(info, '===============');

            // const UserId = req.user.id

            await Purchase.update({'paymentStatus': true}, {where: {
                'UserId': id
            }})

            res.status(200).json({message: 'Payment success'})
        } catch (error) {
            next(error)
        }
    }
    static async generateMidtransToken(req, res, next) {
        try {
            const user = await User.findByPk(req.user.id)
            const transaction = await Purchase.sum('totalPrice', {
                where: {
                    'UserId': req.user.id,
                    'paymentStatus': false
                }
            })

            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: 'SB-Mid-server-JmQcDyV6qr0jRUiA6DHa2gG-'
            });

            let parameter = {
                "transaction_details": {
                    "order_id": "ORDER" + Math.floor(10000 + Math.random() * 90000),
                    "gross_amount": transaction
                },
                "credit_card": {
                    "secure": true
                },
                "customer_details": {
                    // "first_name": "budi",
                    // "last_name": "pratama",
                    "email": `${user.email}`
                    // "phone": "08111222333"
                }
            };

            const midtransToken = await snap.createTransaction(parameter)
         
            res.status(201).json(midtransToken)
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