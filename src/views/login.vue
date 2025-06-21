<template>
    <div class="container text-center">
        <div class="mt-5">
            <img src="/vite.svg" class="img-fluid" width="70px">
        </div><br>
        <div class="row">
            <div class="col-10 mx-auto">
                <div class="card bg-white shadow-sm">
                    <div class="card-body">
                        <div class="form-group">
                            <input type="text" v-model="data.email" class="form-control border-0" placeholder="Username">
                        </div>
                        <div class="form-group">
                            <input type="text" v-model="data.password" class="form-control border-0" placeholder="Password">
                        </div>
                        <div class="form-group">
                            <button class="btn btn-primary w-100 fs-22" @click="login">Sign In</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import router from '../router'
import axios from 'axios'

const BASEURL = import.meta.env.VITE_BASE_URL

const data = ref({email: '', password:''})

const login = async () => {
    const attempt = await axios.post(`${BASEURL}/auth/login`, data.value, {
        headers: {
            'content-type':'application/json'
        }
    });

    if(attempt.status == 200){
        localStorage.setItem('api-token', attempt.data.token)
        localStorage.setItem('user', JSON.stringify(attempt.data.user))
        router.push({name: 'home'})
    }
}
</script>