import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// El sitio se publica en GitHub Pages bajo https://<user>.github.io/PU-Web/,
// así que en build necesita el base path "/PU-Web/". En desarrollo se sirve
// desde la raíz para mayor comodidad.
//
// `isPreview` va aparte porque en `vite preview` el command es 'serve', no
// 'build': sin él, el servidor de previsualización sirve en la raíz mientras el
// HTML ya construido pide /PU-Web/assets/..., y todo responde 404.
// https://vite.dev/config/
export default defineConfig(({ command, isPreview }) => ({
  base: command === 'build' || isPreview ? '/PU-Web/' : '/',
  plugins: [react()],
}))
