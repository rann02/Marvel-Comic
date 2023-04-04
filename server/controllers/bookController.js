const { Book } = require('../models/index')
const models = require('../models')
const queryInterface = models.sequelize.getQueryInterface()


const axios = require('axios')

class Cotroller {
    static async getBook(req, res, next) {
        try {
            const books = await Book.findAll()

            if (books.length === 0) {
                const { data } = await axios({
                    method: "GET",
                    url: "https://www.googleapis.com/books/v1/volumes?q=MarvelComics&filter=paid-ebooks&maxResults=40&key=AIzaSyBoeum_U8ZC4IrvjUTrDjlG11Eoc4LaLY0"
                })

                const value = data.items.map(el => {
                    const newData = {

                    }
                    newData.idBook = el.volumeInfo.industryIdentifiers[0].identifier
                    newData.title = el.volumeInfo.title
                    newData.publisher = el.volumeInfo.authors.toString()
                    newData.publishedDate = el.volumeInfo.publishedDate
                    newData.description = el.volumeInfo.description
                    newData.imgUrl = el.volumeInfo.imageLinks.thumbnail
                    newData.price = el.saleInfo.listPrice.amount
                    newData.updatedAt = newData.createdAt = new Date()
                    return newData
                })
                await queryInterface.bulkInsert('Books', value)
                res.status(200).json(value)

            } else {
                res.status(200).json(books)
            }
        } catch (error) {
            next(error)
        }
    }

    static async getBookById(req, res, next) {
        try {
            const { id } = req.params

            const book = await Book.findByPk(id)
            if (!book) {
                throw {name: 'NotFound'}
            }
            res.status(200).json(book)
            // console.log(book);

        } catch (error) {
            next(error)
        }
    }
}

module.exports = Cotroller

