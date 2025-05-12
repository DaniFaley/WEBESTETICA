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
  
      <!-- BODY -->
      <main class="main-content">
        <div class="contenedor_info_inicio">
          <h3 class="h3_Titulo">Bienvenido a AdmiPath</h3>
          <p class="p_descripcion">
            Lleva el control de tus registros de cortes, notas de venta automatizadas, etc.
          </p>
        </div>
  
        <!-- Hamster sin cambios -->
        <div aria-label="Orange and tan hamster running in a metal wheel" role="img" class="wheel-and-hamster">
          <div class="wheel"></div>
          <div class="hamster">
            <div class="hamster__body">
              <div class="hamster__head">
                <div class="hamster__ear"></div>
                <div class="hamster__eye"></div>
                <div class="hamster__nose"></div>
              </div>
              <div class="hamster__limb hamster__limb--fr"></div>
              <div class="hamster__limb hamster__limb--fl"></div>
              <div class="hamster__limb hamster__limb--br"></div>
              <div class="hamster__limb hamster__limb--bl"></div>
              <div class="hamster__tail"></div>
            </div>
          </div>
          <div class="spoke"></div>
        </div>
  
        <!-- Botón de acceso -->
        <div class="contenedor_boton">
          <router-link to="/signin" class="btn btn-sm boton_inicio">
            <p class="p_boton"> Iniciar sesión <i class="ri-login-box-fill"></i></p>
          </router-link>
        </div>
      </main>
  
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
  
  <script setup lang="ts">
  </script>
  
  <style scoped>
  @import '../../../assets/styles_inicio.css';

  </style>
  