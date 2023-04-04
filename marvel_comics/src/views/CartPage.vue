<script>
import { mapActions, mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'
export default {
    computed: {
        ...mapState(useCounterStore, ['purchases'])
    },
    methods: {
        ...mapActions(useCounterStore, ['deletePurchase', 'fetchPurchase', 'checkout']),
        rupiah(number) {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR"
            }).format(number);
        },
        totalPrice(purchase) {
            let total = 0
            for (let i = 0; i < purchase.length; i++) {
                total += purchase[i].totalPrice
                // console.log(total);
            }
            return total
        },
        async clickDelete(id) {
            try {
                const { data } = await this.deletePurchase(id)
                await this.fetchPurchase()
                console.log(data.messege);
            } catch (error) {
                console.log(error);
            }
        },
        submitCheckout(){
         this.checkout()
        }
    }
}
</script>

<template>
    <section>
        <div class="hero min-h-screen bg-base-200 rounded-2xl bg-slate-800 flex flex-col justify-center items-center">
            <div class="hero-content flex-col lg:flex-row-reverse shadow-2xl bg-slate-900 rounded-2xl w-9/12">
                <div class="w-full">
                    <h1 class="text-5xl text-center font-bold mb-3">Order</h1>
                    <div class="w-full border-blue-50  border-y-2"></div>
                    <div class="overflow-x-auto">
                        <table class="table w-full opacity-50">
                            <!-- head -->
                            <thead>
                                <tr>
                                    <th class="w-6/12"></th>
                                    <th class="w-5/12"></th>
                                    <th class="1/12"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- row 1 -->
                                <tr v-for="purchase in purchases">
                                    <td class="text-white">{{ purchase.Book.title }}</td>
                                    <td class="text-white">{{ rupiah(purchase.Book.price) }}</td>
                                    <td><button @click.prevent="clickDelete(purchase.id)"><img class="h-7"
                                                src="https://www.svgrepo.com/show/468533/delete-alt.svg" alt=""></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="w-full border-blue-50  border-y-2 mt-3"></div>
                    <div class="flex space-x-5 mt-3">
                        <span class="text-green-500">Subtotal:</span>
                        <span class="text-green-400">{{ rupiah(totalPrice(purchases)) }}</span>
                    </div>

                    <div class="flex gap-3 p-4">
                        <button @click.prevent="submitCheckout" class="btn btn-primary w-6/12">Checkout</button>
                        <RouterLink to="/" class="btn btn-primary w-6/12">Back</RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style></style>