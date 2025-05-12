import { createRouter, createWebHistory } from 'vue-router'
import CorteVue from '@/modules/corte/views/CorteVue.vue'
import UsuarioVue from '@/modules/Usuario/views/UsuarioVue.vue'
import CorteDetallesVue from '@/modules/corte/views/CorteDetallesVue.vue'
import CorteEliminarVue from '@/modules/corte/views/CorteEliminarVue.vue'
import CorteEditarVue from '@/modules/corte/views/CorteEditarVue.vue'
import CorteAgregarVue from '@/modules/corte/views/CorteAgregarVue.vue'
import UsuarioEditarVue from '@/modules/Usuario/views/UsuarioEditarVue.vue'
import UsuarioAgregarVue from '@/modules/Usuario/views/UsuarioAgregarVue.vue'
import InicioVue from '@/modules/principal/views/InicioVue.vue'
import SignInVue from '@/modules/login/SignInVue.vue'
import AnalisisVue from '@/modules/corte/views/AnalisisVue.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Redirección automática al cargar la app
    {
      path: '/',
      redirect: '/inicio'
    },
    {
      path: '/corte',
      name: 'corte',
      component: CorteVue,
      meta: { rolesPermitidos: ['administrador'] }
    },
    {
      path: '/corte/agregar',
      name: 'corteagregar',
      component: CorteAgregarVue,
      meta: { rolesPermitidos: ['administrador'] }
    },
    {
      path: '/corte/:id_corte/editar',
      name: 'corteeditar',
      component: CorteEditarVue,
      meta: { rolesPermitidos: ['administrador'] }
    },
    {
      path: '/corte/:id_corte/eliminar',
      name: 'corteeliminar',
      component: CorteEliminarVue,
      meta: { rolesPermitidos: ['administrador'] }
    },
    {
      path: '/corte/:id_corte/detalles',
      name: 'cortedetalles',
      component: CorteDetallesVue,
      meta: { rolesPermitidos: ['administrador'] }
    },
    {
      path: '/usuario',
      name: 'usuario',
      component: UsuarioVue,
      meta: { rolesPermitidos: ['administrador', 'analista'] }
    },
    {
      path: '/usuario/:id_datos_usuario/editar',
      name: 'usuarioeditar',
      component: UsuarioEditarVue,
      meta: { rolesPermitidos: ['administrador', 'analista'] }
    },
    {
      path: '/usuario/agregar',
      name: 'usuarioagregar',
      component: UsuarioAgregarVue,
      meta: { rolesPermitidos: ['administrador', 'analista'] }
    },
    {
      path: '/analisis',
      name: 'analisis',
      component: AnalisisVue,
      meta: { rolesPermitidos: ['administrador', 'reportes'] }
    },
    {
      path: '/inicio',
      name: 'inicio',
      component: InicioVue,
      meta: { ocultarNavbar: true }
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignInVue,
      meta: { ocultarNavbar: true }
    },
    // Redirección para rutas no válidas
    {
      path: '/:pathMatch(.*)*',
      redirect: '/signin'
    }
  ],
})


// Rutas públicas que no requieren autenticación
const rutasPublicas = ['/signin', '/inicio']

// Protección de rutas por autenticación y rol
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const rol = localStorage.getItem('rol') // admin | analista | reportes

  // Permitir acceso a rutas públicas
  if (!token && rutasPublicas.includes(to.path)) {
    return next()
  }

  // Bloquear acceso si no hay token
  if (!token && !rutasPublicas.includes(to.path)) {
    return next('/signin')
  }

  // Bloquear acceso a signin si ya está logueado
    if (token && to.path === '/signin') {
    return next('/inicio')
  }  

  // Verificar acceso por rol
  const rolesPermitidos = to.meta.rolesPermitidos as string[] | undefined
  if (rolesPermitidos && !rolesPermitidos.includes(rol || '')) {
    // Cerrar sesión eliminando el token y rol del localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('rol')
    
    // Redirigir al usuario a la página de inicio de sesión
    return next('/signin')
  }

  return next()
})



export default router
