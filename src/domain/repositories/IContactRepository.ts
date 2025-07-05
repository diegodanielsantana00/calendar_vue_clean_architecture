import type { ContactStats } from "../entities/ContactStats";

export interface IContactRepository {
  getStats(): Promise<ContactStats[]>
}
