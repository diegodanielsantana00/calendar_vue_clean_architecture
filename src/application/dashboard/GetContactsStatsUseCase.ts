import type { ContactStats } from "@/domain/entities/ContactStats";
import type { IContactRepository } from "@/domain/repositories/IContactRepository";

export class GetContactsStatsUseCase {
  constructor(private readonly repo: IContactRepository) {}

  async execute(): Promise<ContactStats[]> {
    return this.repo.getStats()
  }
}
