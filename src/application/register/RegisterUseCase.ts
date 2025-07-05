import type { IAuthRepository } from '@/domain/repositories/IAuthRepository'
import type { User } from '@/domain/entities/User'

export class RegisterUseCase {
  constructor(private authRepo: IAuthRepository) {}

  async execute(username: string, password: string): Promise<User> {
    return this.authRepo.register(username, password)
  }
}
