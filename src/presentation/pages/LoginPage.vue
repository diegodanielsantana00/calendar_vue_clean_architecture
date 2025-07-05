<template>
  <div class="flex align-items-center justify-content-center h-screen bg-blue-50">
    <div class="surface-card p-6 shadow-4 border-round w-full sm:w-30rem">
      <div class="text-center mb-5">
        <i class="pi pi-user text-5xl text-primary mb-3" />
        <div class="text-2xl font-bold mb-1">Bem-vindo</div>
        <span class="text-color-secondary">Faça login para continuar</span>
      </div>

      <div class="mb-3">
        <label for="username" class="block text-900 font-medium mb-2">Usuário</label>
        <InputText v-model="username" id="username" class="w-full" placeholder="exemplo_2" />
      </div>

      <div class="mb-3">
        <label for="password" class="block text-900 font-medium mb-2">Senha</label>
        <Password v-model="password" id="password" class="w-full" toggleMask placeholder="Digite sua senha" />
      </div>

      <Button label="Entrar" icon="pi pi-sign-in" class="w-full mb-3" @click="handleLogin" />

      <div class="text-center text-sm text-color-secondary">
        Não tem uma conta?
        <a href="/register" class="text-primary font-medium hover:underline">Registre-se</a>
      </div>
    </div>

    <Toast />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { LoginUseCase } from '@/application/login/LoginUseCase'
import { AuthApiRepository } from '@/infrastructure/auth/AuthApiRepository'

const username = ref('')
const password = ref('')
const toast = useToast()

const loginUseCase = new LoginUseCase(new AuthApiRepository())

const handleLogin = async () => {
  try {
    const user = await loginUseCase.execute(username.value, password.value)
    toast.add({ severity: 'success', summary: 'Bem-vindo', detail: user.username, life: 3000 })
    localStorage.setItem('token', user.token)
  } catch (error: any) {
    toast.add({ severity: 'error', summary: 'Erro', detail: error.message, life: 3000 })
  }
}
</script>
