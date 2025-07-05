import type { IAuthRepository } from '@/domain/repositories/IAuthRepository'
import type { User } from '@/domain/entities/User'

export class RegisterUseCase {
  constructor(private authRepo: IAuthRepository) {}

  async execute(username: string, password: string, confirmPassword: string, email: string): Promise<boolean> {
    return this.authRepo.register(username, password, confirmPassword, email)
  }
}
