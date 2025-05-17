
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
import RolDetallesVue from '@/modules/Rol/views/RolDetallesVue.vue'
import RolEliminarVue from '@/modules/Rol/views/RolEliminarVue.vue'
import RolEditarVue from '@/modules/Rol/views/RolEditarVue.vue'
// import RolAgregarVue from '@/modules/Rol/views/RolAgregarVue.vue'
import RolVue from '@/modules/Rol/views/RolVue.vue'
import RolUsuarioVue from '@/modules/RolUsuario/views/RolUsuarioVue.vue'
import RolUsuarioAgregarVue from '@/modules/RolUsuario/views/RolUsuarioAgregarVue.vue'
import RolUsuarioEditarVue from '@/modules/RolUsuario/views/RolUsuarioEditarVue.vue'
import RolUsuarioEliminarVue from '@/modules/RolUsuario/views/RolUsuarioEliminarVue.vue'
import RolUsuarioDetallesVue from '@/modules/RolUsuario/views/RolUsuarioDetallesVue.vue'
import TablaVue from '@/modules/corte/views/TablaVue.vue'

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
      meta: { rolesPermitidos: ['administrador', 'estilista'] }
    },
    {
      path: '/corte/agregar',
      name: 'corteagregar',
      component: CorteAgregarVue,
      meta: { rolesPermitidos: ['administrador', 'estilista'] }
    },
    {
      path: '/corte/:id_corte/editar',
      name: 'corteeditar',
      component: CorteEditarVue,
      meta: { rolesPermitidos: ['administrador', 'estilista'] }
    },
    {
      path: '/corte/:id_corte/eliminar',
      name: 'corteeliminar',
      component: CorteEliminarVue,
      meta: { rolesPermitidos: ['administrador', 'estilista'] }
    },
    {
      path: '/corte/:id_corte/detalles',
      name: 'cortedetalles',
      component: CorteDetallesVue,
      meta: { rolesPermitidos: ['administrador', 'estilista'] }
    },
    {
      path: '/usuario',
      name: 'usuario',
      component: UsuarioVue,
      meta: { rolesPermitidos: ['administrador', 'estilista', 'contadora'] }
    },
    {
      path: '/usuario/:id_datos_usuario/editar',
      name: 'usuarioeditar',
      component: UsuarioEditarVue,
      meta: { rolesPermitidos: ['administrador', 'estilista', 'contadora'] }
    },
    {
      path: '/usuario/agregar',
      name: 'usuarioagregar',
      component: UsuarioAgregarVue,
      meta: { rolesPermitidos: ['administrador', 'estilista', 'contadora'] }
    },
    {
      path: '/rol',
      name: 'rol',
      component: RolVue,
      meta: { rolesPermitidos: ['administrador'] }
    },
    /*
     {
      path: '/rol/agregar',
      name: 'rolagregar',
      component: RolAgregarVue,
      meta: { rolesPermitidos: ['administrador'] }
    },
    */
    {
      path: '/rol/:id_rol/editar',
      name: 'roleditar',
      component: RolEditarVue,
      meta: { rolesPermitidos: ['administrador'] }
    },
    {
      path: '/rol/:id_rol/eliminar',
      name: 'roleliminar',
      component: RolEliminarVue,
      meta: { rolesPermitidos: ['administrador'] }
    },
    {
      path: '/rol/:id_rol/detalles',
      name: 'roldetalles',
      component: RolDetallesVue,
      meta: { rolesPermitidos: ['administrador'] }
    },
    

    {
      path: '/rol_usuario',
      name: 'rol_usuario',
      component: RolUsuarioVue,
      meta: { rolesPermitidos: ['administrador'] }
    },
    {
      path: '/rol_usuario/agregar',
      name: 'rol_usuarioagregar',
      component: RolUsuarioAgregarVue,
      meta: { rolesPermitidos: ['administrador'] }
    },
    {
      path: '/rol_usuario/:id_usuario/editar',
      name: 'rol_usuarioeditar',
      component: RolUsuarioEditarVue,
      meta: { rolesPermitidos: ['administrador'] }
    },
    {
      path: '/rol_usuario/:id_usuario/eliminar',
      name: 'rol_usuarioeliminar',
      component: RolUsuarioEliminarVue,
      meta: { rolesPermitidos: ['administrador'] }
    },
    {
      path: '/rol_usuario/:id_usuario/detalles',
      name: 'rol_usuariodetalles',
      component: RolUsuarioDetallesVue,
      meta: { rolesPermitidos: ['administrador'] }
    },
    {
      path: '/tabla',
      name: 'tabla',
      component: TablaVue,
      meta: { rolesPermitidos: ['administrador', 'estilista', 'contadora'] }
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