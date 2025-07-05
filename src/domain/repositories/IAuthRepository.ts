import type { User } from '../entities/User'

export interface IAuthRepository {
  login(username: string, password: string): Promise<User>
  register(username: string, password: string): Promise<User>
}
