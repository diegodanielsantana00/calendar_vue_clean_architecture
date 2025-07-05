import type { IContactRepository } from "@/domain/repositories/IContactRepository";
import type { ContactStats } from "@/domain/entities/ContactStats";
import type { ApiResponse } from "../utils/ApiResponse";
import { formatErrors } from "../utils/GlobalFunctions";
import { StatusContactEnum, type Contact } from "@/domain/entities/Contact";


export class ContactApiRepository implements IContactRepository {
  private readonly baseUrl = 'https://localhost:5001/Contact';

  async getStats(): Promise<ContactStats[]> {
    const response = await fetch(`${this.baseUrl}/getStats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      }
    });

    const apiResponse: ApiResponse<ContactStats[]> = await response.json();

    if (apiResponse.success && apiResponse.data) {
      return apiResponse.data;
    } else {
      const errorMessage = formatErrors(apiResponse.errors) || apiResponse.message || 'Ocorreu um erro desconhecido.';
      throw new Error(errorMessage);
    }
  }

  async getAll(): Promise<Contact[]> {
    const response = await fetch(`${this.baseUrl}/getAll`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      }
    });

    const apiResponse: ApiResponse<Contact[]> = await response.json();

    if (apiResponse.success && apiResponse.data) {
      return apiResponse.data;
    } else {
      const errorMessage = formatErrors(apiResponse.errors) || apiResponse.message || 'Ocorreu um erro desconhecido.';
      throw new Error(errorMessage);
    }
  }

  async getById(id: string): Promise<Contact> {
    const response = await fetch(`${this.baseUrl}/getById/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      }
    });

    const apiResponse: ApiResponse<Contact> = await response.json();

    if (apiResponse.success && apiResponse.data) {
      return apiResponse.data;
    } else {
      const errorMessage = formatErrors(apiResponse.errors) || apiResponse.message || 'Ocorreu um erro desconhecido.';
      throw new Error(errorMessage);
    }
  }

  async add(data: Omit<Contact, 'id' | 'statusContactEnum'>): Promise<Contact> {
    const response = await fetch(`${this.baseUrl}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      },
      body: JSON.stringify(data),
    });

    const apiResponse: ApiResponse<Contact> = await response.json();

    if (apiResponse.success && apiResponse.data) {
      return apiResponse.data;
    } else {
      const errorMessage = formatErrors(apiResponse.errors) || apiResponse.message || 'Ocorreu um erro desconhecido.';
      throw new Error(errorMessage);
    }
  }

  async update(contactToUpdate: Contact): Promise<Contact> {
    const response = await fetch(`${this.baseUrl}/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      },
      body: JSON.stringify(contactToUpdate),
    });

    const apiResponse: ApiResponse<Contact> = await response.json();

    if (apiResponse.success && apiResponse.data) {
      return apiResponse.data;
    } else {
      const errorMessage = formatErrors(apiResponse.errors) || apiResponse.message || 'Ocorreu um erro desconhecido.';
      throw new Error(errorMessage);
    }
  }

  async updateStatus(id: string, status: StatusContactEnum): Promise<void> {
    const response = await fetch(`${this.baseUrl}/updateStatus`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      },
      body: JSON.stringify({ id, newStatus: status }),
    });

    if (!response.ok) {
        const apiResponse: ApiResponse<any> = await response.json().catch(() => ({}));
        const errorMessage = formatErrors(apiResponse.errors) || apiResponse.message || `A requisição à API falhou com o estado ${response.status}`;
        throw new Error(errorMessage);
    }
  }

  async delete(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      }
    });

    if (!response.ok) {
        const apiResponse: ApiResponse<any> = await response.json().catch(() => ({}));
        const errorMessage = formatErrors(apiResponse.errors) || apiResponse.message || `A requisição à API falhou com o estado ${response.status}`;
        throw new Error(errorMessage);
    }
  }
}
