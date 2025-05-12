<template>
  <header class="header">
    <nav class="nav">
      <div class="nav__data">
        <div class="nav_hijo">
          <div class="nav_logo">
            <i class="ri-reactjs-line logo_app"></i>
          </div>
           <div class="contenedor_roles_menu" v-if="rol">
              <p class="p_rol">ROL: {{ rol.toLocaleUpperCase() }}</p>
            </div>
          <div class="nav__toggle" ref="navToggle">
            <i class="ri-menu-line nav__burger"></i>
            <i class="ri-close-line nav__close"></i>
          </div>
        </div>
      </div>

      <div class="nav__menu" ref="navMenu">
        <ul class="nav__list">
          <!-- Menú común para todos los roles -->
          <!--
          <li><a href="/" class="nav__link">Inicio</a></li>
          <li class="contenedor_menu">
            <div class="nav__link" v-if="rol">
              <p class="p_rol"><i class="ri-id-card-fill logo_menu_bar"></i> Rol: {{ rol }}</p>
            </div>
          </li>
          -->
          <!-- Menú exclusivo para ADMINISTRADOR -->
          <li class="contenedor_menu" v-if="rol === 'administrador'">
            <a href="/corte" class="nav__link">
              <i class="ri-grid-fill logo_menu_opciones"></i>
              <div class="contenedor_p">
                <p class="p_page">Gestion De Cortes</p>
              </div>
            </a>
            <a href="/usuario" class="nav__link">
              <i class="ri-article-fill logo_menu_opciones"></i>
              <div class="contenedor_p">
                <p class="p_page">Datos Fiscales</p>
              </div>
            </a>
            <a href="/analisis" class="nav__link">
              <i class="ri-pie-chart-fill logo_menu_opciones"></i>
              <div class="contenedor_p">
                <p class="p_page">Analisis</p>
              </div>
            </a>
          </li>

          <!-- Menú exclusivo para ANALISTA -->
          <li class="contenedor_menu" v-if="rol === 'analista'">
            <a href="/usuario" class="nav__link">
              <i class="ri-article-fill logo_menu_opciones"></i>
              <div class="contenedor_p">
                <p class="p_page">Datos Fiscales</p>
              </div>
            </a>
          </li>

          <!-- Menú exclusivo para REPORTES -->
          <li class="contenedor_menu" v-if="rol === 'reportes'">
            <a href="/analisis" class="nav__link">
              <i class="ri-pie-chart-fill logo_menu_opciones"></i>
              <div class="contenedor_p">
                <p class="p_page">Analisis</p>
              </div>
            </a>
          </li>

          <!-- Botón de cerrar sesión para todos -->
          <li class="contenedor_menu">
            <a href="#" @click.prevent="cerrarSesion" class="nav__link nav__link__signout">
              <i class="ri-logout-box-fill logo_menu_opciones"></i>
              <div class="contenedor_p">
                <p class="p_page">Cerrar Sesión</p>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// @ts-ignore
import { setupMenu } from '../../../assets/menu.js'
import { useRouter } from 'vue-router'

const navToggle = ref<HTMLElement | null>(null)
const navMenu = ref<HTMLElement | null>(null)
const router = useRouter()

onMounted(() => {
  setupMenu(navToggle.value, navMenu.value)
})

function cerrarSesion() {
  localStorage.removeItem('token') // Elimina el token
  router.push('/signin') // Redirige al login
}

//Menus difrtes para cada rol
const rol = ref<string | null>(null)

onMounted(() => {
  rol.value = localStorage.getItem('rol')
})

</script>


<style lang="scss">
  

/*=============== GOOGLE FONTS ===============*/
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap");
.nav__link {
  color: #f8f9fa;
  background-color: var(--black-color);
  font-weight: var(--font-semi-bold);
  padding: 1rem 1rem;
  display: flex;
  justify-content: start;
  align-items: center;
  transition: background-color .3s;
  column-gap: 10px;
}

.nav__link:hover {
  background-color: #90CAF9;
  color: #f8f9fa;
}
.contenedor_p {
  display: flex;
  justify-content: center;
  align-items: center;

}
.p_page {
  font-size: 0.9rem;
  
  margin: 0;
}
.logo_menu_opciones {
  font-size: 1.3rem;
  
}
.nav__link__signout {
  justify-content: end;
}

.nav__link__signout:hover {
  background-color: #D32F2F;
  
}
.contenedor_roles_menu {
  display: flex;
  justify-content: center;
  align-items: center;
}
/*=============== VARIABLES CSS ===============*/
:root {
  --header-height: 3.5rem;

  /*========== Colors ==========*/
  /*Color mode HSL(hue, saturation, lightness)*/
  --black-color: #1565C0;
  --black-color-light: hsl(220, 24%, 15%);
  --black-color-lighten: hsl(220, 20%, 18%);
  --white-color: #fff;
  --body-color: hsl(220, 100%, 97%);

  /*========== Font and typography ==========*/
  /*.5rem = 8px | 1rem = 16px ...*/
  --body-font: "Montserrat", sans-serif;
  --normal-font-size: .938rem;

  /*========== Font weight ==========*/
  --font-regular: 400;
  --font-semi-bold: 600;

  /*========== z index ==========*/
  --z-tooltip: 10;
  --z-fixed: 100;
}

/*========== Responsive typography ==========*/
@media screen and (min-width: 1024px) {
  :root {
    --normal-font-size: 1rem;
  }
}

/*=============== BASE ===============*/
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  font-family: var(--body-font);
  font-size: var(--normal-font-size);
  background-color: var(--body-color);
}

ul {
  list-style: none;
  /* Color highlighting when pressed on mobile devices */
  /*-webkit-tap-highlight-color: transparent;*/
}

a {
  text-decoration: none;
}

/*=============== REUSABLE CSS CLASSES ===============*/
.container {
}

/*=============== HEADER ===============*/
.header {

  top: 0;
  left: 0;
  width: 100%;
  background-color: var(--black-color);
  box-shadow: 0 2px 16px hsla(220, 32%, 8%, .3);

}

/*=============== NAV ===============*/
.nav {
  height: var(--header-height);
}

.nav__logo, 
.nav__burger, 
.nav__close {
  color: var(--white-color);
}

.nav__data {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav__logo {
  display: inline-flex;
  align-items: center;
  column-gap: .25rem;
  font-weight: var(--font-semi-bold);
  /* Color highlighting when pressed on mobile devices */
  /*-webkit-tap-highlight-color: transparent;*/
}

.nav__logo i {
  font-weight: initial;
  font-size: 1.25rem;
}

.nav__toggle {
  position: relative;
  width: 32px;
  height: 32px;
}

.nav__burger, 
.nav__close {
  position: absolute;
  width: max-content;
  height: max-content;
  inset: 0;
  margin: auto;
  cursor: pointer;
  transition: opacity .1s, transform .4s;
}

.nav__close {
  opacity: 0;
}

/* Navigation for mobile devices */

  .nav__menu {
    position: absolute;
    left: 0;
    top: 2.5rem;
    width: 100%;
    height: calc(100vh - 3.5rem);
    overflow: auto;
    pointer-events: none;
    opacity: 0;
    transition: top .4s, opacity .3s;
    z-index: 999; /* <-- AÑADE ESTA LÍNEA */
  }
  .nav__menu::-webkit-scrollbar {
    width: 0;
  }
  .nav__list {
    background-color: var(--black-color);
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
  }

/* Show menu */
.show-menu {
  opacity: 1;
  top: 3.5rem;
  pointer-events: initial;
}

/* Show icon */
.show-icon .nav__burger {
  opacity: 0;
  transform: rotate(90deg);
}
.show-icon .nav__close {
  opacity: 1;
  transform: rotate(90deg);
}

/*=============== DROPDOWN ===============*/
.dropdown__item {
  cursor: pointer;
}

.dropdown__arrow {
  font-size: 1.25rem;
  font-weight: initial;
  transition: transform .4s;
}

.dropdown__link, 
.dropdown__sublink {
  padding: 1.25rem 1.25rem 1.25rem 2.5rem;
  color: var(--white-color);
  background-color: var(--black-color-light);
  display: flex;
  align-items: center;
  column-gap: .5rem;
  font-weight: var(--font-semi-bold);
  transition: background-color .3s;
}

.dropdown__link i, 
.dropdown__sublink i {
  font-size: 1.25rem;
  font-weight: initial;
}

.dropdown__link:hover, 
.dropdown__sublink:hover {
  background-color: var(--black-color);
}

.dropdown__menu, 
.dropdown__submenu {
  max-height: 0;
  overflow: hidden;
  transition: max-height .4s ease-out;
}

/* Show dropdown menu & submenu */
.dropdown__item:hover .dropdown__menu, 
.dropdown__subitem:hover > .dropdown__submenu {
  max-height: 1000px;
  transition: max-height .4s ease-in;
}

/* Rotate dropdown icon */
.dropdown__item:hover .dropdown__arrow {
  transform: rotate(180deg);
}

/*=============== DROPDOWN SUBMENU ===============*/
.dropdown__add {
  margin-left: auto;
}

.dropdown__sublink {
  background-color: var(--black-color-lighten);
}

/*=============== BREAKPOINTS ===============*/
/* For small devices */
@media screen and (max-width: 340px) {
  .container {
  }

  .nav__link {

  }
}

/* For large devices */

header.header {
  width: 100%;
  margin: 0px;
  padding: 0px;
}
div.nav__data {
  margin: 0px;
  width: 100%;
  padding: 0px;
  display: flex;
  justify-content: center;
  
}
.nav_hijo {
  display: flex;
  flex-direction: row;
  width: 94%;
  justify-content: space-between;
}
.logo_app {
  font-size: 1.5rem !important;
  color: #f8f9fa !important;
}
.nav__burger, 
.nav__close {
  font-size: 1.5rem !important;
  color: #f8f9fa !important;
}
.nav_rol {
  display: flex;
  align-items: center;  /* Alinea verticalmente el texto dentro del contenedor */
  justify-content: center;  /* Alinea horizontalmente el texto dentro del contenedor */
  min-height: 100%;  /* Asegura que ocupe toda la altura disponible */
}

.p_rol {
  font-size: 1.2rem;
  font-weight: bold;
  color: #f8f9fa;
  margin: 0;  /* Elimina el margen por defecto del <p> */
}

</style>