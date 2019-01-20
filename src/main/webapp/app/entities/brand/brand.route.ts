import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Brand } from 'app/shared/model/brand.model';
import { BrandService } from './brand.service';
import { BrandComponent } from './brand.component';
import { BrandDetailComponent } from './brand-detail.component';
import { BrandUpdateComponent } from './brand-update.component';
import { BrandDeletePopupComponent } from './brand-delete-dialog.component';
import { IBrand } from 'app/shared/model/brand.model';

@Injectable({ providedIn: 'root' })
export class BrandResolve implements Resolve<IBrand> {
    constructor(private service: BrandService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Brand> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Brand>) => response.ok),
                map((brand: HttpResponse<Brand>) => brand.body)
            );
        }
        return of(new Brand());
    }
}

export const brandRoute: Routes = [
    {
        path: 'brand',
        component: BrandComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'passerelleApp.brand.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'brand/:id/view',
        component: BrandDetailComponent,
        resolve: {
            brand: BrandResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'passerelleApp.brand.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'brand/new',
        component: BrandUpdateComponent,
        resolve: {
            brand: BrandResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'passerelleApp.brand.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'brand/:id/edit',
        component: BrandUpdateComponent,
        resolve: {
            brand: BrandResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'passerelleApp.brand.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const brandPopupRoute: Routes = [
    {
        path: 'brand/:id/delete',
        component: BrandDeletePopupComponent,
        resolve: {
            brand: BrandResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'passerelleApp.brand.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
