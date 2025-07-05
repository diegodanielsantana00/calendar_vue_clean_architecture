import type { User } from "@/domain/entities/User";
import type { IAuthRepository } from "@/domain/repositories/IAuthRepository";
import type { ApiResponse } from "../utils/ApiResponse";
import { formatErrors } from "../utils/GlobalFunctions";

export class AuthApiRepository implements IAuthRepository {
  private readonly baseUrl = 'https://localhost:5001/Auth';

  async login(username: string, password: string): Promise<User> {
    const response = await fetch(`${this.baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    console.log('Response status:', response.status);
    const apiResponse: ApiResponse<any> = await response.json();

    if (apiResponse.success && apiResponse.data) {
      return {
        id: apiResponse.data.user.id,
        username: apiResponse.data.user.userName,
        email: apiResponse.data.user.email,
        token: apiResponse.data.token,
      };
    } else {
      const errorMessage = formatErrors(apiResponse.errors) || apiResponse.message;
      throw new Error(errorMessage);
    }
  }

  async register(username: string, password: string, confirmPassword: string, email: string): Promise<boolean> {
    const response = await fetch(`${this.baseUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, confirmPassword: confirmPassword, role: 'Membro', email }),
    });

    const apiResponse: ApiResponse<any> = await response.json();
    if (apiResponse.success && apiResponse.data) {
      return true;
    } else {
      const errorMessage = formatErrors(apiResponse.errors) || apiResponse.message;
      throw new Error(errorMessage);
    }
  }
}