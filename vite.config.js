import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'bootstrap-icons': 'bootstrap-icons/dist/bootstrap-icons.css'
    }
  }
});