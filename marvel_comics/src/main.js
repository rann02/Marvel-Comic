import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// import VueAwesomePaginate from "vue-awesome-paginate";
// import "vue-awesome-paginate/dist/style.css";

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
// app.use(VueAwesomePaginate)
pinia.use(({ store }) => {
  store.router = markRaw(router)
})

app.mount('#app')


// import { createApp } from "vue";
// import App from "./App.vue";

// import the package

// import the necessary css file

// Register the package
// createApp(App).use(VueAwesomePaginate).mount("#app");

