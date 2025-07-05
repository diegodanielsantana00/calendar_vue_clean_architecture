import type { IContactRepository } from "@/domain/repositories/IContactRepository"
import type { ContactStats } from "@/domain/entities/ContactStats"
import type { ApiResponse } from "../utils/ApiResponse"
import { formatErrors } from "../utils/GlobalFunctions"

export class ContactApiRepository implements IContactRepository {
  private readonly baseUrl = 'https://localhost:5001/Contact'

  async getStats(): Promise<ContactStats[]> {
    const response = await fetch(`${this.baseUrl}/getStats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      }
    })

    const apiResponse: ApiResponse<ContactStats[]> = await response.json()

    if (apiResponse.success && apiResponse.data) {
      return apiResponse.data as ContactStats[]
    } else {
      const errorMessage = formatErrors(apiResponse.errors) || apiResponse.message
      throw new Error(errorMessage)
    }
  }
}
