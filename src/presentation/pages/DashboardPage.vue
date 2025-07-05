<template>
  <div class="flex">
    <SidebarMenu />

    <div class="p-4 w-full">
      <h2 class="text-2xl font-bold mb-4">Estatísticas de Contatos</h2>

      <Chart type="bar" :data="chartData" :options="chartOptions" class="w-full md:w-30rem" />

      <Chart type="pie" :data="pieChartData" :options="pieChartOptions" class="w-full md:w-30rem mt-6" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SidebarMenu from '@/presentation/components/SidebarMenu.vue'
import Chart from 'primevue/chart'
import { GetContactsStatsUseCase } from '@/application/dashboard/GetContactsStatsUseCase'
import { ContactApiRepository } from '@/infrastructure/contact/ContactApiRepository'

const getStatsUseCase = new GetContactsStatsUseCase(new ContactApiRepository())
const chartData = ref()
const chartOptions = ref()
const pieChartData = ref()
const pieChartOptions = ref()

onMounted(async () => {
  const stats = await getStatsUseCase.execute()

  chartData.value = {
    labels: stats.map((s: { month: any }) => s.month),
    datasets: [
      {
        label: 'Contatos Cadastrados',
        backgroundColor: '#42A5F5',
        data: stats.map((s: { count: any }) => s.count)
      }
    ]
  }


})
</script>

<style scoped>
</style>
