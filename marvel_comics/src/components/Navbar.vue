<script>
import { useCounterStore } from '../stores/counter'
import { mapActions, mapWritableState, mapState } from 'pinia'
export default {
    data() {
        return {
            // imgUrl: ''
        }
    },
    created() {
        this.fetchPurchase()
        if (localStorage.access_token) {
            this.profile = localStorage.getItem('imgUrl')
            this.isLogin = true
        }
    },
    computed: {
        ...mapWritableState(useCounterStore, ['isLogin', 'profile']),
        ...mapState(useCounterStore, ['purchases'])
    },
    methods: {
        ...mapActions(useCounterStore, ['fetchPurchase', 'logout', 'login']),
        async showCart(){
            try {
                await this.fetchPurchase()
                this.$router.push('/cart')
            } catch (error) {
                console.log(error);
            }
        },
        cliclLogout() {
            this.logout()
            this.isLogin = false
            this.$router.push('/')
        }
    }
}
</script>

<template>
    <div class="navbar bg-zinc-800 rounded-2xl text-slate-100 sticky top-0 z-50 mx-auto">
        <div class="navbar-start">
            <div class="dropdown">
                <label tabindex="0" class="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                </label>
                <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                        <RouterLink to="/">Homepage</RouterLink>
                    </li>
                    <li v-if="!isLogin">
                        <RouterLink to="/login">Signin</RouterLink>
                    </li>
                    <li v-if="!isLogin">
                        <RouterLink to="/register">Signup</RouterLink>
                    </li>
                </ul>
            </div>
        </div>
        <div class="navbar-center">
            <a class="btn btn-ghost normal-case text-xl">daisyUI</a>
        </div>
        <div class="navbar-end" v-if="isLogin">
            <div class="dropdown dropdown-end">
                <label tabindex="0" class="btn btn-ghost btn-circle">
                    <div class="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span class="badge badge-sm indicator-item bg-green-800 text-slate-50">{{ purchases.length }}</span>
                    </div>
                </label>
                <div tabindex="0" class="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
                    <div class="card-body">
                        <span class="font-bold text-lg">{{ purchases.length }} Items</span>
                        <div class="card-actions">
                            <button @click.prevent="showCart" class="btn btn-primary btn-block">View cart</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dropdown dropdown-end">
                <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img :src="profile" />
                    </div>
                </label>
                <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                    <li><a @click.prevent="cliclLogout">Logout</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style></style>