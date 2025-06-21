
<template>
    <Navbar title="Gajian"/>
    <div class="container mt-5">
        <div class="row">
            <div class="col">
                <span class="fs-21 mx-2">Tanggal Awal</span>
                <input type="date" class="form-control border-0 fs-22" id=""><br>
            </div>
            <div class="col">
                <span class="fs-21 mx-2">Tanggal Akhir</span>
                <input type="date" class="form-control border-0 fs-22" id=""><br>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="card bg-white shadow-sm">
                    <div class="card-body">
                        <h6 class="fs-22">20 Mei 2025 - 21 Juni 2025</h6>
                        <span class="fs-21">Rp. 3.000.000</span>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="card bg-white shadow-sm">
                    <div class="card-body">
                        <h6 class="fs-22">21 April 2025 - 20 Mei 2025</h6>
                        <span class="fs-21">Rp. 3.000.000</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Panel/>
</template>

<script setup>
import Navbar from '../../components/Navbar.vue'
import Panel from '../../components/Panel.vue'
</script>