<script>
import { useCounterStore } from '../stores/counter'
import { mapActions, mapState } from 'pinia'
export default {
    data() {
        return {
            username: '',
            email: '',
            password: ''
        }
    },
    created(){

    },
    methods: {
        ...mapActions(useCounterStore, ['register']),
        async registerTrigger(){
            try {
                const { data } = await this.register({
                    username: this.username,
                    email: this.email,
                    password: this.password
                })
                console.log(data.message);
                this.$router.push('/login')
            } catch (error) {
                console.log(error.response);
            }
        }
    }
}
</script>

<template>
    <div class="hero min-h-screen bg-slate-800 rounded-2xl shadow-2xl">
        <div class="shadow-2xl hero-content flex-col lg:flex-row  backdrop-opacity-10 rounded-2xl bg-slate-600">
            <img src="https://images.pexels.com/photos/7809122/pexels-photo-7809122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                class="max-w-sm shadow-2xl rounded-2xl" />
            <div class="text-center">
                <h1 class="text-5xl font-bold text-slate-400">Register Now!</h1>
                <p class="py-6 text-slate-300"> Get all joyfull, and enjoy!</p>
                <form id="form_signin" @submit.prevent="registerTrigger"
                    class="w-full p-5 flex flex-col gap-2 backdrop-opacity-10 rounded-2xl backdrop-invert bg-white/30">
                    <label for="username" class="text-slate-800">Username</label>
                    <input v-model="username" id="username" type="text" placeholder="Type here" class="input input-bordered input-info" />
                    <label for="email" class="text-slate-800">Email</label>
                    <input v-model="email" id="email" type="text" placeholder="Type here" class="input input-bordered input-info" />
                    <label for="password" class="text-slate-800">Password</label>
                    <input v-model="password" id="password" type="password" placeholder="Type here" class="input input-bordered input-info" />
                    <button class="btn btn-outline w-full text-slate-800">SUBMIT</button>
                    <button class="btn btn-active btn-ghost w-full" type="button">Login</button>
                </form>
            </div>
        </div>
    </div>
</template>

<style></style>