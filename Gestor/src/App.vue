<script setup lang="ts">
  import MenuVue from './modules/principal/views/MenuVue.vue';
  import { RouterView, useRoute, useRouter } from 'vue-router';
  import { computed, onMounted, onUnmounted } from 'vue';
  import { useAutoLogout } from './modules/login/useAutoLogout';

  useAutoLogout(); // Puedes pasar el tiempo de inactividad en ms
  // Detecta si la vista actual debe ocultar el menú usando meta
  const router = useRouter();
  const route = useRoute();
  const mostrarMenu = computed(() => !route.meta.ocultarNavbar);
</script>

<template>
  <!-- Mostrar el Navbar solo si la ruta NO tiene la meta ocultarNavbar -->
  <header v-if="mostrarMenu">
    <MenuVue />
  </header>

  <RouterView />
</template>