<script setup>
defineProps({
    title: String
});

const back = () => {
    history.back();
}
</script>

<template>
    <div class="container-fluid bg-white shadow-sm p-2 fixed-top">
        <div class="d-flex align-items-center">
            <button class="btn btn-default btn-sm fs-4 mr-2" @click="back">
            <i class="fas fa-arrow-left"></i>
            </button>
            <h6 class="mb-0">{{ title }}</h6>

            <router-link to="/profile" class="ml-auto">
                <img src="/img/pic.png" alt="" class="img-fluid rounded-circle" width="35px">
            </router-link>
        </div>
    </div>

    <br>
</template>

<style scoped>
.fs-4{
    font-size: 18px;
    font-weight: 900;
}
</style>