import { IProduct } from 'app/shared/model//product.model';

export interface IBrand {
    id?: number;
    brandName?: string;
    products?: IProduct[];
}

export class Brand implements IBrand {
    constructor(public id?: number, public brandName?: string, public products?: IProduct[]) {}
}
