export enum StatusContactEnum {
  Inactive = 2,
  Active = 1
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  userId: string;
  statusContactEnum: StatusContactEnum;
}