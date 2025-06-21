<style scoped>
.fs-21{
    font-size: 12px;
}
.fs-22{
    font-size: 11px;
}
.mb-6{
    margin-bottom: 9vh;
}
.clock{
    object-fit: cover;
}
</style>

<template>
  <Navbar title="Kehadiran" />

  <div class="container">
    <div v-if="shift && !shift.shift_name === 'error'" class="mt-5 text-center">
      <h6>Oops !</h6>
      <span class="fs-21 text-muted">Shift Belum Di set, Silahkan hubungi administrator !</span>
    </div>

    <div v-else>
      <!-- Modal Masuk -->
      <div class="modal fade" id="masuk" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered mx-5">
          <div class="modal-content text-center">
            <div class="modal-header">
              <h6 class="modal-title">Preview Masuk</h6>
            </div>
            <div class="modal-body">
              <img v-if="clockInPreview" :src="clockInPreview" class="img-fluid" width="70%">
            </div>
            <div class="modal-footer text-center">
              <button type="button" class="btn btn-sm btn-primary w-100" data-dismiss="modal" @click="masuk">Masuk</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Pulang -->
      <div class="modal fade" id="pulang" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered mx-5">
          <div class="modal-content text-center">
            <div class="modal-header">
              <h6 class="modal-title">Preview Pulang</h6>
            </div>
            <div class="modal-body">
              <img v-if="clockOutPreview" :src="clockOutPreview" class="img-fluid" width="70%">
            </div>
            <div class="modal-footer text-center">
              <button type="button" class="btn btn-sm btn-primary w-100" data-dismiss="modal" @click="pulang">Pulang</button>
            </div>
          </div>
        </div>
      </div>

      <div class="container mt-5 text-center">
        <img src="/img/pic.png" class="img-fluid rounded-circle" width="90px"><br>
        <h6 class="mt-4">{{ nama }}</h6>
        <p class="text-muted fs-21">Windsurf - {{ shift && shift.shift_name }}</p>
        <span class="fs-21">{{ shift && shift.today }}</span><br>
        <span class="fs-22 btn btn-sm" :class="attendance && attendance.clock_in ? 'bg-success':'bg-danger'">{{ attendance && attendance.clock_in ? 'Tercatat':'Belum Tercatat' }}</span>
      </div>
  
      <div class="container bg-white shadow-sm p-2 mt-3 rounded">
        <div class="row text-center">
          <div class="col">
            <span class="fs-21">Masuk</span>
            <h5>{{ shift && shift.clock_in }}</h5>
          </div>
          <div class="col">
            <span class="fs-21">Pulang</span>
            <h5>{{ shift && shift.clock_out }}</h5>
          </div>
        </div>
      </div>
  
      <div class="container mt-2">
        <div class="row">
          <div class="col">
            <div v-if="attendance && attendance.clock_in" class="card border-0 bg-light">
              <img :src="BASEURL + attendance.clock_in_img" class="img-thumbnail rounded clock border-0 w-75 mx-auto" alt="">
              <div class="card-body text-center">
                <h6>{{ attendance.clock_in }}</h6>
                <span :class="attendance.clock_in_status === 'Tepat' ? 'bg-success':'bg-danger'" class="fs-21 py-1 px-2 rounded">{{ attendance.clock_in_status }}</span>
              </div>
            </div>
          </div>
          <div class="col">
            <div v-if="attendance && attendance.clock_out" class="card border-0 bg-light">
              <img :src="BASEURL + attendance.clock_out_img" class="img-thumbnail rounded clock border-0 w-75 mx-auto" alt="">
              <div class="card-body text-center">
                <h6>{{ attendance.clock_out }}</h6>
                <span :class="attendance.clock_out_status === 'Tepat' ? 'bg-success':'bg-danger'" class="fs-21 py-1 px-2 rounded">{{ attendance.clock_out_status }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div class="container p-1 fixed-bottom mb-6">
        <div class="row">
          <div class="col text-right">
            <label class="btn btn-primary w-50">
              <input type="file" capture="camera" @change="(e) => handleImageInput(e, true)" hidden>
              Masuk
            </label>
          </div>
          <div class="col text-left">
            <label class="btn btn-primary w-50">
              <input type="file" capture="camera" @change="(e) => handleImageInput(e, false)" hidden>
              Pulang
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Panel />
</template>


<script setup>
import { onMounted,ref } from 'vue'
import axios from 'axios'
import swal from 'sweetalert'
import Navbar from '../../components/Navbar.vue'
import Panel from '../../components/Panel.vue'

const BASEURL = import.meta.env.VITE_BASE_URL

const attendance = ref()
const shift = ref()
const clockInPreview = ref(null)
const clockOutPreview = ref(null)
const clockIner = ref(false)
const clockOuter = ref(false)
const isMasuk = ref(true)

const token = localStorage.getItem('api-token')
const user = localStorage.getItem('user')

const nama = JSON.parse(user).name

// Crop square 300x300 pakai canvas
const cropToSquare = (file, callback) => {
  const reader = new FileReader()
  const img = new Image()

  reader.onload = () => {
    img.src = reader.result
  }

  img.onload = () => {
    const size = Math.min(img.width, img.height)
    const offsetX = (img.width - size) / 2
    const offsetY = (img.height - size) / 2

    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = 300
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, offsetX, offsetY, size, size, 0, 0, 300, 300)

    const dataURL = canvas.toDataURL('image/jpeg')
    callback(dataURL)
  }

  reader.readAsDataURL(file)
}

// Fungsi tunggal untuk masuk/pulang
const handleImageInput = (event, masuk = true) => {
  const file = event.target.files[0]
  if (!file) return

  isMasuk.value = masuk

  cropToSquare(file, (croppedUrl) => {
    if (masuk) {
      clockInPreview.value = croppedUrl
      clockIner.value = true
      $('#masuk').modal('show')
    } else {
      clockOutPreview.value = croppedUrl
      clockOuter.value = true
      $('#pulang').modal('show')
    }
  })
}

const masuk = async () => {
  const file = clockInPreview.value
  if(!file){
    alert('Gambar tidak ada !')
  }
  
  const response = await axios.post(`${BASEURL}/attendance/clock-in`, { 'clock-in':file }, {
    headers:{
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    }
  });

  if(response.data.type === 'success'){
    $('#masuk').modal('hide')

    swal({
      toast: true,
      icon: 'success',
      title: 'Kehadiran berhasil tercatat !',
      text: '\n',
      timer: 1500,
      buttons: false,
    })

    window.location.reload();
  }
}

const pulang = async () => {
  const file = clockOutPreview.value
  if(!file){
    alert('Gambar tidak ada !')
  }

  const response = await axios.post(`${BASEURL}/attendance/clock-out`, { 'clock-out':file }, {
    headers:{
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    }
  })

  if(response.data.type === 'success'){
    $('#pulang').modal('hide')
    
    swal({
      icon: 'success',
      title: 'Kehadiran berhasil tercatat !',
      text: '\n',
      timer: 2000,
      buttons: false,
    })

    window.location.reload();
  }
}

onMounted(async () => {
  const today = await axios.get(`${BASEURL}/attendance/index`, {
    headers:{
      'Authorization':`Bearer ${token}`
    }
  });

  if(today){
    attendance.value = today.data.data
    shift.value = today.data.shift
  }

  console.log(import.meta.env.VITE_BASE_URL)
});
</script>
