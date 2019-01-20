import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ISubCategory } from 'app/shared/model/sub-category.model';
import { SubCategoryService } from './sub-category.service';
import { ICategory } from 'app/shared/model/category.model';
import { CategoryService } from 'app/entities/category';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product';

@Component({
    selector: 'jhi-sub-category-update',
    templateUrl: './sub-category-update.component.html'
})
export class SubCategoryUpdateComponent implements OnInit {
    subCategory: ISubCategory;
    isSaving: boolean;

    categories: ICategory[];

    products: IProduct[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected subCategoryService: SubCategoryService,
        protected categoryService: CategoryService,
        protected productService: ProductService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ subCategory }) => {
            this.subCategory = subCategory;
        });
        this.categoryService.query().subscribe(
            (res: HttpResponse<ICategory[]>) => {
                this.categories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.productService.query().subscribe(
            (res: HttpResponse<IProduct[]>) => {
                this.products = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.subCategory.id !== undefined) {
            this.subscribeToSaveResponse(this.subCategoryService.update(this.subCategory));
        } else {
            this.subscribeToSaveResponse(this.subCategoryService.create(this.subCategory));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISubCategory>>) {
        result.subscribe((res: HttpResponse<ISubCategory>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackCategoryById(index: number, item: ICategory) {
        return item.id;
    }

    trackProductById(index: number, item: IProduct) {
        return item.id;
    }
}
