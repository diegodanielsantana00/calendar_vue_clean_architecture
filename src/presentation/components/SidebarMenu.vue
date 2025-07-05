<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Menu from 'primevue/menu';

const router = useRouter();
const items = ref([
    {
        label: 'Dashboard',
        icon: 'pi pi-chart-bar',
        command: () => router.push('/dashboard')
    },
    {
        label: 'Contatos',
        icon: 'pi pi-users',
        command: () => router.push('/contacts')
    },
    {
        label: 'Sair',
        icon: 'pi pi-sign-out',
        class: 'menu-item-logout', 
        command: () => {
            localStorage.removeItem('token')
            router.push('/');
        }
    }
]);
</script>

<template>
  <div class="surface-100 h-screen w-18rem p-4 shadow-2">
    <div class="text-xl font-bold mb-5">Agenda</div>
    <Menu :model="items" class="w-full surface-100 border-none" />
  </div>
</template>

<style scoped>
</style>