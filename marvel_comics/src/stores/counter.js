import { defineStore } from 'pinia'
import axios from 'axios'
export const useCounterStore = defineStore('counter', {
  state: () => ({
    api: 'https://grouchy-scene-production.up.railway.app',
    books: [],
    bookdetail: {},
    comments: [],
    isLogin: false,
    commentEdit: '',
    commentId: '',
    flagEdit: false,
    purchases: [],
    profile: ''
  }),
  getters: {
  },
  actions: {
    async fetchBook() {
      try {
        const { data } = await axios({
          method: "GET",
          url: `${this.api}/books/lists`
        })
        this.books = data
      } catch (error) {
        console.log(error);
      }
    },
    async fetchBookDetail(id) {
      try {
        const { data } = await axios({
          method: "GET",
          url: `${this.api}/books/${id}`
        })
        this.bookdetail = data
      } catch (error) {
        console.log(error);
      }
    },
    async fetchComment(id) {
      try {
        const { data } = await axios({
          method: "GET",
          url: `${this.api}/comments/${id}`
        })
        this.comments = data
      } catch (error) {
        console.log(error);
      }
    },
    register(dataRedister) {
      return axios({
        method: "POST",
        url: `${this.api}/users/register`,
        data: dataRedister
      })
    },
    login(dataLogin) {
      return axios({
        method: "POST",
        url: `${this.api}/users/login`,
        data: dataLogin
      })
    },
    comment(id, text) {
      return axios({
        method: "POST",
        url: `${this.api}/comments/${id}`,
        headers: { access_token: localStorage.getItem('access_token') },
        data: {
          commentText: text
        }
      })
    },
    async getCommentById(id) {
      try {
        const { data } = await axios({
          method: "GET",
          url: `${this.api}/comments/edit/${id}`,
          headers: { access_token: localStorage.getItem('access_token') }
        })
        this.commentEdit = data.commentText
        // this.bookdetail = data
      } catch (error) {
        console.log(error);
      }
    },
    async patchComment(id) {
      try {
        const { data } = await axios({
          method: "PATCH",
          url: `${this.api}/comments/edit/${id}`,
          headers: { access_token: localStorage.getItem('access_token') },
          data: {
            commentText: this.commentEdit
          }
        })
        console.log(data.message);
      } catch (error) {
        console.log(error.response);
      }
    },
    createPurchase(id, price) {
      return axios({
        method: "POST",
        url: `${this.api}/purchases/${id}`,
        headers: { access_token: localStorage.getItem('access_token') },
        data: {
          totalPrice: price
        }
      })
    },
    async fetchPurchase() {
      try {
        const { data } = await axios({
          method: "GET",
          url: `${this.api}/purchases`,
          headers: { access_token: localStorage.getItem('access_token') }
        })
        this.purchases = data
      } catch (error) {
        console.log(error);
      }
    },
    deletePurchase(id) {
      return axios({
        method: "DELETE",
        url: `${this.api}/purchases/${id}`,
        headers: { access_token: localStorage.getItem('access_token') }
      })

    },
    logout() {
      localStorage.clear()
    },
    async updatePayment() {
      try {
        const { data } = await axios({
          url: `${this.api}/purchases/status`,
          method: 'PATCH',
          headers: { access_token: localStorage.getItem('access_token') }
        })
        this.fetchPurchase()
        this.router.push('/')
        console.log(data.messege);
      } catch (error) {
        console.log(error);
      }
    },
    async checkout() {
      try {
        const { data } = await axios({
          url: `${this.api}/purchases/midtrans`,
          method: 'POST',
          headers: { access_token: localStorage.getItem('access_token') }
        })
        // console.log(data);
        const cb = this.updatePayment
        window.snap.pay(`${data.token}`, {
          onSuccess: function (result) {
            /* You may add your own implementation here */
            // alert("payment success!"); console.log(result);
            cb()
          }
        })
      } catch (error) {
        console.log(error);
      }
    }
  },
})