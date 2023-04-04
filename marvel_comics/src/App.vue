<script>
import Navbar from './components/Navbar.vue';
export default{
    components: {
        Navbar
    }
}
</script>

<template>
    <div class="w-10/12 mx-auto">
        <Navbar/>
        <RouterView/>
    </div>
</template>

<style scoped>
</style>
