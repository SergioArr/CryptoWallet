import { Cryptocurrency } from "../entities/cryptocurrency.entity";

export class GetCryptocurrencyDto implements Cryptocurrency {
    id: number;
    name: string;
    createdDate: Date;
    updatedDate: Date;
    deletedDate: Date;

}