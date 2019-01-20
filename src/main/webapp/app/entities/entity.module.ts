import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PasserelleCategoryModule } from './category/category.module';
import { PasserelleSubCategoryModule } from './sub-category/sub-category.module';
import { PasserelleProductModule } from './product/product.module';
import { PasserelleBrandModule } from './brand/brand.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        PasserelleCategoryModule,
        PasserelleSubCategoryModule,
        PasserelleProductModule,
        PasserelleBrandModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PasserelleEntityModule {}
