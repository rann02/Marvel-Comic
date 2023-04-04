'use strict';
// const axios = require('axios')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

// let databook = []

// const get = async () => {
//   try {
//     const { data } = await axios({
//       method: "GET",
//       url: "https://www.googleapis.com/books/v1/volumes?q=MarvelComics&filter=paid-ebooks&maxResults=40&key=AIzaSyBoeum_U8ZC4IrvjUTrDjlG11Eoc4LaLY0"
//     })
//     // console.log(data); 
//     // return data
//     databook = data
//   } catch (error) {
//     next(error)
//   }
// }

// console.log(get());
// const tes = get()
get()

console.log(databook);
