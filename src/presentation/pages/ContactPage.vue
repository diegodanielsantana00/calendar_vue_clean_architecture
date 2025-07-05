<template>
  <div class="flex bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">
    <SidebarMenu />

    <div class="p-4 sm:p-6 w-full">
      <Toolbar class="mb-4 bg-transparent border-none p-0">
        <template #start>
          <h1 class="text-2xl font-light">Contatos</h1>
        </template>
        <template #end>
          <Button label="Novo Contato" icon="pi pi-plus" class="p-button-outlined" @click="openNewModal" />
        </template>
      </Toolbar>

      <DataTable :value="contacts" :loading="isLoading" responsiveLayout="scroll" class="border-gray-200 dark:border-gray-700 border-t">
        <Column field="name" header="Nome"></Column>
        <Column field="email" header="Email"></Column>
        <Column field="phone" header="Telefone"></Column>
        <Column header="Status">
          <template #body="{ data }">
            <span :class="data.statusContactEnum === StatusContactEnum.Active ? 'text-green-500' : 'text-gray-500'">
              {{ formatStatus(data.statusContactEnum) }}
            </span>
          </template>
        </Column>

        <Column header="Ações" style="width: 10rem">
          <template #body="{ data }">
            <Button icon="pi pi-pencil" class="p-button-text text-gray-600" @click="openEditModal(data)" />
            <Button 
              :icon="data.statusContactEnum === StatusContactEnum.Active ? 'pi pi-ban' : 'pi pi-check-circle'" 
              class="p-button-text text-gray-800 dark:text-gray-200" 
              @click="confirmStatusChange(data)" 
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  
  <Dialog v-model:visible="isContactModalVisible" :header="modalHeader" :modal="true" class="p-fluid w-1/2">
    <div class="field">
      <label for="name">Nome</label>
      <InputText id="name" v-model.trim="editableContact.name" required />
    </div>
    <div class="field">
      <label for="email">Email</label>
      <InputText id="email" v-model.trim="editableContact.email" required />
    </div>
    <div class="field">
      <label for="phone">Telefone</label>
      <InputMask id="phone" v-model="editableContact.phone" mask="(99) 99999-9999" />
    </div>
    <template #footer>
      <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="isContactModalVisible = false"/>
      <Button :label="editableContact.id ? 'Salvar Alterações' : 'Criar Contato'" icon="pi pi-check" @click="saveContact"/>
    </template>
  </Dialog>
  <Toast />
  <ConfirmDialog></ConfirmDialog>

</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useConfirm } from "primevue/useconfirm";

import SidebarMenu from '@/presentation/components/SidebarMenu.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import Toolbar from 'primevue/toolbar';
import ConfirmDialog from 'primevue/confirmdialog';
import { ContactApiRepository } from '@/infrastructure/contact/ContactApiRepository';
import { StatusContactEnum, type Contact } from '@/domain/entities/Contact';
import { useToast } from 'primevue/usetoast';



const contactRepository = new ContactApiRepository();

const contacts = ref<Contact[]>([]);
const isLoading = ref(true);
const isContactModalVisible = ref(false);
const editableContact = ref<Partial<Contact>>({});
const confirm = useConfirm();
const toast = useToast()


const modalHeader = computed(() => editableContact.value.id ? 'Editar Contato' : 'Novo Contato');
onMounted(async () => {
  const data = await contactRepository.getAll();
  contacts.value = data;
  isLoading.value = false;
});

const openNewModal = () => {
  editableContact.value = { userId: 'user-logged-in' };
  isContactModalVisible.value = true;
};

const openEditModal = (contact: Contact) => {
  editableContact.value = { ...contact };
  isContactModalVisible.value = true;
};

const saveContact = async () => {
  try {
    if (editableContact.value.id) {
      await contactRepository.update(editableContact.value as Contact);
    } else {
      const safeContact: Omit<Contact, 'id' | 'statusContactEnum'> = {
        name: editableContact.value.name || '',
        email: editableContact.value.email || '',
        phone: editableContact.value.phone || '',
        userId: editableContact.value.userId || ''
      }

      await contactRepository.add(safeContact)

    }
    isContactModalVisible.value = false;
    isLoading.value = true;
    contacts.value = await contactRepository.getAll();
    isLoading.value = false;
    toast.add({ severity: 'success', summary: 'Salvo', detail: "Contato Salvo com Sucesso", life: 3000 })
  } catch (error: any) {
    toast.add({ severity: 'error', summary: 'Erro', detail: error.message, life: 3000 })
  }
};

const confirmStatusChange = (contact: Contact) => {
  const newStatus = contact.statusContactEnum === StatusContactEnum.Active ? StatusContactEnum.Inactive : StatusContactEnum.Active;
  const actionText = newStatus === StatusContactEnum.Active ? 'ativar' : 'inativar';

  confirm.require({
    message: `Você tem certeza que deseja ${actionText} o contato "${contact.name}"?`,
    header: 'Confirmação de Mudança de Status',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Sim',
    rejectLabel: 'Não',
    accept: async () => {
      await contactRepository.updateStatus(contact.id, newStatus);
      isLoading.value = true;
      const data = await contactRepository.getAll();
      contacts.value = data;
      isLoading.value = false;
    }
  });
};

const formatStatus = (status: StatusContactEnum) => {
  return status === StatusContactEnum.Active ? 'Ativo' : 'Inativo';
};

</script>

<style scoped>
.field {
  margin-bottom: 1.25rem;
}
:deep(.p-datatable .p-datatable-thead > tr > th) {
  background-color: transparent;
  color: #a0aec0;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75rem;
  border-bottom: 1px solid #e2e8f0;
}
:deep(.p-datatable .p-datatable-tbody > tr) {
  background-color: transparent;
}
:deep(.p-datatable .p-datatable-tbody > tr > td) {
  border: none;
}
</style>