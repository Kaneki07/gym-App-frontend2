import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel/serverless'; //

export default defineConfig({
  integrations: [react()],
  output: 'server', // Esto soluciona el error de rutas dinámicas
  adapter: vercel(), // Esto le dice a Astro que el destino es Vercel
  vite: {
    plugins: [tailwindcss()],
  },
});