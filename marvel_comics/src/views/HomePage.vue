<script>
import Card from '../components/Card.vue'
import {mapActions, mapState} from 'pinia'
import {useCounterStore} from '../stores/counter'
export default{
    components: {
        Card
    },
    created() {
        this.fetchBook()
        this.fetchPurchase()
    },
    methods: {
        ...mapActions(useCounterStore, ['fetchBook', 'fetchPurchase'])
    }, 
    computed: {
        ...mapState(useCounterStore, ['books'])
    }
}
</script>

<template>
    <section class="rounded-2xl shadow-2xl bg-slate-800">
        <div>
            <div>
                <marquee behavior="left" direction=""
                    class="carousel carousel-center w-full p-4 space-x-4 bg-neutral rounded-box">
                    <div class="carousel-item flex gap-5">
                        <img src="https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bWFydmVsJTIwY29taWNzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                            class="rounded-box" />
                        <img src="https://images.unsplash.com/photo-1588497859490-85d1c17db96d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8bWFydmVsJTIwY29taWNzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                            class="rounded-box" />
                        <img src="https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWFydmVsJTIwY29taWNzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                            class="rounded-box" />
                        <img src="https://images.unsplash.com/photo-1612036781697-175d3edab7ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbWljfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                            class="rounded-box" />
                        <img src="https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y29taWN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                            class="rounded-box" />
                    </div>
                </marquee>
            </div>
        </div>
        <div class="mt-3">
            <!-- Filter, dan option lainnya -->
            <!-- <div class="w-full mr-5 h-full bg-slate-800 p-5 rounded-2xl shadow-2xl">
                <div class="form-control w-full">
                    <form class="input-group w-8/12 mx-auto shadow-2xl">
                        <input type="text" placeholder="Search…" class="input input-bordered w-full" />
                        <button class="btn btn-square">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div> -->
        </div>
        <!-- Pilihan product menggunakan GRID -->
        <div class="w-full grid grid-cols-5 gap-y-4 pl-6">
            <Card v-for="book in books" :key="book.id" :book="book"/>
        </div>
        <!-- Pagination -->
        <!-- <div class="flex justify-end mr-8 mt-4">
            <div class="btn-group">
                <button class="btn">1</button>
                <button class="btn btn-active">2</button>
                <button class="btn">3</button>
                <button class="btn">4</button>
            </div>
        </div> -->
    </section>
</template>

<style></style>