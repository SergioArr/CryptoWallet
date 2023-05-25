import { CryptocurrencyInterface } from "../interface/cryptocurrency.interface";

export class GetCryptocurrencyDto implements CryptocurrencyInterface {
    id: number;
    name: string;
    createdDate: Date;
    updatedDate: Date;
    deletedDate: Date;

}