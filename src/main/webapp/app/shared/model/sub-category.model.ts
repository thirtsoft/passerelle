import { ICategory } from 'app/shared/model//category.model';
import { IProduct } from 'app/shared/model//product.model';

export interface ISubCategory {
    id?: number;
    name?: string;
    alcohol?: boolean;
    category?: ICategory;
    product?: IProduct;
}

export class SubCategory implements ISubCategory {
    constructor(
        public id?: number,
        public name?: string,
        public alcohol?: boolean,
        public category?: ICategory,
        public product?: IProduct
    ) {
        this.alcohol = this.alcohol || false;
    }
}
