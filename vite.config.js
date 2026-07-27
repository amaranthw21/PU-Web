import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// El sitio se publica en GitHub Pages bajo https://<user>.github.io/PU-Web/,
// así que en build necesita el base path "/PU-Web/". En desarrollo se sirve
// desde la raíz para mayor comodidad.
// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/PU-Web/' : '/',
  plugins: [react()],
}))
