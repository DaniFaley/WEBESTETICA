<script setup lang="ts">
  import MenuVue from './modules/principal/views/MenuVue.vue';
  import { RouterView, useRoute, useRouter } from 'vue-router';
  import { computed, onMounted, onUnmounted } from 'vue';

// Detecta si la vista actual debe ocultar el menú usando meta
const router = useRouter();
const route = useRoute();
const mostrarMenu = computed(() => !route.meta.ocultarNavbar);

// Tiempo de inactividad en milisegundos (2 minutos)
  const TIEMPO_INACTIVIDAD = 2 * 60 * 1000;

  let temporizadorInactividad: ReturnType<typeof setTimeout>;

  // Función para cerrar sesión
  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    router.push('/'); // O redireccionar a /login
  };

  // Reiniciar el temporizador de inactividad
  const reiniciarTemporizador = () => {
    clearTimeout(temporizadorInactividad);
    temporizadorInactividad = setTimeout(() => {
      cerrarSesion();
      alert('Sesión cerrada por inactividad');
    }, TIEMPO_INACTIVIDAD);
  };

  onMounted(() => {
    // Detectar eventos de actividad del usuario
    window.addEventListener('mousemove', reiniciarTemporizador);
    window.addEventListener('keydown', reiniciarTemporizador);
    window.addEventListener('click', reiniciarTemporizador);
    window.addEventListener('scroll', reiniciarTemporizador);

    // Cierre de sesión si el usuario cierra o recarga la página
    window.addEventListener('beforeunload', cerrarSesion);

    // Iniciar temporizador al montar
    reiniciarTemporizador();
  });

  onUnmounted(() => {
    // Limpiar eventos
    window.removeEventListener('mousemove', reiniciarTemporizador);
    window.removeEventListener('keydown', reiniciarTemporizador);
    window.removeEventListener('click', reiniciarTemporizador);
    window.removeEventListener('scroll', reiniciarTemporizador);
    window.removeEventListener('beforeunload', cerrarSesion);
    clearTimeout(temporizadorInactividad);
  });
</script>

<template>
  <!-- Mostrar el Navbar solo si la ruta NO tiene la meta ocultarNavbar -->
  <header v-if="mostrarMenu">
    <MenuVue />
  </header>

  <RouterView />
</template>