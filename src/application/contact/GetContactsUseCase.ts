import type { Contact } from "@/domain/entities/Contact";
import type { ContactApiRepository } from "@/infrastructure/contact/ContactApiRepository";

export class GetContactsUseCase {
  constructor(private readonly contactRepository: ContactApiRepository) {}

  async execute(): Promise<Contact[]> {
    return this.contactRepository.getAll();
  }
}