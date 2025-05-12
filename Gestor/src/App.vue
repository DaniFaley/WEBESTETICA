<script setup lang="ts">
import MenuVue from './modules/principal/views/MenuVue.vue';
import { RouterView, useRoute } from 'vue-router';
import { computed } from 'vue';

// Detecta si la vista actual debe ocultar el menú usando meta
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