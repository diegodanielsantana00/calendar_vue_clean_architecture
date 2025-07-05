import type { Contact } from "../entities/Contact";
import type { ContactStats } from "../entities/ContactStats";

export interface IContactRepository {
  getStats(): Promise<ContactStats[]>
  getAll(): Promise<Contact[]>;
  add(contact: Omit<Contact, 'id' | 'statusContactEnum'>): Promise<Contact>;
  update(contact: Contact): Promise<Contact>;
  updateStatus(id: string, status: number): Promise<void>;
}
