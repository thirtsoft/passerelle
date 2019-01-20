import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISubCategory } from 'app/shared/model/sub-category.model';
import { AccountService } from 'app/core';
import { SubCategoryService } from './sub-category.service';

@Component({
    selector: 'jhi-sub-category',
    templateUrl: './sub-category.component.html'
})
export class SubCategoryComponent implements OnInit, OnDestroy {
    subCategories: ISubCategory[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected subCategoryService: SubCategoryService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected activatedRoute: ActivatedRoute,
        protected accountService: AccountService
    ) {
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.subCategoryService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<ISubCategory[]>) => (this.subCategories = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.subCategoryService.query().subscribe(
            (res: HttpResponse<ISubCategory[]>) => {
                this.subCategories = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSubCategories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISubCategory) {
        return item.id;
    }

    registerChangeInSubCategories() {
        this.eventSubscriber = this.eventManager.subscribe('subCategoryListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
