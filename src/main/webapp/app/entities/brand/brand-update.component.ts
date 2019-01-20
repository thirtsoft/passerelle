import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IBrand } from 'app/shared/model/brand.model';
import { BrandService } from './brand.service';

@Component({
    selector: 'jhi-brand-update',
    templateUrl: './brand-update.component.html'
})
export class BrandUpdateComponent implements OnInit {
    brand: IBrand;
    isSaving: boolean;

    constructor(protected brandService: BrandService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ brand }) => {
            this.brand = brand;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.brand.id !== undefined) {
            this.subscribeToSaveResponse(this.brandService.update(this.brand));
        } else {
            this.subscribeToSaveResponse(this.brandService.create(this.brand));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IBrand>>) {
        result.subscribe((res: HttpResponse<IBrand>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
