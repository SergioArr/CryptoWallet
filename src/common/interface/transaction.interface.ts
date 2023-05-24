import { Cryptocurrency } from "src/common/entities/cryptocurrency.entity";

export interface TransactionInterface {
  id: number;
  cryptocurrency_id: number;
  sender: string;
  receiver: string;
  amount: number;
  createdDate: Date;
  updatedDate: Date;
  deletedDate: Date;
  cryptocurrency: Cryptocurrency;
}
