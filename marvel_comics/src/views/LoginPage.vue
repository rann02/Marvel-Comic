<script>
import { useCounterStore } from '../stores/counter'
import { mapActions, mapState, mapWritableState } from 'pinia'
export default{
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        ...mapActions(useCounterStore, ['login']),
        async loginTriger() {
            try {
                const { data } = await this.login({
                    email: this.email,
                    password: this.password
                })
                localStorage.setItem('access_token', data.token)
                localStorage.setItem('id', data.id)
                localStorage.setItem('name', data.username)
                localStorage.setItem('imgUrl', data.imgUrl)
                this.profile = localStorage.getItem('imgUrl')
                this.isLogin = true
                this.$router.push('/')
            } catch (error) {
                console.log(error.response);
            }
        }
    }, 
    computed: {
        ...mapWritableState(useCounterStore, ['isLogin', 'profile']),
    }
}
</script>

<template>
    <div class="hero min-h-screen bg-slate-800 rounded-2xl shadow-2xl">
        <div class="shadow-2xl hero-content flex-col lg:flex-row  backdrop-opacity-10 rounded-2xl bg-slate-600">
            <img src="https://images.unsplash.com/photo-1620075267033-09d12ec75b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bWFydmVsJTIwY29taWNzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                class="max-w-sm shadow-2xl rounded-2xl" />
            <div class="text-center">
                <h1 class="text-5xl font-bold text-slate-400">Log in Now!</h1>
                <p class="py-6 text-slate-300">Meet all the people with good pasion!</p>
                <form @submit.prevent="loginTriger" class="p-5 flex flex-col gap-2 backdrop-opacity-10 rounded-2xl backdrop-invert bg-white/30">
                    <label class="text-slate-800" for="email">Email</label>
                    <input v-model="email" id="email" type="text" placeholder="Type here" class="input input-bordered input-info" />
                    <label class="text-slate-800" for="password">Password</label>
                    <input v-model="password" id="password" type="password" placeholder="Type here" class="input input-bordered input-info" />
                    <button class="btn btn-outline w-full text-slate-800">SUBMIT</button>
                    <span class="text-center text-slate-800">or Sign in with</span>
                    <button class="btn btn-wide self-center">Google</button>
                </form>
            </div>
        </div>
    </div>
</template>

<style>
</style>