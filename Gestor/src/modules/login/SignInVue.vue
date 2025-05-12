<template>
  <div class="layout">
    <!-- HEADER -->
    <header class="header">
      <div class="logo">
        <router-link to="/" class="logo-link">
            <h3 class="h3_titulo_Menu"><i class="ri-scissors-cut-line"></i> AdmiPath</h3>
        </router-link>
      </div>
    </header>
    

    <!-- CONTENIDO PRINCIPAL -->
    <div class="contenedor_formulario">
      <form class="formulario" @submit.prevent="login">
        <h3 class="h3_Titulo">Iniciar Sesion</h3>
        <div class="contenedor_input">
          <p class="p_input">Correo</p>
          <input class="p_valor" type="email" v-model="correo" required />
        </div>
        <div class="contenedor_input">
          <p class="p_input">Contraseña</p>
          <input class="p_valor" type="password" v-model="contrasena" required />
        </div>
        <p v-if="error" class="p_error">{{ error }}</p>
        <div class="contenedor_signin">
          <button class="btn btn-primary boton_sigin" type="submit">
            <i class="ri-login-circle-fill"></i>
          </button>
        </div>
      </form>
    </div>

    <!-- FOOTER -->
    <footer class="footer">
      <p>© 2025 AdmiPath. Todos los derechos reservados.</p>
      <div class="socials">
        <a href="#"><i class="ri-facebook-circle-line"></i></a>
        <a href="#"><i class="ri-instagram-line"></i></a>
        <a href="#"><i class="ri-mail-line"></i></a>
      </div>
    </footer>
  </div>
</template>


<script lang="ts" setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const correo = ref('')
const contrasena = ref('')
const error = ref('')
const router = useRouter()

const login = async () => {
  try {
    const { data } = await axios.post('https://apiestetica-production-5f1e.up.railway.app/api/Auth/login/', {
      correo: correo.value,
      contrasena: contrasena.value,
    })

    localStorage.setItem('token', data.token)
    localStorage.setItem('rol', data.rol)

    if (data.rol === 'administrador') {
      router.push('/corte')
    } 
    else if(data.rol === 'analista') {
      router.push('/usuario')
    }
    else if(data.rol === 'reportes') {
      router.push('/analisis')
    }
  } catch (err: any) {
    error.value = err.response?.data?.msg || 'Error al iniciar sesión'
  }
}
</script>

<style scoped>
    @import '../../assets/styles_signin.css';
</style> 