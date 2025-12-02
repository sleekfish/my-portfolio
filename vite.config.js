import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"
import {resolve , dirname} from 'path';
import {fileURLToPath} from 'url';


export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve:{
      alias:{
          '#components':resolve(dirname(fileURLToPath(import.meta.url)), 'components'),
          '#constants':resolve(dirname(fileURLToPath(import.meta.url)), 'constants'),
          '#store':resolve(dirname(fileURLToPath(import.meta.url)), 'store'),//data store
          '#hoc':resolve(dirname(fileURLToPath(import.meta.url)), 'hoc'), //higher order components
          '#windows':resolve(dirname(fileURLToPath(import.meta.url)), 'windows'), //other windows
      }
  }
})
