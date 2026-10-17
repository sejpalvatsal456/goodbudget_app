export interface IPartialUser {
  name?: string;
  username?: string;
  id?: string;
  email?: string;
}

export type Transaction = {
  id: string;
  title: string;
  merchant: string;
  amount: number;
  date: string;
};
