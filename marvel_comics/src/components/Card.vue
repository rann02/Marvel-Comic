<script>
import {mapActions, mapState} from 'pinia'
import {useCounterStore} from '../stores/counter'
export default {
    props: ['book'],
    created() {

    },
    computed: {
        ...mapState(useCounterStore,[])
    },
    methods: {
        ...mapActions(useCounterStore, ['fetchBookDetail', 'fetchComment']),
        async goToReview(id){
            try {
                await this.fetchBookDetail(id)
                await this.fetchComment(id)
                this.$router.push(`/detail/${id}`)
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>

<template>
    <div class="card card-compact w-52 bg-slate-900 shadow-2xl">
        <figure class="h-60"><img
                :src="book.imgUrl"
                alt="Shoes" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">{{ book.title }}</h2>
            <p>{{ book.publisher }}</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary" @click.prevent="goToReview(book.id)">See Review</button>
            </div>
        </div>
    </div>
</template>

<style></style>