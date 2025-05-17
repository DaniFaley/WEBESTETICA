// src/composables/useAutoLogout.ts
import { onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
/**/
export function useAutoLogout(timeout = 5 * 60 * 1000) { // 15 minutos
  const router = useRouter();
  let timer: ReturnType<typeof setTimeout>;

  const resetTimer = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      localStorage.removeItem('token'); // O usa tu método para cerrar sesión
      router.push('/login');
    }, timeout);
  };

  const setupListeners = () => {
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    resetTimer();
  };

  const removeListeners = () => {
    window.removeEventListener('mousemove', resetTimer);
    window.removeEventListener('keydown', resetTimer);
    clearTimeout(timer);
  };

  onMounted(setupListeners);
  onUnmounted(removeListeners);
}
