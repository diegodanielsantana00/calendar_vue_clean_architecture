<template>
  <div class="flex align-items-center justify-content-center h-screen bg-blue-50">
    <div class="surface-card p-6 shadow-4 border-round w-full sm:w-30rem">
      <div class="text-center mb-5">
        <i class="pi pi-user text-5xl text-primary mb-3" />
        <div class="text-2xl font-bold mb-1">Registro</div>
        <span class="text-color-secondary">Registre-se para continuar</span>
      </div>

      <div class="mb-3">
        <label for="username" class="block text-900 font-medium mb-2">Usuário</label>
        <InputText v-model="username" id="username" class="w-full" placeholder="exemplo_2" />
      </div>
      <div class="mb-3">
        <label for="email" class="block text-900 font-medium mb-2">Email</label>
        <InputText v-model="email" id="email" class="w-full" placeholder="exemplo@gmail.com" />
      </div>

      <div class="mb-3">
        <label for="password" class="block text-900 font-medium mb-2">Senha</label>
        <Password v-model="password" id="password" class="w-full" toggleMask placeholder="Digite sua senha" />
      </div>

    <div class="mb-3">
        <label for="confirmPassword" class="block text-900 font-medium mb-2">Confirmar Senha</label>
        <Password v-model="confirmPassword" id="confirmPassword" class="w-full" toggleMask placeholder="Digite sua senha novamente" :feedback="false"  />
      </div>

      <Button label="Registrar" class="w-full mb-3" @click="handleRegister" />

      <div class="text-center text-sm text-color-secondary">
        Já tem uma conta ?
        <a href="/" class="text-primary font-medium hover:underline">Entrar</a>
      </div>
    </div>

    <Toast />
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { AuthApiRepository } from '@/infrastructure/auth/AuthApiRepository'
import { RegisterUseCase } from '@/application/register/RegisterUseCase'

const username = ref('')
const password = ref('')
const email = ref('')
const confirmPassword = ref('')
const toast = useToast()
const router = useRouter()

const regiserUseCase = new RegisterUseCase(new AuthApiRepository())

const handleRegister = async () => {
  try {
    const success = await regiserUseCase.execute(username.value, password.value, confirmPassword.value, email.value)
    if (!success) {
      throw new Error('Erro ao registrar usuário')
    }

    toast.add({ severity: 'success', summary: 'Registrado com sucesso', detail: "Você pode entrar com seu usuario e senha", life: 3000 })
    setTimeout(() => {
      router.push('/')
    }, 2000)

  } catch (error: any) {
    toast.add({ severity: 'error', summary: 'Erro', detail: error.message, life: 3000 })
  }
}
</script>
