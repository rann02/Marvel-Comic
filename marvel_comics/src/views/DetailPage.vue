<script>
import CommentLayer from '../components/CommentLayer.vue'
import { useCounterStore } from '../stores/counter'
import { mapActions, mapState, mapWritableState } from 'pinia'
export default {
    data() {
        return{
            commentText: '',
            userId: localStorage.getItem('id')
        }
    },
    components: {
        CommentLayer
    },
    created() {
        this.fetchBookDetail(this.$route.params.id)
        this.fetchComment(this.$route.params.id)
    },
    watch() {
        commentText()
    },

    computed: {
        ...mapState(useCounterStore, ['bookdetail', 'comments']),
        ...mapWritableState(useCounterStore, ['commentEdit', 'flagEdit', 'commentId'])
    },
    methods: {
        ...mapActions(useCounterStore, ['fetchBookDetail', 'fetchComment', 'comment', 'patchComment', 'createPurchase', 'fetchPurchase']),
        rupiah(number) {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR"
            }).format(number);
        },
        date(date){
            const data = date.split("T")[0]
            return data
        },
        async subminComment(id) {
            try {
                const { data } = await this.comment(id, this.commentText)
                this.fetchComment(this.$route.params.id)
                this.commentText = ''
                console.log(data.message);
            } catch (error) {
                console.log(error.response);
            }
        },
        async submitEdit(){
            try {
                await this.patchComment(this.commentId)
                await this.fetchComment(this.$route.params.id)
                this.flagEdit = false   
            } catch (error) {
                console.log(error);
            }
        },
        async purchaseTrigger(id, price){
            try {
                // console.log(id, price);
                const { data } = await this.createPurchase(id, price)
                await this.fetchPurchase()
                console.log(data);
            } catch (error) {
                console.log(error.response.data.message);
            }
        }
    }
}
</script>

<template>
    <section>
        <div class="hero min-h-screen bg-base-200 rounded-2xl bg-slate-800 flex flex-col">
            <div class="hero-content flex-col lg:flex-row-reverse shadow-2xl bg-slate-900 rounded-2xl mt-10">
                <img :src="bookdetail.imgUrl" class="max-w-sm rounded-lg shadow-2xl" />
                <div class="w-8/12">
                    <h1 class="text-3xl font-bold">{{ bookdetail.title }}</h1>
                    <p class="py-2">{{ bookdetail.description }}</p>
                    <p class="py-1">{{ bookdetail.publisher }}</p>
                    <p class="py-1">{{ date(bookdetail.publishedDate) }}</p>
                    <p class="py-1 text-blue-400">{{ rupiah(bookdetail.price) }}</p>

                    <div class="flex gap-3 p-4">
                        <button class="btn btn-primary w-6/12" @click.prevent="purchaseTrigger(bookdetail.id, bookdetail.price)">Buy Now</button>
                        <RouterLink to="/" class="btn btn-primary w-6/12">Back</RouterLink>
                    </div>
                </div>
            </div>
            <h1 class="text-2xl font-bold mt-4 mb-3 text-blue-500">Reader's review</h1>
            <div class="border-white border-2 w-6/12"></div>
            <div class="flex flex-col w-9/12 gap-3 mt-3 shadow-2xl">
                <div class="grid h-full card bg-base-300 rounded-box gap-y-3">
                    <CommentLayer v-for="comment in comments" :key="comment.id" :comment="comment" />
                </div>
                <form @submit.prevent="subminComment(bookdetail.id)" action="" v-if="!flagEdit">
                    <textarea v-model="commentText" class="textarea textarea-info w-8/12 ml-24" placeholder="Add review"></textarea>
                    <button class="btn btn-success align-top ml-5">SUBMIT</button>
                </form>
                <form @submit.prevent="submitEdit()" action="" v-if="flagEdit">
                    <textarea v-model="commentEdit" class="textarea textarea-info w-8/12 ml-24" placeholder="Add review"></textarea>
                    <button class="btn btn-success align-top ml-5">SUBMIT</button>
                </form>
            </div>
        </div>
    </section>
</template>

<style></style>