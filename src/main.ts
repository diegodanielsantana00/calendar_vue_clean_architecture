import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/lara-light-indigo/theme.css' 
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

// Componentes
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'
import router from './router'
import Chart from 'primevue/chart'

const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.use(ToastService)

app.component('InputText', InputText)
app.component('Password', Password)
app.component('Button', Button)
app.component('Toast', Toast)
app.component('Chart', Chart)

app.mount('#app')