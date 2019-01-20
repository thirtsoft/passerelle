import { ISubCategory } from 'app/shared/model//sub-category.model';

export interface ICategory {
    id?: number;
    name?: string;
    subcategories?: ISubCategory[];
}

export class Category implements ICategory {
    constructor(public id?: number, public name?: string, public subcategories?: ISubCategory[]) {}
}
