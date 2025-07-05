import type { IAuthRepository } from '@/domain/repositories/IAuthRepository'
import type { User } from '@/domain/entities/User'

export class LoginUseCase {
  constructor(private authRepo: IAuthRepository) {}

  async execute(username: string, password: string): Promise<User> {
    return this.authRepo.login(username, password)
  }
}
