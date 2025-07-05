import type { User } from "@/domain/entities/User";
import type { IAuthRepository } from "@/domain/repositories/IAuthRepository";
import type { ApiResponse } from "../utils/ApiResponse";

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
    const apiResponse: ApiResponse = await response.json();

    if (apiResponse.success && apiResponse.data) {
      return {
        id: apiResponse.data.user.id,
        username: apiResponse.data.user.userName,
        email: apiResponse.data.user.email,
        token: apiResponse.data.token,
      };
    } else {
      const errorMessage = apiResponse.errors.join('\n') || apiResponse.message;
      throw new Error(errorMessage);
    }
  }

  async register(username: string, password: string): Promise<User> {
    const response = await fetch(`${this.baseUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, confirmPassword: password }),
    });

    const apiResponse: ApiResponse = await response.json();
    if (apiResponse.success && apiResponse.data) {
      return {
        id: apiResponse.data.user.id,
        username: apiResponse.data.user.userName,
        email: apiResponse.data.user.email,
        token: apiResponse.data.token,
      };
    } else {
      const errorMessage = apiResponse.errors.join('\n') || apiResponse.message;
      throw new Error(errorMessage);
    }
  }
}