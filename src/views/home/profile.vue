<style scoped>
.fs-21{
    font-size: 12px;
}
.info{
    max-width: 150px;
}
</style>
<template>
    <Navbar title="Profil"/>
    <div class="container mt-5">
        <div class="container text-center">
            <img src="/img/pic.png" alt="" class="img-fluid rounded-circle" width="90px">
            <h6 class="mt-4">Rafi Ahfa Fauzan</h6>
            <p class="fs-21 text-muted bg-primary mx-auto rounded info">Devops - Windsurf</p>
        </div>

        <div class="container">
            <div class="row">
                <div class="col-12 bg-white shadow-sm mt-2 rounded py-3 px-4 d-flex align-items-center">
                    <div class="row">
                        <div class="col-2">
                            <span class="fas fa-phone"></span>
                        </div>
                        <div class="col-10 text-right">
                            Ubah Nomor Hp
                        </div>
                    </div>
                </div>
                <div class="col-12 bg-white shadow-sm mt-2 rounded py-3 px-4 d-flex align-items-center">
                    <div class="row">
                        <div class="col-2">
                            <span class="fas fa-envelope"></span>
                        </div>
                        <div class="col-10 text-right">
                            Ubah Email
                        </div>
                    </div>
                </div>
                <div class="col-12 bg-white shadow-sm mt-2 rounded py-3 px-4 d-flex align-items-center">
                    <div class="row">
                        <div class="col-2">
                            <span class="fas fa-key"></span>
                        </div>
                        <div class="col-10 text-right">
                            Ubah Password
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Navbar from '../../components/Navbar.vue'
</script>