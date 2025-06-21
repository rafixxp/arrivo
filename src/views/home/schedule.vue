<template>
    <Navbar title="Jadwal"/>
    <div class="container mt-5">
        <div class="row">
            <div class="col-12" v-for="sched in schedule">
                <div class="card bg-white shadow-sm border-0">
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                                <h6>{{ sched.shift_name }}</h6>
                            </div>
                            <div class="col text-right">
                                <span class="fs-22">{{ sched.date }}</span>
                            </div>
                        </div>
                        <span class="fs-21">{{ sched.clock_in + ' - ' + sched.clock_out}}</span>
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
import axios from 'axios'
import { onMounted,ref } from 'vue'

const schedule = ref()
const BASEURL = 'http://localhost:8001/api'
const token = localStorage.getItem('api-token')

onMounted(async () => {
    const sched = await axios.get(`${BASEURL}/schedule`,{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    })

    if(sched){
        schedule.value = sched.data.schedule
    }
});


</script>