<template>
    <br><br><br><br>
    <div class="container-fluid bg-white pt-2 pb-2 shadow-sm fixed-bottom">
        <div class="row text-center">
            <div class="col">
                <router-link to="/schedule" class="text-decoration-none text-dark">
                    <span class="fas fa-clock fs-22"></span><br>
                    <span class="fs-21">Jadwal</span>
                </router-link>
            </div>
            <div class="col">
                <router-link to="/" class="text-decoration-none text-dark">
                    <span class="fas fa-camera fs-22"></span><br>
                    <span class="fs-21">Hadir</span>
                </router-link>
            </div>
            <div class="col">
                <router-link to="/payslip" class="text-decoration-none text-dark">
                    <span class="fas fa-wallet fs-22"></span><br>
                    <span class="fs-21">Gajian</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
.fs-21{
    font-size: 12px;
}
.fs-22{
    font-size: 14px;
}
</style>