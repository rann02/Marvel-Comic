<script>
import { useCounterStore } from '../stores/counter'
import { mapActions, mapState, mapWritableState } from 'pinia'
export default {
    props: ['comment'],
    data() {
        return{
            imgUrl: localStorage.getItem('imgUrl')
        }
    },
    computed: {
        ...mapWritableState(useCounterStore, ['flagEdit', 'commentEdit', 'commentId'])
    },
    methods: {
        ...mapActions(useCounterStore, ['getCommentById']),
        getDataComment(id) {
            this.getCommentById(id)
            this.commentId = id
            this.flagEdit = true
        }
    }
}
</script>

<template>
    <div v-if="comment.length !== 0" class="flex items-center w-full p-4 self-center bg-slate-700 rounded-2xl">
        <div class="avatar ml-7">
            <div class="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                    :src="comment.avatar" />
            </div>
        </div>
        <div class="chat chat-start w-full flex ml-5">
            <div class="chat-bubble chat-bubble-primary text-x w-full">{{ comment.commentText }}</div>
            <div class="flex">
                <button @click.prevent="getDataComment(comment.id)"><img class="w-8" src="https://www.svgrepo.com/show/506185/edit-1.svg" alt=""></button>
            </div>
        </div>
    </div>
</template>